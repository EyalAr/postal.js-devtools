import { createStore, applyMiddleware } from "redux"
import storage from "../middleware/storage"
import rootReducer from "../reducers"

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(storage)
)

export default configureStore
