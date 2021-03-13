export interface Params {
  [key: string]: string | boolean | number | string[]
}

// Return true is string first character = [ and last = ]
const isArray = (value: string): boolean => {
  const firstCharacter = value.substr(0, 1)
  const lastCharacter = value.substr(value.length - 1, 1)
  return (firstCharacter === '[' && lastCharacter === ']')
}

// An opinionated way to parse array strings
// We want our array string to be an array "[abc,134,foobar]"
const parseArray = (value: string): string[] => {
  return value.replace(/\[/g, '')
    .replace(/\]/g, '')
    .split(',')
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
      // handle arrays
      else if (isArray(value)) {
        acc[key] = parseArray(value)
      // handle sentences and strings
      } else acc[key] = value.replace(/%20/g, ' ')
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
