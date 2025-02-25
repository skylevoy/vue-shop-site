<template>
    <div class="nav-bar">
        <router-link to="/products" class="products-link">
            <div class="logo-wrap">
                <img :src="logo" alt="Logo" />
            </div>
        </router-link>
        <div class="nav-buttons-wrap">
            <router-link to="/cart">
                <button>Shopping Cart</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import logo from '@/assets/logo-hexagon.svg';

export default {
    name: 'NavBar',
    data() {
        return {
            logo,
        }
    },
}

</script>