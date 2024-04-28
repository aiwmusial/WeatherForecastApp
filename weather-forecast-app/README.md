# weather-forecast-app

This application allows users to get the weather forecast for a selected town. 
First, the user types the name of the town and can trigger the appearance of a suggestions list by hitting "Enter" or clicking the "Search" button. It is then necessary to narrow down the selection by clicking on one of the suggestions in the dropdown list. 

An API call is sent to Open Weather's Geocoding API to obtain the coordinates (latitude and longitude) of the chosen location. This information is required to query the weather forecast from Open-Meteo.

The results of the API call are displayed in both a chart and a list format.
    
Happy browsing!
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
