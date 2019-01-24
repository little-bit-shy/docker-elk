#!/bin/bash

#############################启动Elastic
# 删除运行中的容器
docker rm $(docker ps -a| grep "elastic" |cut -d " " -f 1) -f
# 获取主机名称
host=${HOSTNAME}
# 修改项目权限
chown 1000:1000 -R ${PWD}/elastic
# 创建容器hosts
: > ${PWD}/elastic/etc/hosts
hosts=""
length=`cat ${PWD}/elastic/instances.yml | shyaml get-length instances`
for((i=0;i<${length};i++));
do
  ipString=(`cat ${PWD}/elastic/instances.yml | shyaml get-value instances.${i}.ip`)
  dnsString=(`cat ${PWD}/elastic/instances.yml | shyaml get-value instances.${i}.dns`)
  ip=${ipString[1]}
  dns=${dnsString[1]}
  echo "${ip}   ${dns}" >> ${PWD}/elastic/etc/hosts
  hosts="${hosts},${dns}"
done
hosts=${host:1}
minimum_master_nodes=$[${length}/2 + 1]
# 构建容器
docker build \
    --build-arg node=${host} \
    --build-arg hosts=${hosts} \
    --build-arg minimum_master_nodes=${minimum_master_nodes} \
    --network host \
    -t 15918793994/elasticsearch:6.2.4 ${PWD}/elastic
# 运行容器
docker run -d --name elastic --net=host  \
	-v ${PWD}/elastic/data:/usr/share/elasticsearch/data \
	-v ${PWD}/elastic/logs:/usr/share/elasticsearch/logs \
	-v ${PWD}/elastic/certs:/usr/share/elasticsearch/config/certificates/certs \
	-v ${PWD}/elastic/conf/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
	-v ${PWD}/elastic/etc/hosts:/etc/hosts \
	15918793994/elasticsearch:6.2.4