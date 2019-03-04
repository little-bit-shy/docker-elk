FROM 15918793994/logstash:6.2.4

# 变量定义
ARG elasticsearch_url
ARG elasticsearch_username
ARG elasticsearch_password

# 环境变量
ENV XPACK_MONITORING_ELASTICSEARCH_URL $elasticsearch_url
ENV XPACK_MONITORING_ELASTICSEARCH_USERNAME $elasticsearch_username
ENV XPACK_MONITORING_ELASTICSEARCH_PASSWORD $elasticsearch_password

# 添加multiline插件
RUN logstash-plugin install logstash-filter-multiline