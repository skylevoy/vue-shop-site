<template>
    <div 
        class="product-container"
        v-for="product in cartItems"
        :key="product.id"
    >
        <img class="product-image" :src="product.imageUrl" alt="Product Image" />
        <div class="details-wrap">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
        </div>
        <button class="remove-button" @click="$emit('remove-from-cart', product.id)">Remove from Cart</button>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartList',
    props: ['cartItems'],
}
</script>