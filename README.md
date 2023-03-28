installing kafka localy

first get the binaries from the apache kafka website.
after getting the binaries, you go to the place you want the kafka to be and:

$ tar zxf ./[path to the .tgz kafka] 

after this comand, you will have a folder with the kafka in there.


run it with:

Linux
$ bin/kafka-server-start.sh config/server.properties

Windows
if path is a problem try to move the kafka to C:/kafka.
but better is to use docker and run kafka from a pod or container
$ .\bin\windows\kafka-server-start.bat .\config\server-properties

I will be using in docker.

I have a docker-compose file where I can do:

$ docker-compose up -d

and the both zookeeper and the kafka server will start.
to enter the container, you will have to do

$ docker exec -it -u root [id container] bin/bash

and the container id will be the kafka one and not the zookeper.

To get to the kafka binaries you will after entering the container
go to /opt/bitnami/kafka and than all kafka bin will be there

test of kafka

bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic
 LOJA_NOVO_PEDIDO