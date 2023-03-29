import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload } from 'kafkajs'

export default class Receiver {
  private kafkaConsumer: Consumer

  public constructor(clientId: string, groupId: string) {
    this.kafkaConsumer = this.createKafkaConsumer(clientId, groupId)
  }

  public async startConsumer(topics: Array<string>): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics,
      fromBeginning: true
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
          console.log(`- ${prefix} ${message.key}#${message.value}`)
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async startBatchConsumer(topics: Array<string>): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics,
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)
      await this.kafkaConsumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`) 
          }
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createKafkaConsumer(clientId: string, groupId: string): Consumer {
    const kafka = new Kafka({ 
      clientId,
      brokers: ['localhost:9092']
    })
    const consumer = kafka.consumer({ groupId })
    return consumer
  }
}
