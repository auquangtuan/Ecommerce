
const stateDefault = {
    change : ""
}


export const AdminReducer = ( state = stateDefault, action) => {
    switch (action.type) {
        case "CONFIRM" : {
            console.log(action)
            state.change = action.change
            return {...state}
        }
        
        default:
            return {...state}
    }
}

