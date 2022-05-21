const API_URL = 'http://localhost:3000/api'

export const request = async (method: string, route: string, data?: any, headers = {}) => {
  let response = await fetch(API_URL + route, {
    method: method,
    body: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr',
      //   Authorization: token ? `Bearer ${token}` : undefined,
      ...headers
    }
  })
  response = await response.json()
  return response
}
