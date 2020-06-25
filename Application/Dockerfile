FROM python:3.7-slim

ADD ./Bot /Bot
ADD ./data /data
ADD ./models /models
ADD ./requirement.txt /tmp/


# RUN cp Bot /Bot && \
#     cp data /data && \
#     cp models /models && \
#     cp requirement.txt /tmp/

RUN pip install -r /tmp/requirement.txt


CMD ["/usr/local/bin/gunicorn", "--chdir" , "/Bot" ,"--certfile=server.crt","--keyfile=server.key", "-b", "0.0.0.0:7314", "app:app"]
# CMD ["/usr/local/bin/gunicorn", "--chdir" , "/Bot" , "-b", "0.0.0.0:7314", "app:app"]