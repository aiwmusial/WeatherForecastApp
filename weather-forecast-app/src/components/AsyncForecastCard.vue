<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { weatherCodes } from "@/assets/weatherCodes.js";
import  WeatherForecastChart from "../components/WeatherForecastChart.vue";
import WeatherForecastListItem from "../components/WeatherForecastListItem.vue"


const route = useRoute();

const weatherData = ref(null);
const error = ref(null);

const getWeatherForecast = async () => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.lon}&current=temperature_2m&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&timezone=auto&forecast_days=1`);
        const json = await response.json();
        weatherData.value = json;
    } catch (err) {
        error.value = err;
    }
}
const weatherForecastData = await getWeatherForecast();

const formatDate = (date) => {
    const dateForecast = date.split("T");
    return `${dateForecast[1]}`
};

const formatDateUkString = (date) => {
    const forecastDate = new Date(date)
    return forecastDate.toLocaleDateString("en-GB", 
        {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    ) 
}

const getWeatherDescription = (code) => {
    return weatherCodes[code] ? weatherCodes[code].description : 'No weather description provided';
}

const getWeatherIcon = (code) => {
    return weatherCodes[code] ? `fas ${weatherCodes[code].icon} fa-2xl ms-3` : '';
}
</script>

<template>
    <div class="card text-center col-11 mx-auto mt-5 mb-5">
        <div class="card-header">
            {{route.params.city}}, {{route.params.state}}, {{route.params.country}}
        </div>
        <div class="card-body col-11">
            <h5 class="card-title">
                {{ formatDateUkString(weatherData.current.time) }}
            </h5>
            <h1 class="display-5">{{ weatherData.current.temperature_2m }}&deg C</h1>
            <WeatherForecastChart 
                :days="weatherData.hourly.time.map(dateTime => formatDate(dateTime))"
                :precipitationData="weatherData.hourly.precipitation"
                :temperatureData="weatherData.hourly.temperature_2m"
                :minTemperature="Math.floor(Math.min(...weatherData.hourly.temperature_2m) / 5) * 5"
                :maxTemperature="Math.ceil(Math.max(...weatherData.hourly.temperature_2m)/ 5) * 5"
                :maxPrecipitation="Math.ceil(Math.max(...weatherData.hourly.precipitation)/ 5) * 5"
            />
            <ul class="list-group">
                <WeatherForecastListItem 
                    v-for="(dateHourly, index) in weatherData.hourly.time" :key="index"
                    :dateUk="formatDateUkString(dateHourly)"
                    :dateTime="formatDate(dateHourly)"
                    :temperature="weatherData.hourly.temperature_2m[index]"
                    :precipitationPropability="weatherData.hourly.precipitation_probability[index]"
                    :precipitation="weatherData.hourly.precipitation[index]"
                    :weatherDescription="getWeatherDescription(weatherData.hourly.weather_code[index])"
                    :weatherIcon="getWeatherIcon(weatherData.hourly.weather_code[index])"
                />
            </ul>
        </div>
    </div>   
</template>