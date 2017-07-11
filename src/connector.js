(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["postal"], factory);
  } else if (typeof module === "object" && module.exports) {
    factory(require("postal"));
  } else {
    factory(root.postal);
  }
}(this, function (postal) {
  window.__postaljsDevtoolsRef = postal;
}));
