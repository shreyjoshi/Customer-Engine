import remove from 'lodash.remove'
import {AsyncStorage} from 'react-native';

// Action Types

export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN'
export const ADD_PRODUCT_LIST = "ADD_PRODUCT_LIST"
export const ADD_INVENTORY_LIST = "ADD_INVENTORY_LIST"
export const ADD_INVENTORY = "ADD_INVENTORY"
export const UPDATE_INVENTORY = "UPDATE_INVENTORY"
export const DELETE_INVENTORY = "DELETE_INVENTORY"
export const ADD_USER_NAME = "ADD_USER_NAME"
export const ADD_RETAILOR_LIST = "ADD_RETAILOR_LIST"
export const ADD_CATEGORY_LIST = "ADD_CATEGORY_LIST"
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const REMOVE_PRODUCT_TO_CART = "REMOVE_PRODUCT_TO_CART"
export const CLEAR_PRODUCTS_FROM_CART = "CLEAR_PRODUCTS_FROM_CART"
export const CHANGE_CART_QTY = "CHANGE_CART_QTY"
export const REPLACE_CART = "REPLACE_CART"
// Action Creators

let noteID = 0;
let app_state  = {};

export function addProductToCart(id){
  console.log("in addProductToCart", id);
  return{
    type:ADD_PRODUCT_TO_CART,
    id:id
  }
}

export function removeProductFromCart(id){
  return{
    type:REMOVE_PRODUCT_TO_CART,
    id:id
  }
}

export function changeCartQty(id,val){
  return{
    type:CHANGE_CART_QTY,
    id:id,
    qty:val
  }
}

export function clearProductsFromCart(id){
  return{
    type: CLEAR_PRODUCTS_FROM_CART,
    id: id
  }
}

export function addnote(note) {
  return {
    type: ADD_NOTE,
    id: noteID++,
    note
  }
}

export function deletenote(id) {
  return {
    type: DELETE_NOTE,
    payload: id
  }
}

export function setRetailorList(id){
  return {
    type: ADD_RETAILOR_LIST,
    payload: id
  }
}

export function setProductList(id){
  return {
    type: ADD_PRODUCT_LIST,
    id:id
  }
}

export function setCategoryList(id){
  return{
    type:ADD_CATEGORY_LIST,
    id:id
  }
}

export function addCategory(note){
  return{
    type:ADD_CATEGORY,
    id: noteID++,
    note
  }
}

export function addUserName(userName){
  return{
    type:ADD_USER_NAME,
    id:userName
  }
}

export function setInventoryList(id){
  return{
    type: ADD_INVENTORY_LIST,
    id:id
  }
}

export function addInventory(id){
  return{
    type: ADD_INVENTORY,
    id:id
  }
}

export function deleteInventory(id){
  console.log("here",id);
  return{
    type:DELETE_INVENTORY,
    id:id
  }
}
export function replaceCart(id){
  return{
    type:REPLACE_CART,
    id:id
  }
}
export function addUserToken(id){
  return{
    type:ADD_USER_TOKEN,
    id:id
  }
  app_state.userToken = id;
}

// reducer

