FROM 15918793994/kibana:6.2.4

# 挂载目录
ADD ./conf/kibana.yml /usr/share/kibana/config/kibana.yml
ADD ./certs /usr/share/kibana/certs

USER root

# 修改挂载目录、文件权限
RUN chown kibana /usr/share/kibana/config/kibana.yml \
    && chown kibana -R /usr/share/kibana/certs
