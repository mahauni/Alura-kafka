import Receiver from "./Consumers/consumer";

const consumer = new Receiver("I_USE_VIM_BTW", "consumer-id");

async function main() {
    consumer.startConsumer(["I_USE_RUST_BTW"]);
}

main();
