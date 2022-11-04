# ChiselStrike streaming example

This is an example application that shows how to use ChiselStrike's streaming APIs with [Redpanda](https://redpanda.com/) and [Apache Kafka](https://kafka.apache.org/).

The application provides a REST API to inspect the top-of-book (also known as best bid and offer) of a traded instrument.
The top-of-book is constructed from a stream of order book updates that contains one or more of the following: a bid price, bid volume, ask price, and ask volume.
In effect, the application provides as simple way to consume the latest value of the stream.

## Getting Started

First, set up the environment:

```
npm i
```

Then, create a topic:

**Redpanda:**

```
rpk topic create book-updates
```

**Kafka:**

```
bin/kafka-topics.sh --create --topic book-updates --bootstrap-server localhost:9092
```

Start the server in development mode:

```console
npm run dev -- -- --kafka-connection localhost:9092 --kafka-topics book-updates
```

Push some price updates to the topic.

**Redpanda:**

```
echo '{ "symbol": "AAPL", "bidPrice": 174.1 }' | rpk topic produce book-updates
echo '{ "symbol": "AAPL", "bidVolume": 1000 }' | rpk topic produce book-updates
echo '{ "symbol": "AAPL", "askPrice": 174.2 }' | rpk topic produce book-updates
echo '{ "symbol": "AAPL", "askVolume": 2000 }' | rpk topic produce book-updates
echo '{ "symbol": "AAPL", "bidPrice": 174.0 }' | rpk topic produce book-updates
```

**Kafka:**

```
echo '{ "symbol": "AAPL", "bidPrice": 174.1 }' | bin/kafka-console-producer.sh --topic book-updates --bootstrap-server localhost:9092
echo '{ "symbol": "AAPL", "bidVolume": 1000 }' | bin/kafka-console-producer.sh --topic book-updates --bootstrap-server localhost:9092
echo '{ "symbol": "AAPL", "askPrice": 174.2 }' | bin/kafka-console-producer.sh --topic book-updates --bootstrap-server localhost:9092
echo '{ "symbol": "AAPL", "askVolume": 2000 }' | bin/kafka-console-producer.sh --topic book-updates --bootstrap-server localhost:9092
echo '{ "symbol": "AAPL", "bidPrice": 174.0 }' | bin/kafka-console-producer.sh --topic book-updates --bootstrap-server localhost:9092
```

To query the top-of-book, which represents the latest value of the stream, run:

```
curl localhost:8080/dev/top?.symbol=AAPL
```

That's it!
