export interface Params {
  [key: string]: string | boolean | number
}

export const queryParam = (): Params => {
  // Get query string from window object
  const queryString = typeof window !== 'undefined' && window !== null
    ? window.location.search.substring(1)
    : ''
  // Split by & and reduce array into object
  return queryString.split('&').reduce((acc: Params, item: string): Params => {
    // Split item pair by = into key and value
    const [key, value] = item.split('=')

    if (key !== undefined && value !== undefined) {
      // handle booleans
      if (value === 'true') acc[key] = true
      else if (value === 'false') acc[key] = false
      // handle numbers
      else if (!isNaN(parseInt(value))) acc[key] = parseInt(value)
      // handle sentences and strings
      else acc[key] = value.replace(/%20/g, ' ')
    }

    // return mutated object
    return acc
  }, {})
}

export const localStorageQueryParam = (): Params => {
  const LOCAL_STORAGE_KEY = 'persist:queryParam'
  const params = queryParam()

  const persistParamString = localStorage.getItem(LOCAL_STORAGE_KEY)

  let persistParams = {}
  if (persistParamString !== null && persistParamString !== undefined) {
    persistParams = JSON.parse(persistParamString)
  }

  // Combine params from query string and from local storage
  const newParams = {
    ...persistParams,
    ...params
  }

  // Save the combined params back to local storage for next time
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newParams))

  return newParams
}
