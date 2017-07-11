import INITIAL_STATE from "../initialState"

if (__DEV__) {
  module.exports = require("./configureStore.dev").default(INITIAL_STATE)
} else {
  module.exports = require("./configureStore.prod").default(INITIAL_STATE)
}
