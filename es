#!/bin/bash

dir=/usr/local/elk

#############################启动Elastic
# 删除运行中的容器
docker rm $(docker ps -a| grep "elastic" |cut -d " " -f 1) -f
# 获取主机名称
host=${HOSTNAME}
# 修改项目权限
chown 1000:1000 -R ${dir}/elastic
# 创建容器hosts
: > ${dir}/elastic/etc/hosts

if [ -f "/usr/sbin/ip" ]
then
  thisIps=(`ip addr | grep 'inet' | awk -F" " '{print $2}' | awk -F"/" '{print $1}'`)
elif [ -f "/usr/sbin/ifconfig" ]
then
  thisIps=(`ifconfig |grep "inet"|awk -F" " '{print $2}'`)
else
  echo -e "\033[31m 无法获取当前服务器IP地址，退出项目 \033[0m"
  exit
fi

hosts=""
length=`cat ${dir}/elastic/instances.yml | shyaml get-length instances`
for((i=0;i<${length};i++));
do
  hostnameString=(`cat ${dir}/hadoop/instances.yml | shyaml get-value instances.${i}.hostname`)
  ipString=(`cat ${dir}/elastic/instances.yml | shyaml get-value instances.${i}.ip`)
  dnsString=(`cat ${dir}/elastic/instances.yml | shyaml get-value instances.${i}.dns`)
  hostname=${hostnameString[1]}
  ip=${ipString[1]}
  dns=${dnsString[1]}
  echo "${ip}   ${dns}" >> ${dir}/elastic/etc/hosts
  hosts="${hosts},${dns}"
  for thisIp in ${thisIps[@]}
      do
        if [ "${thisIp}" == "${ip}" ] ;then
            if [ "${hostname}" == "true" ] ;then
              thisHostname=${dns}
            fi
            echo "${ip}   es" >> ${dir}/elastic/etc/hosts
            host=${dns}
        fi
      done
done
hosts=${hosts:1}
minimum_master_nodes=$[${length}/2 + 1]
# 拉取公用配置
elasticsearch_password=(`cat ${dir}/elastic/public.yml | shyaml get-value public.elasticsearch.password`)
# 构建容
docker build \
    --build-arg node=${host} \
    --build-arg hosts=${hosts} \
    --build-arg minimum_master_nodes=${minimum_master_nodes} \
    --build-arg elastic_password=${elasticsearch_password} \
    --network host \
    -t 15918793994/elasticsearch:6.2.4 ${dir}/elastic
sysctl -w vm.max_map_count=262144
# 运行容器
docker run -d --name elastic --net=host --hostname ${thisHostname} \
	-v ${dir}/elastic/data:/usr/share/elasticsearch/data \
	-v ${dir}/elastic/logs:/usr/share/elasticsearch/logs \
	-v ${dir}/elastic/certs:/usr/share/elasticsearch/config/certificates/certs \
	-v ${dir}/elastic/conf/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
	-v ${dir}/elastic/etc/hosts:/etc/hosts \
	15918793994/elasticsearch:6.2.4