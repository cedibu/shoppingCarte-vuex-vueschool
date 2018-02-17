import shop from  '@/api/shop'

// - L'action décide quand une mutation doit se déclencher
// - L'action peut être complex mais n'altère pas le state
export default { // = methods
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

  addProductToCart ({state, getters, commit}, product) {
    if (getters.productIsInStock(product)) {
      const cartItem = state.cart.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', product.id)
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      commit('decrementProductInventory', product)
    }
  },

  checkout ({state, commit}) {
    shop.buyProducts(
      state.cart,
      () => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
      },
      () => {
        commit('setCheckoutStatus', 'fail')
      }
    )
  }
}
