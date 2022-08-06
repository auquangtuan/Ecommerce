
const stateDefault = {
    charts : [] 
}


export const AdminReducer = ( state = stateDefault, action) => {
    switch (action.type) {
        case "CHART" : {
            state.charts = action.charts
            return {...state}
        }
        
        default:
            return {...state}
    }
}