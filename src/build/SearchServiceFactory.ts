// import { Factory } from 'pip-services3-components-node';
// import { Descriptor } from 'pip-services3-commons-node';

// import { SearchMongoDbPersistence } from '../persistence/SearchMongoDbPersistence';
// import { SearchFilePersistence } from '../persistence/SearchFilePersistence';
// import { SearchMemoryPersistence } from '../persistence/SearchMemoryPersistence';
// import { SearchController } from '../logic/SearchController';
// import { SearchHttpServiceV1 } from '../services/version1/SearchHttpServiceV1';

// export class SearchServiceFactory extends Factory {
// 	public static Descriptor = new Descriptor("pip-services-search", "factory", "default", "default", "1.0");
// 	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-search", "persistence", "memory", "*", "1.0");
// 	public static FilePersistenceDescriptor = new Descriptor("pip-services-search", "persistence", "file", "*", "1.0");
// 	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-search", "persistence", "mongodb", "*", "1.0");
// 	public static ControllerDescriptor = new Descriptor("pip-services-search", "controller", "default", "*", "1.0");
// 	public static HttpServiceDescriptor = new Descriptor("pip-services-search", "service", "http", "*", "1.0");
	
// 	constructor() {
// 		super();
// 		this.registerAsType(SearchServiceFactory.MemoryPersistenceDescriptor, SearchMemoryPersistence);
// 		this.registerAsType(SearchServiceFactory.FilePersistenceDescriptor, SearchFilePersistence);
// 		this.registerAsType(SearchServiceFactory.MongoDbPersistenceDescriptor, SearchMongoDbPersistence);
// 		this.registerAsType(SearchServiceFactory.ControllerDescriptor, SearchController);
// 		this.registerAsType(SearchServiceFactory.HttpServiceDescriptor, SearchHttpServiceV1);
// 	}
	
// }
