import ProducerFactory from "./Producers/producers";

interface CustomMessageFormat { a: string }

const producer = new ProducerFactory();

async function main() {
    let msg: CustomMessageFormat = {a: "broker nao ta funcionand"};

    await producer.start();

    await producer.sendBatch([msg]);

    await producer.shutdown();
}

main();
