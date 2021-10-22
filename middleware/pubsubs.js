var {
    PubSub,
    withFilter,
} = require('graphql-subscriptions');
var {
    Kafka,
} = require('kafkajs');
// var {
//     KafkaPubSub,
// } = require('graphql-kafkajs-subscriptions');
var {
    KafkaPubSub,
} = require('graphql-kafka-subscriptions');
var {
    MQTTPubSub,
} = require('graphql-mqtt-subscriptions');
var {
    RedisPubSub,
} = require('graphql-redis-subscriptions');
var {
    GooglePubSub,
} = require('@axelspringer/graphql-google-pubsub');
var Redis = require('ioredis');
var {
    spy,
    restore,
    stub,
} = require('simple-mock');

// const pubsub = new MQTTPubSub({
//     onMQTTSubscribe: (subId, granted) => {
//         console.log(`Subscription with id ${subId} was given QoS of ${granted.qos}`);
//     },
// });

// const pubsub = new PubSub(); //create a PubSub instance

/////////////////////////////////////////////////////////////////////
// const kafka = new Kafka({
//     clientId: 'the4pet',
//     ssl: true,
//     brokers: ['localhost:9092'],
//     retry: {
//         initialRetryTime: 1,
//         retries: 1,
//     },
// });

// const admin = kafka.admin();
// // eslint-disable-next-line promise/catch-or-return
// admin.connect()
//     .then(() => admin.createTopics({
//         topics: [{
//             topic: 'the4pet'
//         }],
//         waitForLeaders: true,
//     }));

// const pubsub = KafkaPubSub.create({
//     topic: 'my-topic',
//     kafka: new Kafka({
//         clientId: 'my-clientId',
//         ssl: true,
//         brokers: ['localhost:9092'],
//         retry: {
//             initialRetryTime: 10,
//             retries: 10,
//             maxRetryTime: 10,
//         },
//     }),
//     groupIdPrefix: "my-group-id-prefix", // used for kafka pub/sub,
//     producerConfig: {}, // optional kafkajs producer configuration
//     consumerConfig: {} // optional kafkajs consumer configuration
// });
/////////////////////////////////////////////////////////////////////

// const pubsub = new KafkaPubSub({
//     topic: 'name-of-the-topic',
//     host: 'localhost',
//     port: '9092',
//     globalConfig: {} // options passed directly to the consumer and producer
// });

const options = {
    // host: 'localhost',
    // port: '9092',
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};

const publishSpy = spy((channel, message) => listener && listener(channel, message));
const subscribeSpy = spy((channel, cb) => cb && cb(null, channel));
const unsubscribeSpy = spy((channel, cb) => cb && cb(channel));
const psubscribeSpy = spy((channel, cb) => cb && cb(null, channel));
const punsubscribeSpy = spy((channel, cb) => cb && cb(channel));
const quitSpy = spy(cb => cb);

const mockRedisClient = {
    publish: publishSpy,
    subscribe: subscribeSpy,
    unsubscribe: unsubscribeSpy,
    psubscribe: psubscribeSpy,
    punsubscribe: punsubscribeSpy,
    on: (event, cb) => {
        if (event === 'message') {
            listener = cb;
        }
    },
    quit: quitSpy,
};

const mockOptions = {
    publisher: (mockRedisClient),
    subscriber: (mockRedisClient),
};

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const optionss = {
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};

const pubsub = new RedisPubSub({
    publisher: new Redis(REDIS_URL, optionss),
    subscriber: new Redis(REDIS_URL, optionss)
});

exports.pubsub = pubsub;
exports.withFilter = withFilter;