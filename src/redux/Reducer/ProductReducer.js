import { GET_ALL_PRODUCT, GET_ONE_PRODUCT } from "../Constants"

const stateDefault = {
    product: [],
    productDetail: []
}


export const ProductReducer = ( state = stateDefault, action) => {
    switch (action.type) {
        
        case GET_ALL_PRODUCT : {
            state.product = action.product
            return {...state}
        }
        case GET_ONE_PRODUCT : {
            state.productDetail = action.productDetail
            return {...state}
        }
        default:
            return {...state}
    }
}