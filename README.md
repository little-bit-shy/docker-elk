### 环境依赖  
首选准备2台服务器以备使用es01、es02 、es03

##### 修改主机名称（es01、es02、es03）  
###### es01
hostnamectl set-hostname es01  
###### es02
hostnamectl set-hostname es02  
###### es03
hostnamectl set-hostname es03  

##### 安装docker（es01、es02、es03）  
如果你已安装可跳过此步骤  
bash docker.install  

##### 安装docker-compose、shyaml（es01、es02、es03）  
如果你已安装可跳过此步骤  
bash compose.install  

##### 启动docker（es01、es02、es03）    
service/systemctl start docker  

### 证书处理  
##### 证书生成（es01）  
进入安装目录  
修改elastic/instances.yml（证书生成依赖）文件备用  
执行bash certs  
等待证书生成...........  
生成的证书文件在elastic/certs文件夹中    
`证书生成一次就好`  

##### 环境同步（es02、es03）  
将上一步证书生成后的项目同步到es02、es03，使其保持一致  

### ElasticSearch运行  
##### 依次启动环境（es01、es02、es03）  
bash es  

##### 直接访问  
直接在浏览器上访问kibana https://es01:9200、https://es02:9200、https://es03:9200  
惊不惊喜，意不意外，就是这么简单  

### Kibana运行  
##### 修改、运行（任意一台）  
修改kibana/kibana.yml配置文件中elasticsearch的链接即可  
bash kib  
直接在浏览器上访问kibana http://es01:5601  
惊不惊喜，意不意外，就是这么简单  

### Dockerfile中已经对Xpack进行了破解处理，有兴趣的可以去看看，直接在Kibana上传修改后的证书即可得到铂金会员  
##### 去官网申请license证书  
https://license.elastic.co/registration  
主要修改这几个地方  
1."type":"basic" 替换为 "type":"platinum"  
2."expiry_date_in_millis":1561420799999 替换为 "expiry_date_in_millis":3107746200000  