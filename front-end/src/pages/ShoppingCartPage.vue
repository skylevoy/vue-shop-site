<template>
    <h1>Shopping Cart Page</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingCartList :cartItems="cartItems" />
        <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-else>
        <h2>Your cart is empty</h2>
    </div>
</template>

<script>
import { cartItems } from '../temp-data';
import ShoppingCartList from '../components/ShoppingCartList.vue';

export default {
    name: 'ShoppingCartPage',
    components: {
        ShoppingCartList,
    },
    data() {
        return {
            cartItems,
        }
    },
}
</script>