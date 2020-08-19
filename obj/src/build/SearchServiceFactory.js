"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const SearchMemoryPersistence_1 = require("../persistence/SearchMemoryPersistence");
const SearchFilePersistence_1 = require("../persistence/SearchFilePersistence");
const SearchMongoDbPersistence_1 = require("../persistence/SearchMongoDbPersistence");
const SearchController_1 = require("../logic/SearchController");
const SearchCommandableHttpServiceV1_1 = require("../services/version1/SearchCommandableHttpServiceV1");
const SearchElasticPersistence_1 = require("../persistence/SearchElasticPersistence");
class SearchServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SearchServiceFactory.MemoryPersistenceDescriptor, SearchMemoryPersistence_1.SearchMemoryPersistence);
        this.registerAsType(SearchServiceFactory.FilePersistenceDescriptor, SearchFilePersistence_1.SearchFilePersistence);
        this.registerAsType(SearchServiceFactory.MongoDbPersistenceDescriptor, SearchMongoDbPersistence_1.SearchMongoDbPersistence);
        this.registerAsType(SearchServiceFactory.ElasticPersistenceDescriptor, SearchElasticPersistence_1.SearchElasticPersistence);
        this.registerAsType(SearchServiceFactory.ControllerDescriptor, SearchController_1.SearchController);
        this.registerAsType(SearchServiceFactory.CommandableHttpServiceV1Descriptor, SearchCommandableHttpServiceV1_1.SearchCommandableHttpServiceV1);
    }
}
exports.SearchServiceFactory = SearchServiceFactory;
SearchServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('pip-services-search', 'persistence', 'memory', '*', '1.0');
SearchServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('pip-services-search', 'persistence', 'file', '*', '1.0');
SearchServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('pip-services-search', 'persistence', 'mongodb', '*', '1.0');
SearchServiceFactory.ElasticPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('pip-services-search', 'persistence', 'elastic', '*', '1.0');
SearchServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor('pip-services-search', 'controller', 'default', '*', '1.0');
SearchServiceFactory.CommandableHttpServiceV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-search', 'service', 'commandable-http', '*', '1.0');
//# sourceMappingURL=SearchServiceFactory.js.map