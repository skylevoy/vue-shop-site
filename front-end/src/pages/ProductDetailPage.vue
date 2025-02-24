<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" alt="Product Image" />
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button class="add-to-cart" @click="addToCart" v-if="user && !itemIsInCart">Add to Cart</button>
            <button class="already-in-cart" v-if="user && itemIsInCart">Item is already in cart</button>
            <button class="sign-in" @click="signIn" v-if="!user">Sign in to add to cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
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
                const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
                const cartItems = cartResponse.data;
                this.cartItems = cartItems;
            }
        } 
    },
    methods: {
        async addToCart() {
            await axios.post(`/api/users/${this.user.uid}/cart`, {
                id: this.$route.params.productId,
            });
            alert('Successfully added item to cart');
        },
        async signIn() {
            const email = prompt('Please enter your email to sign in:');
            const auth = getAuth();
            const actionCodeSettings = {
                url: `https://vue-shop-site.onrender.com/products/${this.$route.params.productId}`,
                handleCodeInApp: true,
            }
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            alert('Sign-in link sent to your email');
            window.localStorage.setItem('emailForSignIn', email);
        }
    },
    async created() {
        const auth = getAuth();

        if (isSignInWithEmailLink(auth, window.location.href)) {
            const email = window.localStorage.getItem('emailForSignIn');
            signInWithEmailLink(auth, email, window.location.href);
            alert('Successfully signed in');
            window.localStorage.removeItem('emailForSignIn');
        }

        const response = await axios.get(`/api/products/${this.$route.params.productId}`);
        const product = response.data;
        this.product = product;

        if (this.user) {
           // Check if the product is already in the cart
            const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
            const cartItems = cartResponse.data;
            this.cartItems = cartItems;
        }
    },
    components: {
        NotFoundPage,
    },
}
</script>