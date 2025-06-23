<template>
    <h1>Products</h1>
    <ProductsList :products="products" />
    <div v-if="saveDraftButton">TESTING TEXT PROBS CHANGE LATER</div>
</template>

<script>
/* eslint-disable */
import { useLDClient } from 'launchdarkly-vue-client-sdk';

export default {
    data() {
        return {
            saveDraftButton: null,
        };
    },
    async mounted() {
        const ldClient = useLDClient();

        ldClient.on('ready', () => {
            this.saveDraftButton = ldClient.variation('save-draft-button', false);
        });
        ldClient.on('change', () => {
            this.saveDraftButton = ldClient.variation('save-draft-button', false);
        });
    },
};
/*
import axios from 'axios';
import ProductsList from '../components/ProductsList.vue';

export default {
    name: 'ProductsPage',
    components: {
        ProductsList,
    },
    data() {
        return {
            products: [],
        }
    },
    async created() {
        const response = await axios.get('/api/products');
        const products = response.data;
        this.products = products;
    }
}
*/
</script>