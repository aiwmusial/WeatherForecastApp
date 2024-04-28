<script setup>
</script>

<template>
	<main>
		<div class="card col-10 mx-auto mt-5">
			<div class="card-header">
				About Weather Forecast App
			</div>
			<div class="card-body">
				<p class="card-text">
					This application allows users to get the weather forecast for a selected town. 
					First, the user types the name of the town and can trigger the appearance of a suggestions list by hitting "Enter" or clicking the "Search" button. It is then necessary to narrow down the selection by clicking on one of the suggestions in the dropdown list. 
					<br>
					An API call is sent to Open Weather's Geocoding API to obtain the coordinates (latitude and longitude) of the chosen location. This information is required to query the weather forecast from Open-Meteo.
					<br>
					The results of the API call are displayed in both a chart and a list format.
					<br>	
					Happy browsing!
				</p>
			</div>
		</div>
	</main>
</template>
