const CHANNEL = 10;
const CONTROLLER = 80;
const urls = ["https://midi.mand.is", "https://george.mand.is", "https://snaptortoise.com"];
var clickcount = 0;
var clickevent = null;

setWatch((e) => {
  clickcount++;
  if (clickevent !== null) clearTimeout(clickevent);

  if (clickcount === 1) {
    setLEDS(false, true, false);
  } else if (clickcount === 2) {
    setLEDS(true, false, false);
  } else if (clickcount === 3) {
    setLEDS(false, false, true);
  } else {
    setLEDS(true, true, true);

    // Initiate MIDI BLE connection 
    NRF.setServices({
      "03B80E5A-EDE8-4B33-A751-6CE34EC4C700": { // MIDI
        "7772E5DB-3868-4112-A1A9-F2669D106BF3": {
          readable: true,
          writable: true,
          notify: true,
          value: [0x80, 0x80, 0x00, 0x00, 0x00]
        }
      }
    });

    NRF.setAdvertising([
      // Flags: LE Limited Discoverable Mode, BR/EDR Not Supported
      0x02, 0x01, 0x05,
      // Complete Local Name: PuckCC
      0x07, 0x09, 0x50, 0x75, 0x63, 0x6B, 0x43, 0x43,
      // MIDI
      0x11, 0x06, 0x00, 0xC7, 0xC4, 0x4E, 0xE3, 0x6C, 0x51,
      0xA7, 0x33, 0x4B, 0xE8, 0xED, 0x5A, 0x0E, 0xB8, 0x03
    ]);
  }

  clickevent = setTimeout(() => {
    if (clickcount === 1) {
      console.log("Click 1");
      NRF.nfcURL(urls[0]);
      midiCC(CHANNEL, CONTROLLER, 127);
    } else if (clickcount === 2) {
      console.log("Click 2");
      NRF.nfcURL(urls[1]);
      midiCC(CHANNEL, CONTROLLER + 1, 127);
    } else if (clickcount === 3) {
      console.log("Click 3");
      NRF.nfcURL(urls[2]);
      midiCC(CHANNEL, CONTROLLER + 2, 127);
    }

    clickcount = 0;
  }, 350);
}, BTN, {
  edge: "rising",
  debounce: 10,
  repeat: true
});

setWatch((e) => {
  setLEDS(false, false, false);
  setTimeout(() => {
    clickevent = null;
  }, 400);
}, BTN, {
  edge: "falling",
  debounce: 10,
  repeat: true
});

midiCC(channel, controller, value) => {
  NRF.updateServices({
    "03B80E5A-EDE8-4B33-A751-6CE34EC4C700": { // MIDI
      "7772E5DB-3868-4112-A1A9-F2669D106BF3": {
        value: [0x80, 0x80, 0xB0 + channel, controller, value],
        notify: true
      }
    }
  });
}

setLEDS(LED1on, LED2on, LED3on) => {
  LED1.reset();
  LED2.reset();
  LED3.reset();

  if (LED1on) LED1.set();
  if (LED2on) LED2.set();
  if (LED3on) LED3.set();
}

NRF.nfcURL(urls[0]);