import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: ""
// };

// Initialize Firebase
// initializeApp(firebaseConfig);

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
