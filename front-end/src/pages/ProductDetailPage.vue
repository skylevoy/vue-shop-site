<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" alt="Product Image" />
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button class="add-to-cart" @click="addToCart" v-if="!itemIsInCart">Add to Cart</button>
            <button class="already-in-cart" v-if="itemIsInCart">Item is already in cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';

export default {
    name: 'ProductDetailPage',
    props: ['user'],
    data() {
        return {
            product: {},
            cartItems: [],
        }
    },
    computed: {
        itemIsInCart() {
            return this.cartItems.some(item => item.id === this.$route.params.productId);
        }
    },
    watch: {
        async user(newUserValue) {
            if (newUserValue) {
                // Check if the product is already in the cart
                const cartResponse = await axios.get(`/api/users/${newUserValue}/cart`);
                const cartItems = cartResponse.data;
                this.cartItems = cartItems;
            }
        } 
    },
    methods: {
        async addToCart() {
            await axios.post(`/api/users/${this.user}/cart`, {
                id: this.$route.params.productId,
            });
            alert('Successfully added item to cart');
        },
    },
    async created() {
        const response = await axios.get(`/api/products/${this.$route.params.productId}`);
        const product = response.data;
        this.product = product;

        const cartResponse = await axios.get(`/api/users/${this.user}/cart`);
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
    },
    components: {
        NotFoundPage,
    },
}
</script>