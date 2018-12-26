# Puck.js MIDI Clicker
Use Puck.js as a BLE MIDI controller. Reacts to single (1), double (2) and triple (3) clicks. Four (4) clicks will broadcast the initial MIDI BLE signal that your computer will be looking for to pair with.

The fastest and simplest way to load this script onto your [Puck.js](https://www.puck-js.com/) is to use the [web IDE](https://www.espruino.com/Web+IDE). It should only take a few moments to connect and upload.

To start broadcasting a BLE MIDI signal that will allow your computer to pair with Puck.js as a MIDI device you have to triple click the device.

Sends CC values of **80** (single-click), **81** (double-click) and **82** (triple-click) on channel 10.

There are a million ways to repurpose this but I used mine to demonstrate non-musical MIDI applications as a slideshow clicker for [my presentation](https://speakerdeck.com/georgemandis). 

Also, because Puck.js is fun and NFC tags are nifty, I've added some lines to take advantage of the `NRF.nfcURL()` method. In addition to sending a MIDI single for one, two or three clicks, a different NFC URL is broadcast as well. This let me use it a little bit like an invisible business card for capable phones and could be theoretically useful at these talks when I'm telling people to visit my [MIDI resource website](https://midi.mand.is).

Thanks to [joebowbeer/PuckCC](https://github.com/joebowbeer/PuckCC) for identifying the NRF values to set the Puck.js to broadcast as a BLE MIDI device! It's now available as a module (`ble_midi`) to all Espruino devices. You can read more about that here: [https://www.espruino.com/Puck.js+MIDI](https://www.espruino.com/Puck.js+MIDI)

[midi.mand.is](http://midi.mand.is)
