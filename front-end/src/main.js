import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "vue-site-f9dae.firebaseapp.com",
  projectId: "vue-site-f9dae",
  storageBucket: "vue-site-f9dae.firebasestorage.app",
  messagingSenderId: "147869506565",
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: "G-9L8B8S54MV"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/cart',
            component: ShoppingCartPage
        },
        {
            path: '/products',
            component: ProductsPage
        },
        {
            path: '/products/:productId',
            component: ProductDetailPage
        },
        {
            path: '/',
            redirect: '/products'
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage
        }, 
    ]
})
)
.mount('#app')
