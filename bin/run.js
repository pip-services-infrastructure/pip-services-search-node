let SearchProcess = require('../obj/src/container/SearchProcess').SearchProcess;

try {
    new SearchProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
