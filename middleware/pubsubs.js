var {
    PubSub,
    withFilter,
} = require('graphql-subscriptions');
var {
    RedisPubSub,
} = require('graphql-redis-subscriptions');
var Redis = require('ioredis');
var {
    spy,
    restore,
    stub,
} = require('simple-mock');

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

const pubsub = new RedisPubSub(mockOptions);

exports.pubsub = pubsub;
exports.withFilter = withFilter;