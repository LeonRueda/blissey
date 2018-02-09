const initialState = {building:{name: ""}};


export default (state, action) => {
  if (state === undefined) {
    return initialState;
  }

  console.log(action)
  switch(action.type) {
    case "UPDATE_NEW_BUILDING":
      const newState = {...state}
      newState.building[action.model.attribute] = action.model.value
      console.log(newState)
      return newState
      break;
  }
}
