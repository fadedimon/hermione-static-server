# hermione-static-server

Static serving server for screenshots testing with Hermione

#### Installation:

Using yarn

```
yarn add hermione-static-server --dev
```

Using npm

```
npm install hermione-static-server --save-dev
```

#### Configuration:

To configure plugin you should provide two required options: `httpPort` and `filesDir`.

#### Example:

```(js)
// .hermione.conf.js
module.exports = {
    // ...
    plugins: {
        'static-server': {
            // @param {Number} — required!
            httpPort: STATIC_SERVER_HTTP_PORT,
            // @param {String} — required! Path to directory with files
            filesDir: './storybook-static',
        }
    }
}

```
