# setup environment

## setup the Raspberry Pi

For the Display to function correct some configuration in the config.txt file has to be done.
You can edit this file right after you flashed the OS on the SD card or as super user with a text editor.
after you made your changes you need to reboot the os.
```
$ sudo nano /boot/config.txt
```

The case has a Power-Button and a transistor that can power on the fan.
You need to configure GPIO-Pins for these.
These will also be configured in the `config.txt`.
```

```

## development environment

The recommended development environment ist Visual Studio Code.
To develop on the Pi from a different Computer use the [Remote - SSH](vscode:extension/ms-vscode-remote.remote-ssh) extension.
For Vue use the [Vue Language Features (Volar)](vscode:extension/Vue.volar) extension. For Python the  [Python](vscode:extension/ms-python.python) extension.

To setup the Raspberry Pi for Remote Development you just need to enable ssh.
The openssh-server should be installed by default.
If not it can be installed via:
```
$ sudo apt-get install openssh-server
```
For convenience the service can be started on startup:
```
$ sudo systemctl enable ssh
``` 
Add to the config file in your `.ssh`-Folder the information of your pi.
```
Host RaspberryPi
    user pi
    HostName 192.168.0.123
```
Press `Strg+Shift+P` in VS Code and type `ssh`.
Click on Remote-SSH: Connect current Window to Host.
Now you can clone the Project in the integrated Terminal and open it with `code <path to project>`.

## Mirror Screen 

You can view the screen of the Pi with TeamViewer.
In contrast to XRDP you can view the same Screen as the Touchscreen on your PC.
This is useful for keyboard inputs an debugging.

## Setup Project

You need to install the neutralino cli globally.

```
npm install -g @neutralinojs/neu
``` 
Than you can install all npm dependencies.
```
cd vue
npm install
```
Update neutralino to the latest Version. 
```
neu update
```
Now you can start the Developing mode by starting the vite server and the neutralino-process via the cli. The app will appear on the touch screen.
```
npm run dev
# in the root dir
DISPLAY=:0 nohup neu run --frontend-lib-dev --arch=armhf
```

To build the app you first need to build the vue app.
```
# in the /vue dir
npm run build
```
Then you cen build the neutralino Application. The resulting Binaries can be found in the `dist/` folder.
```
neu build
```

## Required Packages

eSpeak NG is required for  speech synthesis.
```
sudo apt-get install espeak-ng espeak-ng-espeak mbrola 
``` 
