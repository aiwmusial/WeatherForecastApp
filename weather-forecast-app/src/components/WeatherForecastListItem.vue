<script setup>
const props = defineProps({
    dateUk: String,
    dateTime: String,
    temperature: Number,
    precipitationPropability: Number,
    precipitation: Number,
    weatherDescription: String,
    weatherIcon: String
})
</script>

<template>
    <li class="list-group-item text-start">
        <h5 class="d-flex justify-content-between">
            {{ dateUk }}, {{ dateTime }}
            <span class="lead me-5">{{ temperature }}&deg C</span>
        </h5>
        <p class="lead">
            {{ precipitationPropability }}% chances of rain, 
            {{ precipitation }}mm of rainfall
        </p>         
        <small class="text-muted">
            {{ weatherDescription }} 
        </small>
        <i :class="weatherIcon"></i>
      </li>
</template>