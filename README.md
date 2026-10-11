# puck-js-midi-clicker

Repo: <https://github.com/georgemandis/puck-js-midi-clicker> (this folder is the 2026 refresh of it)

A [Puck.js](https://www.puck-js.com/) as a Bluetooth MIDI controller. Count the clicks on its one
button, send a CC per count. I used it as a slide clicker for talks: the slide deck listened for MIDI
and nobody could tell what I was holding. The 2017 version talked to the BLE MIDI service by hand;
since 2019 Espruino ships that as the `ble_midi` module, thanks to
[joebowbeer/PuckCC](https://github.com/joebowbeer/PuckCC) working out the advertising bytes.

## What it sends

Status byte `0xBA`: control change, channel 11 if you count from 1 (the Explorer does), channel 10 if
you count from 0 (the script and the `ble_midi` module do). Value is always 127.

| Clicks | Message | Bytes | Also |
|---|---|---|---|
| 1 | CC 80 | `BA 50 7F` | NFC tag set to `urls[0]`, green LED while down |
| 2 | CC 81 | `BA 51 7F` | NFC tag set to `urls[1]`, red LED |
| 3 | CC 82 | `BA 52 7F` | NFC tag set to `urls[2]`, blue LED |
| 4 | CC 83 | `BA 53 7F` | red and green flash until the next four clicks, all three LEDs while down |

A run of clicks ends after 350 ms of quiet. Nothing is sent on release. The device advertises as
`PuckCC`, the name `ble_midi` uses.

The NFC part is unrelated to MIDI: a phone held to the Puck opens the URL for the last click count. A
business card with three sides. Change `urls` or delete the three `NRF.nfcURL` lines.

## Flash

1. Open the [Espruino Web IDE](https://www.espruino.com/ide/) in Chrome (Web Bluetooth; Firefox and
   Safari cannot). Click the connect icon, pick the Puck.
2. Paste `puck-js-triple-click.js` into the right-hand editor and click Send to Espruino.
3. In the left-hand console type `save()` so the code survives a battery pull.

## Pair

The Puck advertises MIDI as soon as the script runs. On macOS: Audio MIDI Setup, Window, Show MIDI
Studio, the Bluetooth icon, Connect next to `PuckCC`. It then appears to every MIDI program as a
source named `PuckCC`, including Web MIDI in Chrome. On iOS any app with a Bluetooth MIDI panel
(GarageBand has one). Windows needs a helper app for Bluetooth MIDI; loopMIDI plus MIDIberry is the
usual pair, untested here.

## Battery

A CR2032. One lasted me a conference season of talks. Disconnect the IDE after `save()`; the Puck
keeps running on its own.

## Other Espruino scripts

- `../espruino-zoom-muter/`: the same button as a Bluetooth keyboard, a telephony mute button, or a
  MIDI CC.
- `midi-experiments/pucks-js-magnetometer-to-midi-signal.js` on my disk turned the magnetometer into
  three notes with the light sensor as volume. Not cleaned up yet.

## Licence

MIT, since 2017. See `LICENSE`.
