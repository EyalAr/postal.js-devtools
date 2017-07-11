import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "../reducers"

const logger = createLogger({
  stateTransformer: state => Object.assign({}, state, { data: state.data.toJS() })
});

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(logger)
  )
)

export default configureStore
