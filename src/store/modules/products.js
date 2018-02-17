import shop from '@/api/shop'

export default {
  namespaced: true,
  state:{
    items: []
  },

  getters: {
    availableProducts (state, getters) {
      return state.items.filter(product => product.inventory > 0)
    },


    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  mutations: {
    //- toujours utiliser les mutations pour updater le state
    setProducts (state, products) {
      //Update products
      state.items = products
    },




    decrementProductInventory(state, product) {
      product.inventory--
    }
  },

  // - L'action décide quand une mutation doit se déclencher
  // - L'action peut être complex mais n'altère pas le state
  actions: {
    fetchProducts ({commit}) { //destructuring de "context" afin de récupérer juste "commit" et pouvoir appeler commit('...') plus bas au lieu de context.commit
      return new Promise((resolve, reject) => {
        //make the call
        // run setProducts mutation
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },
  }
}
