<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        {{product.title}} - {{product.price | currency}} - {{product.quantity}}
      </li>
    </ul>
    <p>Total : {{total | currency}}</p>
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatut">{{checkoutStatut}}</p>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters('cart', {
        products: 'cartProducts',
        total: '  cartTotal'
      }),

      ...mapState('cart', {
        checkoutStatut: state => state.checkoutStatut
      })
    },

    methods: {
      ...mapActions('cart', ['checkout'])
    }
  }
</script>

<style>

</style>
