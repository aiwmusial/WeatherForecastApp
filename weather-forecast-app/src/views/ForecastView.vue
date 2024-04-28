<script setup>
import AsyncForecastCard from '../components/AsyncForecastCard.vue';
</script>

<template>
    <Suspense>
        <AsyncForecastCard />
        <template #fallback>
            <p>...Loading data</p>
        </template>
    </Suspense>
</template>