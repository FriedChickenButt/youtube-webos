# youtube-webos
Youtube App without ADs

## Pre-requisites
* (Optionally) Install webOS SDK - https://webostv.developer.lge.com/sdk/installation/
* Setup webOS app testing to load apps in developer mode - https://webostv.developer.lge.com/develop/app-test
* Uninstall YouTube app.

## Building
* Clone the repository
```sh
git clone https://github.com/FriedChickenButt/youtube-webos.git
```
* Enter the folder and build the App, this will generate a `*.ipk` file.
```sh
cd youtube-webos

# Install dependencies (need to do this only when updating local repository / package.json is changed)
npm install

npm run build && npm run package
```

## Installation
```
npm run deploy
```

## Launching
* The app will be available in the TV's app list or launch it using ares-cli.
```sh
npm run launch
```

To jump immediately into some specific video use:
```sh
npm run launch -- -p '{"contentTarget":"v=F8PGWLvn1mQ"}'
```