let initialState = {products:{},retailor:[],category:[],inventory:[],items:[],orders:[],userInfo:{},cart:[],onboard:true}

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RETAILOR_LIST:
      return{
        ...state,
        retailor:action.id
      }
    case ADD_CATEGORY:
      return {
        ...state,
        category:[...state.category,{
          id: action.id,
          note: action.note
        }]

      }
    case REPLACE_CART:
      if(state.onboard){
        return{
          ...state,
          cart:action.id,
          onboard:false
        }
      }
      else{
        return{
          ...state
        }
      }
    case ADD_PRODUCT_TO_CART:
      var cartList = state.cart
      var flag  = true;
      console.log("cartList",cartList);
      console.log("cartList",cartList.length);
      for(var i = 0;i<cartList.length;i++){
        if(cartList[i].product_id==action.id.product_id){
            cartList[i].quantity++;
            cartList[i].totalItemValue = cartList[i].totalItemValue + parseFloat(action.id["price_to_platform"]);
            flag = false;
            break;
          }
      }
      if(flag){
          var temp = action.id;
          temp.quantity = 1;
          temp.totalItemValue = parseFloat(action.id["price_to_platform"]);
          cartList.push(temp);
      }
       AsyncStorage.setItem('cartList',JSON.stringify(cartList));
      return{
        ...state,
        cart:cartList
      }
      case CHANGE_CART_QTY:
        var cartList = state.cart
        var flag  = true;
        console.log("cartList",cartList);
        console.log("cartList",cartList.length);
        for(var i = 0;i<cartList.length;i++){
          if(cartList[i].product_id==action.id.product_id){
              cartList[i].quantity = action.qty;
              cartList[i].totalItemValue =  parseFloat(action.id["price_to_platform"])*parseFloat(action.qty);
              flag = false;
              break;
            }
        }
        if(flag){
            var temp = action.id;
            temp.quantity = 1;
            temp.totalItemValue = parseFloat(action.id["price_to_platform"]);
            cartList.push(temp);
        }
         AsyncStorage.setItem('cartList',JSON.stringify(cartList));
        return{
          ...state,
          cart:cartList
        }
      case REMOVE_PRODUCT_TO_CART:
        var cartList = state.cart
        var flag  = true;
        for(var i = 0;i<cartList.length;i++){
          if(cartList[i].product_id==action.id.product_id){
              cartList[i].quantity--;

              cartList[i].totalItemValue = cartList[i].totalItemValue - parseFloat(action.id["price_to_platform"]);
              if(cartList[i].quantity == 0)
                cartList.splice(i,1);
              flag = false;
              break;
            }
        }
         AsyncStorage.setItem('cartList',JSON.stringify(cartList));
         console.log("AsyncStorage.getItem('cartList');",AsyncStorage.getItem('cartList'));
        return{
          ...state,
          cart:cartList
        }
    case CLEAR_PRODUCTS_FROM_CART:
      AsyncStorage.setItem('cartList',JSON.stringify([]));
      return{
        ...state,
        cart:[]
      }
    case ADD_CATEGORY_LIST:
      return{
        ...state,
        category:action.id
      }
    case ADD_PRODUCT_LIST:
        return {
          ...state,
          products:action.id

        }

    case DELETE_NOTE:
      console.log("delete Notes");
      console.log("state",state);
      return state
      // const deletedNewArray = remove(state, obj => {
      //   return obj.id != action.payload
      // })
      // return deletedNewArray
    case ADD_USER_TOKEN:
      return {
        ...state,
        userInfo:{...state.userInfo,token:action.id.token}
      }
    
    case ADD_INVENTORY_LIST:
      return {
        ...state,
        inventory:action.id
      }

    case ADD_USER_NAME:
      return{
        ...state,
        userInfo:{...state.userInfo,userId:action.id}
      }
    case ADD_INVENTORY:
      console.log("added Inventory",action.id);
      return{
        ...state,
        inventory:[...state.inventory,action.id]
      }
    case UPDATE_INVENTORY:
      console.log("added Inventory",action.id);
      var inv_obj = inventory;
      var flag = true;
      for(var i = 0;i<inv_obj.length;i++){
        if(inv_obj[i]["inventoryId"] = action["id"]["inventoryId"])
          inv_obj[i] = action["id"];
          flag = false;
          break;
      }
      if(flag)
        inv_obj.push(action.id);

      return{
        ...state,
        inventory:inv_obj
      }

    case DELETE_INVENTORY:
      console.log("in reducer");
      console.log("state.inventory",JSON.stringify(state.inventory));
      const deletedNewArray = remove(state.inventory, obj => {
        console.log("obj.inventoryId",obj.inventoryId);
        console.log("action.id",action.id);
        console.log(obj.inventoryId != action.id);
        return obj.inventoryId != action.id
      })
      console.log(JSON.stringify(deletedNewArray));
      // var inv_obj = state.inventory;
      // console.log("in inv_obj");
      // var index;
      // var flag = true
      // for(var i = 0;i<inv_obj.length && flag;i++){
      //   console.log('inv_obj[i]["inventoryId"]',inv_obj[i]["inventoryId"]);
      //   console.log('action["id"]',action["id"]);
      //   if(inv_obj[i]["inventoryId"] == action["id"])
      //     { console.log("matched",i);
      //       inv_obj.splice(i,1);
      //       index = i;
      //       flag = false;
      //     }
      // }
      // console.log("inv_obj",inv_obj)

      return{
        ...state,
        inventory:deletedNewArray
      }

    default:
      return state
  }
}

export default notesReducer
