# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Search microservice

This is Search microservice from Pip.Services library. 

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB, Elastic

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-integration/pip-clients-search-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)

## Contract

Logical contract of the microservice is presented below. 

```typescript
class SearchRecordV1 implements IStringIdentifiable {
    public id: string;
    public type: string;
    public subtype?: string;

    public refs?: ReferenceV1[]; // Reference to document or documents this comment bound to

    public name: string;
    public time: Date;
    public field1?: string;
    public field2?: string;
    public field3?: string;
    public tags?: string[];

    public content?: string;
}

class ReferenceV1 {
    public id: string;
    public type: string;
    public subtype?: string;
    public name?: string;
    public parent?: boolean;
}

interface ISearchV1 {
    getRecords(correlationId: string, filter: FilterParams, paging: PagingParams, sort: SortParams,
        callback: (err: any, page: DataPage<SearchRecordV1>) => void): void;

    getRecordById(correlationId: string, recordId: string,
        callback: (err: any, record: SearchRecordV1) => void): void;

    setRecord(correlationId: string, record: SearchRecordV1,
        callback: (err: any, record: SearchRecordV1) => void): void;

    updateRecord(correlationId: string, record: SearchRecordV1,
        callback: (err: any, record: SearchRecordV1) => void): void;

    deleteRecordById(correlationId: string, recordId: string,
        callback: (err: any, record: SearchRecordV1) => void): void;}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-integration/pip-services-search-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-search"
  description: "search microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-search:persistence:file:default:1.0"
  path: "./data/search_records.json"

- descriptor: "pip-services-search:controller:default:default:1.0"

- descriptor: "pip-services-search:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-search-node": "^1.1.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-search-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.SearchHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new search record
var record = {
    id: '1',
    type: 'Test type1',
    name: 'Test name 1',
    time: new Date(2014, 1, 1),
    refs: [
        {
            id: '1',
            type: 'type1',
            name: 'name1',
            parent: true,
            subtype: 'subtype1'
        }
    ],
    tags: ['black']
};

client.setRecord(
    null,
    record,
    function (err, record) {
        ...
    }
);
```

```javascript
// Get the list of search records
client.getRecords(
    null,
    {
        type: 'Test type1',
        name: 'Test name 1'
    },
    {
        total: true,
        skip: 0,
        take: 10
    },
    function(err, page) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
