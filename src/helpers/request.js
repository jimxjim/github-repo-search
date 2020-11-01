import axios from 'axios'
import { camelizeKeys } from 'humps'

function processRequest (options) {
  const { url, method = 'GET', data, qs } = options
  const HEADER = {
    'Content-Type': 'application/json; charset=UTF-8'
  }
  return axios({
    baseURL: 'https://api.github.com/',
    url: `${url}`,
    method,
    headers: HEADER,
    params: { ...qs },
    data
  })
}

function Request ({ commit, dispatch, state }, type, options) {
  commit(type.process)
  return new Promise((resolve, reject) => {
    processRequest(options)
      .then((response) => {
        const data = camelizeKeys(response.data)
        commit(type.success, data)
        resolve(response)
      })
      .catch((error) => {
        commit(type.error, error)
        reject(error)
      })
  })
}

export default Request
