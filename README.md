# Contrast Picker

## Description

An App for the RaspberryPi that let's the user pick a color-combination of text and background he can read well.
It also allows to check the quality of a chosen combination.
The Raspberry Pi is equipt with a 7' 1024x600px touch-display and a 16bit ADC connected via i2c.
The Project uses [neutralinojs](https://neutralino.js.org/) with [vue.js](https://vuejs.org/) for the frontend and python scripts for the backend.

## Start Developing

Development on the target-system is advised.
On Windows make sure WebView2 is installed!

To use the live reloading of the vue application:
```
npm install -g @neutralinojs/neu
cd vue
npm install
npm run dev
cd ..
neu run --frontend-lib-dev --arch=armhf
```
Build the application for production:
```
cd vue 
npm run build
cd ..
neu build
```

### Project structure
To add native functionality like reading the ADC neu extensions are found in `extensions/*`.

The vue app is located at `vue/*`.

Make sure you read the Further documentation in  `docs/*`.

