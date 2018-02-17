import shop from '@/api/shop'

export default {
  state: {
    items: [],
    checkoutStatut: null
  },

  getters: {
    cartProducts (state, getters, rootState) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal(state, getters) {
      //idem que le reduce ci-dessous
      // let total = 0
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity
      // })
      // return total
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    }
  },

  mutations: {
    pushProductToCart (state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatut = status
    },

    emptyCart(state) {
      state.items = []
    }
  },

  actions: {
    addProductToCart ({state, getters, commit, rootState}, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.items.find(item => item.id === product.id)
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
        state.items,
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
}
