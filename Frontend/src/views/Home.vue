<script setup>
import { ref } from 'vue';
import { useHomeStore } from '@/stores/Home';

const home = useHomeStore();

</script>

<template>
{{ home.krit }}
<h1>Hello welcome to my Home Page</h1>

</template>