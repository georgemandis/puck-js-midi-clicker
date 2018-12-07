const CHANNEL = 10;
const CONTROLLER = 80;
const urls = ["https://midi.mand.is", "https://george.mand.is", "https://snaptortoise.com"];
let clickcount = 0;
let clickevent = null;
let flashLEDState = false;
let flashLEDs = false;

const midi = require("ble_midi");

midi.init();

setWatch((e) => {
  clickcount++;
  try {
    if (clickevent !== null) clearTimeout(clickevent);
  } catch (e) {
    console.log("Oops!", e);
  }

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
      disableFlashingLEDs();
    } else if (clickcount === 2) {
      console.log("Click 2");
      NRF.nfcURL(urls[1]);
      midi.send(CHANNEL, CONTROLLER + 1, 127);
      disableFlashingLEDs();
    } else if (clickcount === 3) {
      console.log("Click 3");
      NRF.nfcURL(urls[2]);
      midi.send(CHANNEL, CONTROLLER + 2, 127);
      disableFlashingLEDs();
    } else if (clickcount === 4) {
      console.log("Click 4");
      midi.send(CHANNEL, CONTROLLER + 3, 127);
      if (!flashLEDs) {
        let flashLEDState = false;
        flashLEDs = setInterval(() => {
          flashLEDState = !flashLEDState;
          setLEDS(flashLEDState, !flashLEDState, false);
        }, 100);
      } else {
        disableFlashingLEDs();
      }
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

const disableFlashingLEDs = () => {
  if (flashLEDs) {
    try {
      clearInterval(flashLEDs);
    } catch (e) {
      console.log("Oops!", e);
    }
    flashLEDs = false;
    setLEDS(false, false, false);
  }
}
const setLEDS = (LED1on, LED2on, LED3on) => {
  LED1.reset();
  LED2.reset();
  LED3.reset();

  if (LED1on) LED1.set();
  if (LED2on) LED2.set();
  if (LED3on) LED3.set();
};

NRF.nfcURL(urls[0]);