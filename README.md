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

## Development TV setup

### Configuring @webosose/ares-cli with Developer Mode App
This is partially based on: https://webostv.developer.lge.com/develop/app-test/using-devmode-app/
* Install Developer Mode app from Content Store
* Enable developer mode, enable keyserver
* Download TV's private key: `http://TV_IP:9991/webos_rsa`
* Configure the device using `ares-setup-device` (`-a` may need to be replaced with `-m` if device named `webos` is already configured)
  * `PASSPHRASE` is the 6-character passphrase printed on screen in developer mode app
```sh
ares-setup-device -a webos -i "username=prisoner" -i "privatekey=/path/to/downloaded/webos_rsa" -i "passphrase=PASSPHRASE" -i "host=TV_IP" -i "port=9922"
```

### Configuring @webosose/ares-cli with Homebrew Channel / root
* Enable sshd in Homebrew Channel app
* Generate ssh key on developer machine (`ssh-keygen`)
* Copy the public key (`id_rsa.pub`) to `/home/root/.ssh/authorized_keys` on TV
* Configure the device using `ares-setup-device` (`-a` may need to be replaced with `-m` if device named `webos` is already configured)
```sh
ares-setup-device -a webos -i "username=root" -i "privatekey=/path/to/id_rsa" -i "passphrase=SSH_KEY_PASSPHRASE" -i "host=TV_IP" -i "port=22"
```

**Note:** @webosose/ares-cli doesn't need to be installed globally - you can use a package installed locally after `npm install` in this repo by just prefixing above commands with local path, like so: `node_modules/.bin/ares-setup-device ...`

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
