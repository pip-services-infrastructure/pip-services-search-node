"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class SearchCommandableHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/search');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-search', 'controller', '*', '*', '1.0'));
    }
}
exports.SearchCommandableHttpServiceV1 = SearchCommandableHttpServiceV1;
//# sourceMappingURL=SearchCommandableHttpServiceV1.js.map