import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './pages/ShoppingCartPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import ProductDetailPage from './pages/ProductDetailPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import { LDPlugin } from "launchdarkly-vue-client-sdk"

const app = createApp(App)

// TODO inject via env variables
app.use(LDPlugin, {
  clientSideID: "68519beb63a99d09011f3f5c",
  context: {
    kind: "user",
    key: "anonymous-user",
  },
})

app.use(VueRouter.createRouter({
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
