#### elk环境docker一键安装  
##### 安装docker  
如果你已安装可跳过此步骤  
bash docker.install.sh  

##### 启动docker  
service start docker  

##### elk环境启动  
到安装目录下执行启动脚本  
bash run  
等待启动...........  

##### 直接访问  
直接在浏览器上访问kibana http://127.0.0.1:5601  
惊不惊喜，意不意外，就是这么简单  

##### 去官网申请license证书  
https://license.elastic.co/registration  
主要修改这几个地方  
1."type":"basic" 替换为 "type":"platinum"  
2."expiry_date_in_millis":1561420799999 替换为 "expiry_date_in_millis":3107746200000  