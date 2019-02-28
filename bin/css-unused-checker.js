const sass = require('node-sass');
const purifycss = require('purify-css');

console.log('Checking for unused css rules.....');

const css = sass.renderSync({
    file: './html/scss/all.scss',
}).css.toString();

const content = [
    './html/contents/*.html',
    './html/partials/*.html',
    './html/index.html',
    './html/scripts/*.js',
];

const options = {
    rejected: true,
    whitelist: [],
};

/*
    purifycss result doesn't change error code after failed, one way to check is by seeing if any stdout emited or not
*/
let output = '';
process.stdout.write = (data) => {
    output += data;
};

purifycss(content, css, options, () => {
    if (output) {
        console.error(output);
        process.exit(1);
    }
    process.exit(0);
});
