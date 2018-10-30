const CHANNEL = 10;
const CONTROLLER = 80;
const urls = ["https://midi.mand.is", "https://george.mand.is", "https://snaptortoise.com"];
var clickcount = 0;
var clickevent = null;

const midi = require("ble_midi");
midi.init();

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
  }

  clickevent = setTimeout(() => {
    if (clickcount === 1) {
      console.log("Click 1");
      NRF.nfcURL(urls[0]);
      midi.send(CHANNEL, CONTROLLER, 127);
    } else if (clickcount === 2) {
      console.log("Click 2");
      NRF.nfcURL(urls[1]);
      midi.send(CHANNEL, CONTROLLER + 1, 127);
    } else if (clickcount === 3) {
      console.log("Click 3");
      NRF.nfcURL(urls[2]);
      midi.send(CHANNEL, CONTROLLER + 2, 127);
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

const setLEDS = (LED1on, LED2on, LED3on) => {
  LED1.reset();
  LED2.reset();
  LED3.reset();

  if (LED1on) LED1.set();
  if (LED2on) LED2.set();
  if (LED3on) LED3.set();
}

NRF.nfcURL(urls[0]);