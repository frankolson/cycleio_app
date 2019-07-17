const BASE_URL = 'http://localhost:8000/'

function callApi(endpoint: string, authenticated: boolean) {
  const token = localStorage.getItem('id_token') || null
  console.log(token);

  let config = {}

  if(authenticated) {
    if(token) {
      config = {
        headers: { 'Authorization': token }
      }
    }
    else {
      throw "Cannot locate saved token."
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response => response.json())
    .catch((err: any) => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default (store: any) => (next: any) => (action: any) => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, types, authenticated } = callAPI
  const [ requestType, successType, errorType ] = types

  store.dispatch({type: requestType});

  return callApi(endpoint, authenticated).then(
    response => next({
      response,
      type: successType
    }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}