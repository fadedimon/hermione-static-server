const express = require('express');

export default function hermioneStaticServer(hermione, { httpPort, filesDir }) {
    if (!httpPort) {
        throw new Error(`"httpPort" option was not specified in hermione-static-server config`);
    }

    if (!filesDir) {
        throw new Error(`"filesDir" option was not specified in hermione-static-server config`);
    }

    hermione.on(hermione.events.RUNNER_START, function(runner) {
        return new Promise((resolve) => {
            const server = express();

            opts._server = server;

            server.use('/', express.static(__dirname + filesDir));
            server.listen(httpPort, () => {
                console.log('webserver started');
                resolve();
            });
        });
    });

    hermione.on(hermione.events.RUNNER_END, function(runner) {
        if (opts._server) {
            opts._server.close();
            console.log('webserver stopped');
        }
    });
}
