FROM python:3.9.5-alpine

ENV PATH="/scripts:${PATH}"

#copy file with settings
COPY ./requirements.txt /requirements.txt

#temporary install nessasary packs
RUN apk add --update --no-cashe --virtual .tmp gcc libc-dev linux-headers

#install requirements
RUN pip install -r /requirements.txt

#delete temporary packs
RUN apk del .tmp

#create folder
RUN mkdir /app
#copy files from host to guest machine
COPY ./app /app
#move to projects folder
WORKDIR /app

#create folders for static files
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

#add new user puyo for running app
RUN adduser -D puyo
#give puyo user permissions
RUN chown -R puyo:puyo /vol
RUN chmod -R 755 /vol/web 
#switch to user
USER puyo
#run shell script to start
CMD ["entrypoint.sh"]