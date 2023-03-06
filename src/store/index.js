import {createStore} from "vuex"

const store = createStore({
  state: {
    contextShow: false,
    loading: false,
    fixData: {},
    validationErrors: [],
    showValidate: false,
    searchTerm: "",
    inputValue: "",
    toastShow: false,
    deleteDialogShow: false,
    clickDelete: false,
    
  },
  getters: {

  }, 
  mutations: {
    loading(state, loading) {
      state.loading = loading
    },
    contextShow(state, contextShow) {
      state.contextShow = contextShow
    },
    fixData(state, data) {
      console.log(213123123, data);
      state.fixData = data
    },
    validationErrors(state, data) {
      state.validationErrors.push(data)
    },
    showValidate(state, data) {
      state.showValidate = data
    },
    searchTerm(state, data) {
      state.searchTerm = data
    },
    inputValue(state, data) {
      state.inputValue = data
    },
    toastShow(state, data) {
      state.toastShow = data
    },
    deleteDialogShow(state, data) {
      state.deleteDialogShow = data
    },
    eId(state, data) {
      console.log(3132, data);
      state.eId = data
    },
    clickDelete(state, data) {
      state.clickDelete = data
    }
  },
  actions: {

  }
})

export default store