"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const SearchServiceFactory_1 = require("../build/SearchServiceFactory");
class SearchProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super('pip-services-search', 'Practice records microservice');
        this._factories.add(new SearchServiceFactory_1.SearchServiceFactory());
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory());
    }
}
exports.SearchProcess = SearchProcess;
//# sourceMappingURL=SearchProcess.js.map