<template>
    <div>主要内容{{ $route.params.type }}</div>
    <div>{{ samllNav.styleNav[$route.params.type] }}</div>
    <div class="moe">

    </div>
</template>

<script lang="ts" setup>
import { samllNav } from '@/config';


</script>
<style lang="scss" scoped>

</style>