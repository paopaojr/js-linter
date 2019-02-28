const qunit = require('node-qunit-phantomjs');

const exitCodes = [];

const tests = [
    new Promise(resolve => {
        qunit('test/test-partials.html', null, (code) => {
            resolve(code);
        });
    }),
];

Promise.all(tests).then((codes) => {
    const exitCode = codes.every((code) => code === 0) ? 0 : 1;
    process.exit(exitCode);
});
