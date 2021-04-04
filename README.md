# youtube-webos
Youtube App without ADs

## Pre-requisites
* Install webOS SDK - https://webostv.developer.lge.com/sdk/installation/
* Setup webOS app testing to load apps in developer mode - https://webostv.developer.lge.com/develop/app-test

## Building
* Clone the repository
```
git clone https://github.com/FriedChickenButt/youtube-webos.git
```
* Enter the folder and build the App, this will generate a `*.ipk` file.
```
cd youtube-webos && ares-package .
```

## Installation
```
ares-install -d <alias of your TV> <.ipk file>
```

## Launching
* The app will be available in the TV's app list or launch it using ares-cli.
```
ares-launch -d <alias of your TV> com.youtube.noads
```