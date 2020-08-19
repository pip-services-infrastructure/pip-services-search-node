import { CommandSet } from 'pip-services3-commons-node';
import { ISearchController } from '../../src/logic/ISearchController';
export declare class SearchCommandSet extends CommandSet {
    private _controller;
    constructor(controller: ISearchController);
    private makeGetSearchCommand;
    private makeGetRecordByIdCommand;
    private makeSetRecordCommand;
    private makeUpdateRecordCommand;
    private makeDeleteRecordByIdCommand;
    private fixRecord;
}
