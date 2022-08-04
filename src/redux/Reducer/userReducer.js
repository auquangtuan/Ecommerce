import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import { LOGIN } from "../Constants";

let user = {}

if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user
}




export const userReducer = ( state = stateDefault, action) => {
    switch (action.type) {
        case LOGIN: {
            const { values } = action;
            localStorage.setItem(USER_LOGIN , JSON.stringify(values));
            localStorage.setItem(TOKEN , values.asscess_Token)
            return {...state, userLogin: action.values}
        }
    
        default:
            return {...state}
    }
}