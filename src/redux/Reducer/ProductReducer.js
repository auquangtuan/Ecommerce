import { CHANGE_LIMIT, GET_ALL_PRODUCT, GET_ONE_PRODUCT, SORT } from "../Constants"

const stateDefault = {
    product: [],
    productDetail: [],
    limited : 12
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
        case CHANGE_LIMIT : {
            console.log(action)
            parseInt(action.number)
            state.limited = action.number
            state.offsets = 0
            return {...state}
        }
        case SORT : {
            let number = parseInt(action.value)
            let productUpdate = [...state.product]
            if (number === 1) {
                productUpdate = productUpdate.sort((a, b) => a.title.localeCompare(b.title))
            } else if (number === 2) {
                productUpdate = productUpdate.reverse()
            } else if (number === 3) {
                productUpdate = productUpdate.sort(function (a, b) { return a.discount - b.discount })
            } else {
                productUpdate = productUpdate.sort(function (a, b) { return b.discount - a.discount })
            }
            state.product = productUpdate;
            return { ...state }
        }
        default:
            return {...state}
    }
}