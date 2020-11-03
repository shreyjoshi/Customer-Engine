import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,SafeAreaView,FlatList,Platform } from 'react-native';
import ModalLayout from './ModalLayout';
import { Card, ListItem, Button, Icon,SearchBar } from 'react-native-elements'
import { deletenote, ADD_PRODUCT_LIST ,addInventory,deleteInventory,addProductToCart,removeProductFromCart,clearProductFromCart,changeCartQty} from '../redux/appRedux';
import { useSelector, useDispatch } from 'react-redux'
import NumericInput from 'react-native-numeric-input'




const list = [
 {  id:1,
    name: 'itemOne',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    deliveryTime: "42mins"
 },
 {  id:2,
    name: 'itemSecond',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    deliveryTime: "45mins",
  },
]


export default function CardLayout(props) {
  const dispatch = useDispatch()

  const [checked,setState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [item,setItemState] = useState({  id:1,
                                          name: 'brynn',
                                          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                                          deliveryTime: "42mins"
                                      });
  const state = useSelector(state => state)
  const [qty,changeQty] = useState(0);
  


  const change = function(itemObj){
    // fetch()
    console.log("param",itemObj);
    var stateInvList = state.inventory;
    for(var i = 0;i<stateInvList.length;i++){
      if(stateInvList[i]["product_id"] == itemObj["id"] && stateInvList[i]["retailer_id"]==state.userInfo.userId){
        itemObj["invObj"] = stateInvList[i];
        setItemState(itemObj);
        break;
      }
    
    }
    console.log("this.modalVisible"+modalVisible);
    setItemState(itemObj);
    setModalVisible(!modalVisible);
    console.log(item);
    console.log(itemObj);
    console.log("here");
      if(!checked)
        setState({checked:false});
  }

  const valueChange = function(l,value){
    console.log("l",l);
    console.log("value",value);
    if((state.cart && state.cart.length) && state.cart[0].retailer_id != l.retailer_id)
      dispatch(clearProductFromCart("clear"));
    if(value == 0)
      dispatch(removeProductFromCart(l));
    else
      dispatch(changeCartQty(l,value));
      console.log("value",value);
      console.log(state.cart);
    console.log("l",l);
  }

  const ListRender = function(l,i){
    var stateInvList = state.inventory;
    console.log("Rerender");
    console.log("stateInvList",stateInvList);
    for(var i = 0;i<stateInvList.length;i++){
      if(stateInvList[i]["product_id"] == l["id"] && stateInvList[i]["retailer_id"]==state.userInfo.userId){
        l["invObj"] = stateInvList[i];
        l["added"] = true;
        break;
      }
      else if(l["added"]==true){
        l.added = false;
      }
    
    }
    if(l.added == true)
    return(<ListItem
      containerStyle={{width:'100%'}}
      key={l.id}
      leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
      title={l.productName}
      titleStyle = {{marginLeft:5,marginBottom:5}}
      component={TouchableHighlight}
      subtitle={<Text style={{marginTop:2,marginLeft:5,fontWeight:"200"}}>{l.details}</Text>}
      rightSubtitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"200"}}>{l.measurementUnit+" "}</Text>}
      bottomDivider
      checkBox= {{ // CheckBox Props
        checkedIcon: 'times',
        uncheckedIcon: 'times',
        checkedColor:'#cc0c23',
        uncheckedColor: '#fff',
        onPress: () => deleteInvItem(l),
        checked: true,
      }}
      onPress={() =>  
              change(l)}           
      
      chevron
    />);
    else  
    return(
      <ListItem
      containerStyle={{width:'100%',backgroundColor:'#d95443',marginHorizontal:0}}
      key={l.id}
      leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
      title={l.product_name}
      titleStyle = {{marginLeft:5,marginBottom:5}}
      component={TouchableHighlight}
      subtitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"500"}}>{"Rs. "+l.price_to_platform +" "}</Text> }
      rightSubtitle={ <View>
                      <NumericInput value={l.quantity} totalWidth ={100} totalHeight={50} minValue={-1} onChange={(value) => valueChange(l,value)} />

                      
                      </View>
                    }
      bottomDivider
      
    />

    );
        
    
  }
  return (
    <View style={styles.container}>
  {state.cart && 
    state.cart.map((l, i) => (
      ListRender(l,i)
    ))
  }
</View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#d95443',
    alignItems:'center',
    padding: 16,
  },
  crossIcon:{
    marginRight:10
  }
});
