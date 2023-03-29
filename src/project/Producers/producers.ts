import { Kafka, Message, Producer, ProducerBatch, TopicMessages } from 'kafkajs'

interface MessageTemplate {
    id: number,
    head: string,
    body: string,
}

export default class Messeger {
  private producer: Producer

  constructor(clientId: string) {
    this.producer = this.createProducer(clientId)
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  public async sendBatch(messages: Array<MessageTemplate>, topic: string): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return {
        value: JSON.stringify(message)
      }
    })

    const topicMessages: TopicMessages = {
      topic,
      messages: kafkaMessages
    }

    const batch: ProducerBatch = {
      topicMessages: [topicMessages]
    }

    await this.producer.sendBatch(batch)
  }

  private createProducer(clientId: string) : Producer {
    const kafka = new Kafka({
      clientId,
      brokers: ['localhost:9092'],
    })

    return kafka.producer()
  }
}
