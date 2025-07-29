// exchangeRates.js
module.exports = {
  MTN: {
    WAVE: 1.05, // 1 MTN = 1.05 WAVE
    ORANGE: 1.10,
    MOOV: 1.08,
  },
  WAVE: {
    MTN: 0.95, // 1 WAVE = 0.95 MTN
    ORANGE: 1.02,
    MOOV: 0.98,
  },
  ORANGE: {
    MTN: 0.90,
    WAVE: 0.98,
    MOOV: 1.01,
  },
  MOOV: {
    MTN: 0.92,
    WAVE: 1.02,
    ORANGE: 0.99,
  },
};