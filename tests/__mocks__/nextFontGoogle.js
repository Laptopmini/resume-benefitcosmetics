module.exports = new Proxy(
  {},
  {
    get: () => () => ({ className: "mock-font", style: { fontFamily: "mock" } }),
  },
);
