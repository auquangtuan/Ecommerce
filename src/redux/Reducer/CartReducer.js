
import { ADD_CART, CART, DELETE_ITEM, DONE, TANG_GIAM_ITEM } from "../Constants";

let cart = []

if (localStorage.getItem(CART)) {
    cart = JSON.parse(localStorage.getItem(CART));
}
const stateDefault = {
    carts: cart
}
export const CartReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_CART: {
            let cartUpdate = [...state.carts];
            if (cartUpdate.length === 0) {
                cartUpdate.push(action.item)
            } else if (cartUpdate.length > 0) {
                let i = cartUpdate.findIndex(item => { return (item.id === action.item.id && item.sizeName === action.item.sizeName) })
                if (i !== -1) {
                    if (i >= 0) {
                        cartUpdate[i].number += 1
                    } else {
                        cartUpdate[i].number += action.item.number;
                    }
                } else {
                    cartUpdate.push(action.item)
                }
            }
            localStorage.setItem(CART, JSON.stringify(cartUpdate));
            state.carts = cartUpdate;
            return { ...state }
        }
        case TANG_GIAM_ITEM: {
            let cartUpdate = [...state.carts];
            let i = cartUpdate.findIndex(sp => sp.id === action.id);

            if (i !== -1) {
                if (action.boolean) {
                    cartUpdate[action.index].number += 1;
                } else if (!action.boolean) {
                    if (cartUpdate[action.index].number > 1) {
                        cartUpdate[action.index].number -= 1
                    } else {
                        cartUpdate.splice([action.index], 1)
                    }
                }
            }
            localStorage.setItem(CART, JSON.stringify(cartUpdate));
            state.carts = cartUpdate;
            return { ...state }
        }
        case DELETE_ITEM: {
            let cartUpdate = [...state.carts];
            let i = cartUpdate.findIndex(sp => sp.id === action.num);
            if (i !== -1) {
                cartUpdate.splice(i, 1);
            }
            localStorage.setItem(CART, JSON.stringify(cartUpdate));
            state.carts = cartUpdate;
            return { ...state }
        }
        case DONE: {
            let cartUpdate = [];
            localStorage.removeItem(CART);
            state.carts = cartUpdate;
            return { ...state }
        }
        default:
            return { ...state }

    }
}