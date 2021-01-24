# Query Param Module

Gets query string parameters from window location substring.

## Installation
```
yarn add @patomation/query-param
```
```
npm install @patomation/query-param --save
```

## Usage

```javascript
import { queryParam } from '@patomation/query-param'

const myParams = queryParam()
```

Example url might be:
```
https://mySite.com/?make=Tesla&model=T&year=2019electric=true
```

Result is one json object:

```javascript
//  myParams =
{
  make: 'Tesla',
  model: 'T',
  year: 2019,
  electric: true
}
```

### localStorage support
You can set a query param with this. It will be persisted in local storage.
So when you redirect and go to a different page the param will be present.

```javascript
import { localStorageQueryParam } from '@patomation/query-param'

const myParams = localStorageQueryParam()
```
Example:
1. navigate to page one with the param
```
https://mySite.com/pageOne/?cool=beans
```
```javascript
//  pageOne params =
{
  cool: 'beans'
}
```
2. navigate to page two without the query string. The param will still exist in local storage
```
https://mySite.com/pageTwo/
```
```javascript
//  pageTwo params =
{
  cool: 'beans'
}
```
The local storage key is 'persist:queryParam'

### Additional notes
- white spaces
```converts %20 to white space```
