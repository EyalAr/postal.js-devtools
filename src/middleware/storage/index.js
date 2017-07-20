const storageActions = {
  "SET_SETTING": action => {
    localStorage.setItem(action.key, JSON.stringify(action.value))
  },
  "REMOVE_FILTER": (action, data) => {
    localStorage.setItem("excluded", JSON.stringify(data.getIn(["settings", "excluded"]).toJS()))
  },
  "ADD_FILTER": (action, data) => {
    localStorage.setItem("excluded", JSON.stringify(data.getIn(["settings", "excluded"]).toJS()))
  }
}

export default store => next => action => {
  next(action)
  var storageAction
  if (storageAction = storageActions[action.type]) {
    storageAction(action, store.getState().data)
  }
}
