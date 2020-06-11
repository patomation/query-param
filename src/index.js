//Get query string from window object
const queryString =  typeof window !== 'undefined' && window
  ? window.location.search.substring(1)
  : {}
  
const queryParam = () => {
  //Split by & and reduce array into object
  return queryString.split('&').reduce( ( acc, item ) => {
    //Split item pair by = into key and value
    const [ key, value ] = item.split('=')
    //If key and value add to object
    if(key && value) acc[key] = value.replace('%20', ' ')
    // handle booleans
    if(value === 'true') acc[key] = true
    if(value === 'false') acc[key] = false
    //return mutated object
    return acc
  }, {})
}

export default queryParam
