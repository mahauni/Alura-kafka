import Messager from "./Producers/producers";

interface MessageTemplate {
    id: number,
    head: string,
    body: string,
}

const producer = new Messager("I_USE_VIM_BTW");

async function main() {
    let msg: MessageTemplate = {
        id: Math.random() * 10,
        head: "i love rust",
        body: "i love rust and i use vi btw"
    }

    await producer.start();

    await producer.sendBatch([msg], "I_USE_RUST_BTW");

    await producer.shutdown();
}

main();
