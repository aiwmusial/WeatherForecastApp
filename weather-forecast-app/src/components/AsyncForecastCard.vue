<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { weatherCodes } from "@/assets/weatherCodes.js";
import  WeatherForecastChart from "../components/WeatherForecastChart.vue";
import WeatherForecastListItem from "../components/WeatherForecastListItem.vue"


const route = useRoute();

const weatherData = ref({
    current: null,
    hourly: {
        time: [],
        temperature_2m: [],
        precipitation: [],
        precipitation_probability: [],
        weather_code: [] 
    }
});
const error = ref(null);

const isValidWeatherData = (json) => {
    const isValidCurrent = json.current && 
                            typeof json.current.temperature_2m === 'number' && 
                            typeof json.current.time === 'string';

    const isValidHourly = json.hourly &&
        Array.isArray(json.hourly.time) && 
            json.hourly.time.every(time => typeof time === 'string') &&
        Array.isArray(json.hourly.temperature_2m) && 
            json.hourly.temperature_2m.every(temp => typeof temp === 'number') &&
        Array.isArray(json.hourly.precipitation) && 
            json.hourly.precipitation.every(precip => typeof precip === 'number') &&
        Array.isArray(json.hourly.precipitation_probability) && 
            json.hourly.precipitation_probability.every(prob => typeof prob === 'number') &&
        Array.isArray(json.hourly.weather_code) && 
            json.hourly.weather_code.every(code => typeof code === 'number');

    const arraysHaveEqualLength = isValidHourly && (
        json.hourly.time.length === json.hourly.temperature_2m.length &&
        json.hourly.temperature_2m.length === json.hourly.precipitation.length &&
        json.hourly.precipitation.length === json.hourly.precipitation_probability.length &&
        json.hourly.precipitation_probability.length === json.hourly.weather_code.length
    );

    return isValidCurrent && isValidHourly && arraysHaveEqualLength;
}

const getWeatherForecast = () => {
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.lon}&current=temperature_2m&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&timezone=auto&forecast_days=1`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((json) => {
        if(isValidWeatherData(json)){
            weatherData.value = {
                current: json.current,
                hourly: {
                    time: json.hourly.time,
                    temperature_2m: json.hourly.temperature_2m,
                    precipitation: json.hourly.precipitation,
                    precipitation_probability: json.hourly.precipitation_probability,
                    weather_code: json.hourly.weather_code
                }
            };   
                 
            error.value = null; 
        } else {
            throw new Error("Invalid data format");
        }
        return { weatherData, error };
    })
    .catch(err => {
        error.value = err;
        weatherData.value = null;
        return { weatherData, error };
    });
}

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

const weatherForecastData = await getWeatherForecast();

const minTemperature = computed(() => {
    return Math.floor(Math.min(...weatherData.value.hourly.temperature_2m) / 5) * 5;
});

const maxTemperature = computed(() => {
    return Math.ceil(Math.max(...weatherData.value.hourly.temperature_2m) / 5) * 5;
});

const maxPrecipitation = computed(() => {
    return Math.ceil(Math.max(...weatherData.value.hourly.precipitation) / 5) * 5;
});

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
                :minTemperature="minTemperature"
                :maxTemperature="maxTemperature"
                :maxPrecipitation="maxPrecipitation"
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