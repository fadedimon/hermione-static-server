const path = require('path');
const express = require('express');

function log(message) {
    console.log(`${new Date().toLocaleTimeString()} — ${message}`);
}

module.exports = function hermioneStaticServer(hermione, opts) {
    const { httpPort, filesDir } = opts;

    if (!httpPort) {
        throw new Error(`"httpPort" option was not specified in hermione-static-server config`);
    }

    if (!filesDir) {
        throw new Error(`"filesDir" option was not specified in hermione-static-server config`);
    }

    hermione.on(hermione.events.RUNNER_START, function(runner) {
        return new Promise((resolve) => {
            if (opts._server) {
                log('Static server is already started');
                return resolve();
            }

            const server = express();
            const { httpPort, filesDir } = opts;
            const staticDir = path.normalize([process.cwd(), filesDir].join('/'));

            server.use('/', express.static(staticDir));

            const httpServer = server.listen(httpPort, () => {
                log(`Static server started on port "${httpPort}", serving files from "${filesDir}"`);
                resolve();
            });

            opts._server = server;
            opts._httpServer = httpServer;
        });
    });

    hermione.on(hermione.events.RUNNER_END, function(runner) {
        if (opts.httpServer) {
            opts.httpServer.close();
            log('Static server stopped');
        }
    });
};
