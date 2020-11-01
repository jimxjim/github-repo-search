import Request from '@/helpers/request'

const state = {
  data: {},
  message: {},
  processing: {},
  error: {}
}

const actions = {
  searchRepo (store, form) {
    Request(store,
      {
        process: 'SEARCH_REPO_PROCESS',
        success: 'SEARCH_REPO_SUCCESS',
        error: 'SEARCH_REPO_ERROR'
      },
      {
        url: 'search/repositories',
        qs: form,
        method: 'GET'
      })
  }
}

const mutations = {
  SEARCH_REPO_PROCESS (rootState) {
    rootState.processing = {
      ...rootState.processing,
      searchRepo: true
    }
    rootState.error = {
      ...rootState.error,
      searchRepo: null
    }
  },
  SEARCH_REPO_SUCCESS (rootState, response) {
    rootState.processing = {
      ...rootState.processing,
      searchRepo: false
    }
    rootState.data = {
      ...rootState.data,
      searchRepo: response
    }
  },
  SEARCH_REPO_ERROR (rootState, error) {
    rootState.processing = {
      ...rootState.processing,
      searchRepo: false
    }
    rootState.error = {
      ...rootState.error,
      searchRepo: error
    }
  }
}

export default {
  state,
  actions,
  mutations
}
