# Introduction:

This is the prebuilt version of ReactNativeApp. This version **__DOES NOT__** support Expo Go. You MUST install emulators and dependencies properly in order to run.

# Setting up Environments and Running

## Step 1: ReactNatives and dependencies

You can go to [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) to know how to setup the environments.

>**TL;DR:** This React Native App uses JDK 22. Install Chocolatey and use choco to install nodejs-lts and openjdk22 with `choco install -y nodejs-lts openjdk22`. Then head into project, use `npm install` to get dependencies.

## Step 2: Android Emulator

Please search how to install Android Studio, setup packages and a virtual device. There's a youtube video you can use right [HERE](https://www.youtube.com/watch?v=8ejuHsaXiwU).

## Step 3: Expo Prebuild and Run

You can start up the project with `npx expo run android`. In case of it's not running, try installing expo globally with `npm i -g expo`.

>**Note:** If after running there's nothing showing up on your Virtual Android Device, simply go to the terminal that you just ran `npx expo run android`, hit **a** into the terminal.