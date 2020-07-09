// import { Descriptor } from 'pip-services3-commons-node';
// import { CommandableLambdaFunction } from 'pip-services3-aws-node';
// import { SearchServiceFactory } from '../build/SearchServiceFactory';

// export class SearchLambdaFunction extends CommandableLambdaFunction {
//     public constructor() {
//         super("search", "Search function");
//         this._dependencyResolver.put('controller', new Descriptor('pip-services-search', 'controller', 'default', '*', '*'));
//         this._factories.add(new SearchServiceFactory());
//     }
// }

// export const handler = new SearchLambdaFunction().getHandler();