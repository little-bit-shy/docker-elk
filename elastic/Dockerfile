FROM 15918793994/elasticsearch:6.2.4

# 传入重写后的x-pack验证类
ADD ./x-pack/* /tmp/x-pack

RUN yum install -y java-1.8.0-openjdk*

# 破解x-pack
RUN mkdir /usr/share/elasticsearch/plugins/x-pack/x-pack-core/x-pack-core-6.2.4 \
	&& mv /usr/share/elasticsearch/plugins/x-pack/x-pack-core/x-pack-core-6.2.4.jar /usr/share/elasticsearch/plugins/x-pack/x-pack-core/x-pack-core-6.2.4  \
	&& cd /usr/share/elasticsearch/plugins/x-pack/x-pack-core/x-pack-core-6.2.4 \
	&& jar xvf x-pack-core-6.2.4.jar \
	&& rm -rf x-pack-core-6.2.4.jar \
	&& rm -rf org/elasticsearch/license/LicenseVerifier.class org/elasticsearch/xpack/core/XPackBuild.class \
	&& mv /tmp/x-pack/LicenseVerifier.class org/elasticsearch/license/ \
	&& mv /tmp/x-pack/XPackBuild.class org/elasticsearch/xpack/core/ \
	&& jar cvf x-pack-core-6.2.4.jar ./ \
	&& rm -rf ../x-pack-core-6.2.4.jar \
	&& mv ./x-pack-core-6.2.4.jar ../ \
	&& cd ../ \
	&& rm -rf x-pack-core-6.2.4 \
	&& chown elasticsearch ./x-pack-core-6.2.4.jar

# 挂载目录
ADD ./conf/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
ADD ./data /usr/share/elasticsearch/data
ADD ./logs /usr/share/elasticsearch/logs

# 修改挂载目录、文件权限
RUN chown elasticsearch /usr/share/elasticsearch/config/elasticsearch.yml \
    && chown elasticsearch -R /usr/share/elasticsearch/data \
    && chown elasticsearch -R /usr/share/elasticsearch/logs
