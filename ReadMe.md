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
import queryParam from '@patomation/query-param'

const myParams = queryParam()
```

Example url migt be:
```
https://mySite.com/?make=Tesla&model=T&year=2019
```

Result is one json object:

```javascript
//  myParams =
{
  make: 'Tesla',
  model: 'T',
  year: 2019
}
```

### Additional notes
- white spaces
```converts %20 to white space```
