<template>
  	<div ref="chartContainer" class="chart-container col-10"></div>
</template>
  
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
  
const props = defineProps({
	days: Array,
	precipitationData: Array,
	temperatureData: Array,
	minTemperature: Number,
	maxTemperature: Number,
	maxPrecipitation: Number

})

const chartContainer = ref(null);
let myChart = null;

const setupChart = () => {
const option = {
	tooltip: {
		trigger: 'axis',
			axisPointer: {
			type: 'cross',
			crossStyle: {
				color: '#999'
			}
		}
	},
	toolbox: {
		feature: {
		dataView: { show: true, readOnly: false },
		magicType: { show: true, type: ['line', 'bar'] },
		restore: { show: true },
		saveAsImage: { show: true }
		}
	},
	legend: {
		data: ['Precipitation', 'Temperature']
	},
	xAxis: [
	{
		type: 'category',
		data: props.days,
		axisPointer: {
			type: 'shadow'
		},
		axisLabel: {
			interval: 0, 
			rotate: 45 
		}
	}
	],
	yAxis: [
	{
		type: 'value',
		name: 'Precipitation',
		min: 0,
		max: props.maxPrecipitation,
		interval: 50,
		axisLabel: {
			formatter: '{value} mm'
		}
	},
	{
		type: 'value',
		name: 'Temperature',
		min: props.minTemperature,
		max: props.maxTemperature,
		interval: 2.5,
		axisLabel: {
			formatter: '{value} °C'
		}
	}
	],
	series: [
	{
		name: 'Precipitation',
		type: 'bar',
		tooltip: {
			valueFormatter: function (value) {
			return value + ' ml';
			}
		},
		data: props.precipitationData
	},
	{
		name: 'Temperature',
		type: 'line',
		yAxisIndex: 1,
		tooltip: {
			valueFormatter: function (value) {
			return value + ' °C';
			}
		},
		data: props.temperatureData
	}
	]
};

	if (myChart) {
		myChart.setOption(option, true);
	}
}

onMounted(() => {
  	if (chartContainer.value) {
		myChart = echarts.init(chartContainer.value);
		setupChart();
  	}
});

onUnmounted(() => {
  	if (myChart) {
    	myChart.dispose();
  	}
});

</script>

<style>
.chart-container {
width: 100%;
height: 450px; 
}
</style>
  