#### elk环境docker一键安装  
首选准备2台服务器以备使用es01、es02 

##### 修改主机名称（es01、es02）  
###### es01
hostnamectl set-hostname es01  
###### es02
hostnamectl set-hostname es02  

##### 安装docker（es01、es02）  
如果你已安装可跳过此步骤  
bash docker.install  

##### 安装docker-compose、shyaml（es01、es02）  
如果你已安装可跳过此步骤  
bash compose.install  

##### 启动docker（es01、es02）    
service/systemctl start docker  

##### 修改（es01）    
修改kibana/kibana.yml配置文件中elasticsearch的链接  

##### 证书生成（es01）    
进入安装目录  
修改elastic/instances.yml（证书生成依赖）文件备用  
执行bash certs  
等待证书生成...........  
复制elastic/certs文件夹下的所有文件到kibana/certs中备用  

##### 环境同步（es01、es02）  
将上一步证书生成后的项目同步到es02，使其保持一致  

##### 依次启动环境（es01、es02、kibana）  
###### es01
bash es  
bash kib  
###### es02
bash es  


##### 直接访问  
直接在浏览器上访问kibana http://es01:5601  
惊不惊喜，意不意外，就是这么简单  

##### 去官网申请license证书  
https://license.elastic.co/registration  
主要修改这几个地方  
1."type":"basic" 替换为 "type":"platinum"  
2."expiry_date_in_millis":1561420799999 替换为 "expiry_date_in_millis":3107746200000  