<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Weather Forecast App <i class="fas fa-cloud-sun-rain"></i></a>
			<button 
				class="navbar-toggler" 
				type="button" 
				data-bs-toggle="collapse" 
				data-bs-target="#navbarNavAltMarkup" 
				aria-controls="navbarNavAltMarkup" 
				aria-expanded="false" 
				aria-label="Toggle navigation"
			>
			<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav">
					<RouterLink :to="{ name: 'home' }">
						<div class="nav-link active" aria-current="page">
							<p>Forecast Search</p>
						</div>
					</RouterLink>
					<RouterLink :to="{ name: 'about' }">
						<div class="nav-link">
							<p>About</p>
						</div>
					</RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
