# Puck.js MIDI Clicker
Use Puck.js as a BLE MIDI controller. Reacts to single, double and triple-clicks.

The fastest and simplest way to load this script onto your [Puck.js](https://www.puck-js.com/) is to use the [web IDE](https://www.espruino.com/Web+IDE). It should only take a few moments to connect and upload.

To start broadcasting a BLE MIDI signal that will allow your computer to pair with Puck.js as a MIDI device you have to triple click the device.

Sends CC values of 80 (single-click), 81 (double-click) and 82 (triple-click) on channel 10.

There are a million ways to repurpose this but I used mine to demonstrate non-musical MIDI applications as a slideshow clicker for [my presentation](https://speakerdeck.com/georgemandis).

Thanks to [joebowbeer/PuckCC](https://github.com/joebowbeer/PuckCC) for identifying the NRF values to set the Puck.js to broadcast as a BLE MIDI device!

[midi.mand.is](http://midi.mand.is)
