const BASE_URL = 'http://localhost:8000'

function callApi(endpoint: string, authenticated: boolean) {
  const token = localStorage.getItem('access_token') || null
  let config = {}

  if(authenticated) {
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    }
    else {
      throw "Cannot locate saved token."
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text().then(text => ({ text, response }))
    ).then(({ text }) => text)
    .catch((err: any) => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default (store: any) => (next: any) => (action: any) => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, types, authenticated } = callAPI

  const [ successType, errorType ] = types

  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}