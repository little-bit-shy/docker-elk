#!/bin/bash

#############################启动Elastic

# 删除运行中的容器
docker rm $(docker ps -a| grep "elastic" |cut -d " " -f 1) -f
# 获取主机名称
host=${HOSTNAME}
# 修改项目权限
chown 1000:1000 -R ${PWD}/elastic
# 构建容器
docker build \
    --build-arg node=${host} \
    --network host \
    -t 15918793994/elasticsearch:6.2.4 ${PWD}/elastic
# 运行容器
docker run -d --name elastic --net=host  \
	-v ${PWD}/elastic/data:/usr/share/elasticsearch/data \
	-v ${PWD}/elastic/logs:/usr/share/elasticsearch/logs \
	-v ${PWD}/elastic/certs:/usr/share/elasticsearch/config/certificates/certs \
	-v ${PWD}/elastic/conf/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
	15918793994/elasticsearch:6.2.4