import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'client-id',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({groupId: 'consumer1-group'})

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topics: ["producer-topic"], fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("Received: ", {
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
        }
    });
}
run().catch(console.error)
