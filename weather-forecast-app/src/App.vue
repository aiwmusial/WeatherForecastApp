<script setup>
import { RouterView } from "vue-router";
import AppNavigation from "./components/AppNavigation.vue";
</script>

<template>
	<div>
		<AppNavigation />
		<RouterView />
	</div>
</template>

