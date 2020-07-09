// import { ConfigParams } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { JsonFilePersister } from 'pip-services3-data-node';

// import { SearchMemoryPersistence } from './SearchMemoryPersistence';
// import { SearchV1 } from '../data/version1/SearchV1';

// export class SearchFilePersistence extends SearchMemoryPersistence {
// 	protected _persister: JsonFilePersister<SearchV1>;

//     public constructor(path?: string) {
//         super();

//         this._persister = new JsonFilePersister<SearchV1>(path);
//         this._loader = this._persister;
//         this._saver = this._persister;
//     }

//     public configure(config: ConfigParams): void {
//         super.configure(config);
//         this._persister.configure(config);
//     }

// }