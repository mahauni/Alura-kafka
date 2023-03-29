import ExampleConsumer from "./Consumers/consumer";

const consumer = new ExampleConsumer();

async function main() {
    consumer.startConsumer();
}

main();
