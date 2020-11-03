import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,TextInput,Platform } from 'react-native';
  import { Card, ListItem, Button, Icon,SearchBar } from 'react-native-elements'
  import { useSelector, useDispatch } from 'react-redux';


export default function ModalLayout(props) {
  const [checked,setState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sellPrice,setSellPrice] = useState(0);
  const [platformPrice,setPlatformPrice] = useState(0);
  const [itemListing,setItemListing] = useState(null);
  const state = useSelector(state => state)

  
  useEffect(() => {
      var inventoryList = state.inventory;
      console.log("inventoryList",inventoryList);
      var productList = state.products;
      var orderItemList = props.order.orderList;
      var itemListing = []
      for(var i = 0;i<orderItemList.length;i++){
            var item = {};
            item["orderObj"] = orderItemList[i];
            var inventoryId = orderItemList[i]["inventoryId"];
            console.log("inventoryId",inventoryId)
            for(var inv_index=0;inv_index<inventoryList.length;inv_index++){
                    console.log('inventoryList[inv_index]["inventoryId"]',inventoryList[inv_index]["inventoryId"]);
                    console.log('inventoryList[inv_index]',inventoryList[inv_index]);
                    if(inventoryId == inventoryList[inv_index]["inventoryId"]){
                        var required_productId = inventoryList[inv_index]["product_id"];
                        for(var key in productList){
                            var productSubList = productList[key];
                            for(var prod_sub_index = 0;prod_sub_index<productSubList.length;prod_sub_index++){
                                console.log("productSubList[prod_sub_index]",productSubList[prod_sub_index]);
                                console.log("required_productId",required_productId);
                                if(productSubList[prod_sub_index]["id"] == required_productId)
                                    item["productObj"] = productSubList[prod_sub_index];
                            }
                        }
                    }
            }
            itemListing.push(item);
      }
      setItemListing(itemListing);
      console.log("itemListing",itemListing); 
  
  },[]);


  const onChangeText=function(str,value){
    if(str =="sellPrice")
      setSellPrice(value);
    else if(str == "platformPrice")
      setPlatformPrice(value);
  }

  const renderList = function(l,i){
      return(<ListItem
        containerStyle={{width:400}}
        contentContainerStyle = {{width:  700 }}
        key={l.i}
        leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
        title={"Product: "+l.productObj.productName}
        titleStyle = {{marginLeft:5,marginBottom:5}}
        component={TouchableHighlight}
        subtitle={<Text style={{marginTop:2,marginLeft:5,fontWeight:"400"}}>{"note: " + l.productObj.category}</Text>}
        rightTitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"500"}}>{l.orderObj.itemNum + " "}</Text>}
        rightSubtitle = {<Text style={{marginTop:2,marginRight:15,fontWeight:"200"}}>{l.productObj.measurementUnit+" "}</Text>}
        bottomDivider
      />)
  }

return(
<View style={styles.ModalLayout}>
    <Text>{JSON.stringify(state.inventory)}</Text>
{props.modalVisible && <Modal
    show={false}
    animationType="slide"
    transparent={false}
    visible={props.modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        
       <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "red" }}
          onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);

            props.setModalVisible(!props.modalVisible);
          }}
        >
          <Text style={styles.textStyle}>Hide</Text>
        </TouchableHighlight>
        <Text style={styles.modalText}>Order Id:</Text>
        <Text style={styles.modalProductText}>{props.order.orderId}</Text>

        {
            itemListing && 
            itemListing.map((l, i) => (
            renderList(l,i)
            ))
        }
       {/* <Text style={styles.modalCategoryText}>{props.order.category}</Text>

        
        <Text style={{textAlign:'left'}}>Selling Price:</Text>
        <TextInput
          onChangeText={value => onChangeText('sellPrice', value)}
          style={styles.input}
          placeholder="Selling Price"
          keyboardType = 'numeric'
          value = {sellPrice}
        />
        <Text style={{textAlign:'left'}}>Platform Cost:</Text>
        <TextInput
          onChangeText={value => onChangeText('platformPrice', value)}
          style={styles.input}
          placeholder="Platform Cost"
          keyboardType = 'numeric'
          value = {platformPrice}

        /> */}
        {/* <Spacer size={10} /> */}
        <View  style= {styles.inputButton}>
        <Button style={{marginBottom:50}} title="Close" onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);
            props.setOrderStatus("REJECTED");
            props.setModalVisible(!props.modalVisible);
          }} />
        </View>
        <View style = {styles.inputButton}>
        <Button style={{marginTop:50}} title="Confirm" onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);
            props.setOrderStatus("ACCEPTED");
            props.setModalVisible(!props.modalVisible);
          }} />
        
        </View>
          
      </View>
    </View>
  </Modal>}
  </View>
)
}

const styles = StyleSheet.create({
  ModalLayout:{
    marginTop:100,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:750,
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
    elevation: 5,
    flex:1
  },
  openButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    marginTop: 15,
},
  
  modalProductText:{
    marginBottom: 15,
    marginTop: 5,
    textAlign: "center",
    fontWeight:'bold',
    color:'red',
    fontSize:15
  },
  modalCategoryText:{
    marginBottom: 15,
    marginTop: 5,
    textAlign: "center",
    color:'red',
    fontSize:13
  },
  input: {
    height: 50,
    paddingLeft:50,
    width:500,
    margin: 10,
  },
  inputButton: {
    width:400,
    margin: 10,
  },
});
