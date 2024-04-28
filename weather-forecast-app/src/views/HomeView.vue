<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchCity = ref("");
const geocodingApiKey = "6983cc41892715076eeeb6e47c2392f3"

const data = ref(null)
const error = ref(null)

const getCityCoordinates = async () => {
	if (searchCity.value) {
	try {
		const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchCity.value}&limit=10&appid=${geocodingApiKey}`);
		const json = await response.json();
		data.value = json; 
		searchCity.value = ""; 
	} catch (err) {
		error.value = err; 
	}
	return { data, error }; 
	}
	return; 
}

const selectCityFromList = (city) => {
	router.push({
	name: "forecast",
	params: {city: city.name, state: city.state, country: city.country},
	query: {
		lat: city.lat,
		lon: city.lon, 
		preview: true
	},
	})
}
</script>

<template>
	<main>
		<div class="container-fluid">
			<div class="row mt-3  d-flex justify-content-center">
			<div class="col-8">
				<div class="card">
				<div class="card-header">
					City Search
				</div>
				<div class="card-body">
					<div class="input-group">
						<input 
							id="citySearch"
							type="text" 
							v-model="searchCity"
							@keyup.enter="getCityCoordinates"
							class="form-control" 
							placeholder="City" 
							aria-label="City" 
							aria-describedby="button-addon2"
						/>
						<button 
							class="btn btn-outline-dark" 
							type="button" id="button-addon2" 
							@click="getCityCoordinates"
						>
							Search
						</button>
					</div>
					<ul
						v-if="data" 
						class="list-group"
					>
						<p  
							v-if="data.length == 0"
							class="list-group-item list-group-item-action list-group-item-danger"
							>
							Sorry, we could not find what you are looking for!
						</p>
						<template v-else>
							<li 
								v-for="city in data"
								:key="JSON.stringify(city)"
								class="list-group-item list-group-item-action list-group-item-secondary"
								@click="selectCityFromList(city)"
							>
								{{ city.name }}, {{ city.state }}, {{ city.country }}
							</li>
						</template>
					</ul>
					<div v-if="error">Oops! Error encountered: {{ error.message }}</div>
				</div>
				</div>
			</div>
			</div>
		</div>
	</main>
</template> 

