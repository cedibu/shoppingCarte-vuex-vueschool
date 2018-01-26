import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // -- data
    products: []
  },

  getters: { //- computed properties
    productsCount () {

    }
  },

  actions: { //peut être complex mais n'altère pas le state
    fetchProducts () {
      //make the call
      // run setProducts mutation
    }
  },

  mutations: {
    //- doit être simple mais altère le state
    //- toujours utiliser les mutations pour updater le state
    setProducts(state, products) {
      //Update products
      state.products = products
    }
  }
})
