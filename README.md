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


Kafka threading (load balancer)

for kafka to load balance the messages sent to the consumers, it has something called partitions.
this is responsible for the "kinda load balancer", is is probably a min heap or max heap, so than it has a certain amount of services that it can load balance to.
so if you have for example 2 partitions and you have to distribute to 4 consumers, 2 of those consumers will be doing nothing because the partition it only has 2 so only 2 consumers will be receiving messages.
this configuration is on the server-properties.sh in the binary of the kafka bin and for the docker you have to pass a env variable to change the number.
and the partitions are available for topic wise, and is not a whole kafka server thing. so is possible to have some topics with 1 partitions and others with 20.
the command will be useful to visualize this thing

this command is for in the console of the machine change the partitions of a already created topic.
if you change the file server-properties.sh it will only affect the later topics.

./bin/kafka-topics.sh --alter --zookeeper localhost:2181 --topic my-topic --partitions 20

for you to have control in the partitions of the topics go to the in this case kafkaJS and search how to create topics with more partitions.
for now in the consumer.run you will have to put partitionsConsumedConcurrently: N.
It is a complicatied topic so see with more details later.

the messages are distributed with the key component of the producer. If the key is always the same for the messages, it will always be sent to the same partition.
so to change this, it is wise to have a uid randon attached to the message, so than the kafka can ballance because new messages will have a different id from the other one prev.
so Math.rand is important when sending messages because of the kafka load balancer.

In the current example. it has not randon key values, so its not really good. because this is a dev, example sketch.
in later projects is to have a randon number attached to the message, and this being the key so than the kafka can load the balance between partitions.


Useful command in the day to day to see all the consumers groups

bin/kafka-consumer-groups.sh --all-groups --bootstrap-server localhost:9092 --describe

it shows the amount of messages in the partition and how much is left messages in the partition


COMMITS

kafka commits are something important to have in hand because is something to manage the kafka. And if good if you have some fine grain control over it.
So if something happend and is all a mess because you didnt log. So kafkaJS has some autoCommits that help the developer to dont worry so much about it, but it can be insuficient for you.
So it is something you have to know, because is not all the places where you have auto commits. And know that some codes, have horrible commits time, and is always necessary to know and know how to change.

In kafkaJs in consuming tab of the Usage, you will have a topic about commits and there you have documentation about it.
If you want to really know how it will do, make a stress test, sending a lot of messages and consuming those messages with a delay.
And monitor how the kafka and your code will be doing. (THIS IS SOMETHING YOU DO WITH PARTITIONS MOST OF THE TIME), and after the verification, change the commtis to a speed you application is required.



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


