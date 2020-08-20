import { ISearchPersistence } from './ISearchPersistence';
import { FilterParams, IReferences, ConfigParams, SortParams } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IOpenable } from 'pip-services3-commons-node';
import { ICleanable } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { SearchRecordV1 } from '../data/version1';
export declare class SearchElasticPersistence implements ISearchPersistence, IReferenceable, IConfigurable, IOpenable, ICleanable {
    private _connectionResolver;
    private _index;
    private _type;
    private _reconnect;
    private _timeout;
    private _maxRetries;
    private _maxPageSize;
    private _client;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen(): boolean;
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    open(correlationId: string, callback: (err: any) => void): void;
    private createIndexIfNeeded;
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    close(correlationId: string, callback: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, sort: SortParams, callback: (err: any, page: DataPage<SearchRecordV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: SearchRecordV1) => void): void;
    create(correlationId: string, item: SearchRecordV1, callback: (err: any, item: SearchRecordV1) => void): void;
    update(correlationId: string, item: SearchRecordV1, callback: (err: any, item: SearchRecordV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: SearchRecordV1) => void): void;
    private composeFilter;
    composeSort(sort: SortParams): any;
    private isEmpty;
}
