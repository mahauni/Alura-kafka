installing kafka localy

first get the binaries from the apache kafka website.
after getting the binaries, you go to the place you want the kafka to be and:
```bash
$ tar zxf ./[path to the .tgz kafka] 
```
after this comand, you will have a folder with the kafka in there.


run it with:

Linux
```bash
$ bin/kafka-server-start.sh config/server.properties
```
Windows
if path is a problem try to move the kafka to C:/kafka.
but better is to use docker and run kafka from a pod or container
```bash
$ .\bin\windows\kafka-server-start.bat .\config\server-properties
```
I will be using in docker.

I have a docker-compose file where I can do:
```bash
$ docker-compose up -d

and the both zookeeper and the kafka server will start.
to enter the container, you will have to do

$ docker exec -it -u root [id container] bin/bash
```
and the container id will be the kafka one and not the zookeper.

To get to the kafka binaries you will after entering the container
go to /opt/bitnami/kafka and than all kafka bin will be there

test of kafka in the machine is installed

bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic LOJA_NOVO_PEDIDO








TYPESCRIPT DOCKER

go to the kafka-app folder and than
$ docker-compose up -d

and to kill the container
$ docker-compose down



the typescript part is a bit confusing.
the clientId in the kafka configuration it will need to be the same for both consumer and producer to be able to view the kafka posts.
the same apply to the brokers, that will be localhost:9092 in the docker desktop, but it will be different in the linux version because the docker dont automaticaly redirect to the localhost
so it will probably be 127.0.0.1:9092 for linux docker.


the message that are sent to kafka is organized in the interface customMessage that it can and should be changed to fit you necessities

the consumer disconnect it will only be useful if you have a condition that it should stop listening to the broker, else for test you dont need to close, because when you cntl + C it will automaticaly close.

the consumer to show all the messages by the tag fromBeginning, it has to be a new one.
what this means is the consumer id needs to be different that you where using because if you dont do that you will not able to see all the messages from beginning, and just the send from the moment.
so after changing the id of the consumer you will get all the messages.


