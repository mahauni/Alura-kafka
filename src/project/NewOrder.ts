import ExampleConsumer from "./Consumers/consumer";
import ProducerFactory from "./Producers/producers";

interface CustomMessageFormat { a: string }

const producer = new ProducerFactory();
const consumer = new ExampleConsumer();

async function main() {
    let msg: CustomMessageFormat = {a: "Hello World"};

    await producer.start();
    await consumer.startConsumer();
    await consumer.startBatchConsumer();

    await producer.sendBatch([msg]);

    await producer.shutdown();
    await consumer.shutdown();
}

main();
