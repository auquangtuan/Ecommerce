
const stateDefault = {
    change : ""
}


export const AdminReducer = ( state = stateDefault, action) => {
    switch (action.type) {
        case "CONFIRM" : {
            state.change = action.change
            return {...state}
        }
        
        default:
            return {...state}
    }
}

