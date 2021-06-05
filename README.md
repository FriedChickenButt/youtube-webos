# youtube-webos
Youtube App without ADs

## Pre-requisites
* (Optionally) Install webOS SDK - https://webostv.developer.lge.com/sdk/installation/
* Setup webOS app testing to load apps in developer mode - https://webostv.developer.lge.com/develop/app-test
* Uninstall YouTube app.

## Building
* Clone the repository
```
git clone https://github.com/FriedChickenButt/youtube-webos.git
```
* Enter the folder and build the App, this will generate a `*.ipk` file.
```
cd youtube-webos

# Optionally, if you haven't installed full SDK:
npm install

npm run package
```

## Installation
```
npm run deploy
```

## Launching
* The app will be available in the TV's app list or launch it using ares-cli.
```
npm run launch
```
