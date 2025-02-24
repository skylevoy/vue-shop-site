<template>
    <h1>Shopping Cart Page</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingCartList @remove-from-cart="removeFromCart($event)" :cartItems="cartItems" />
        <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-else>
        <h2>Your cart is empty</h2>
    </div>
</template>

<script>
import axios from 'axios';
import ShoppingCartList from '../components/ShoppingCartList.vue';

export default {
    name: 'ShoppingCartPage',
    components: {
        ShoppingCartList,
    },
    props: ['user'],
    data() {
        return {
            cartItems: [],
        }
    },
    watch: {
        async user(newUserValue) {
            if (newUserValue) {
                // Check if the product is already in the cart
                const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
                const cartItems = cartResponse.data;
                this.cartItems = cartItems;
            }
        } 
    },
    methods: {
        async removeFromCart(productId) {
            const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
            const updatedCart = response.data;
            this.cartItems = updatedCart;
        }
    },
    async created() {
        if (this.user) {
            const response = await axios.get(`/api/users/${this.user.uid}/cart`);
            const cartItems = response.data;
            this.cartItems = cartItems;
        }
    }
}
</script>