
export const initialState = {
    cart : [],
    user: null
}

// cart total function with selector
export const cartTotal = (cart)=>{
    // console.log(cart);
    return cart?.reduce((amt,item)=>item.price + amt, 0)
    
} 

const reducer = (state,action)=>{
    console.log(action)
    switch(action.type){
        case 'ADD_TO_CART':
            return{
                ...state,
                cart:[...state.cart,action.item]
            }
        
        case 'REMOVE_FROM_CART':
            // finding all the products from the cart with having the same id as the id of action id(on which user pressed remove button)
            const index = state.cart.findIndex(
                (CartItem) => CartItem.id===action.id
            );
            // creating the new cart having the same data as the current cart item
            let newCart = [...state.cart];
            // if there are multiple products then remove the firstOne
            if(index>=0){
                // removing the 1 similar item
                newCart.splice(index,1)
            }else{
                // not possiblr removing
                console.warn(`can't remove the product of id ${action.id}`);
            }
            // now this new cart hhas to be assigned as the current cart
            return{
                ...state,
                cart:newCart
            }

        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }

        case 'EMPTY_CART':
            return{
                ...state,
                cart:[]
            }

        default:
            return state
    }
}

export default reducer;