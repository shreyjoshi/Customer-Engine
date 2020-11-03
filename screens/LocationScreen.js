import React from 'react';
import MapView from 'react-native-maps';
// import { TextInput, Button, StyleSheet, View,Image,AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, Dimensions,TextInput,Button,Modal,TouchableOpacity  } from 'react-native';
import * as Location from 'expo-location';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mapRegion: { latitude: 26.913164442587235, longitude: 75.7867357134819, latitudeDelta: 0.5922, longitudeDelta: 0.5421 },
        locationResult: null,
        location: {coords: { latitude: 26.913164442587235, longitude: 75.7867357134819}},
        userName:'',
        hno:'',
        buildName:'',
        Area:'',
      };
    }
    
      componentDidMount() {
        this._getLocationAsync();
      }
    
      _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
      };

      createReqObj = ()=>{
        var obj = {};
        //obj.address = this.state.hno +" " +this.state.buildName+" "+this.state.Area
        obj.address={
          "line1":this.state.hno,
          "line2":this.state.buildName,
          "landmark":this.state.Area,
          "longitude":this.state.location.coords.longitude,
          "latitude":this.state.location.coords.latitude,
          "name":"Other"
        }
        //console.log(obj.address,"obj.address");
        obj.location = this.state.location;
        this.props.getLocationStatus(obj);
      }
    
      _getLocationAsync = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let location = await Location.getCurrentPositionAsync({});
       this.setState({ locationResult: JSON.stringify(location), location, });
       console.log('this.state.location',this.state.location,'locationResult',this.state.locationResult);
    };

    onChangeText =function(key, value) {
      console.log("key",key);
      console.log("value",value);
      if(key =="fNo")
        this.setState({hno:value})
      else if(key == "build")
        this.setState({buildName:value})
      else if(key == "area")
        this.setState({Area:value});
    }
    
  render() {
    return (

        <View style={styles.container}>
          {this.props.modalVisible &&
          <Modal
          style={styles.modalContent}
          show={false}
          animationType="slide"
          transparent={false}
          coverScreen={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            
            this.props.closeModal();
          }}
        >
          
          <View style={styles.container2}>
          <TextInput
          onChangeText={value => this.onChangeText('fNo', value)}
          style={styles.input}
          placeholder="House/Flat Number"
          value = {this.state.hno}
        />
        <TextInput
          onChangeText={value => this.onChangeText('build', value)}
          style={styles.input}
          placeholder="Building/Street Name"
          value = {this.state.buildName}
        />
        <TextInput
          onChangeText={value =>this.onChangeText('area', value)}
          style={styles.input}
          placeholder="Area"
          value = {this.state.Area}
        />
<TouchableOpacity style={styles.inputButton} onPress={this.createReqObj}>
        <Text style={{color:'white'}}>Confirm
        </Text>
      {/* <Button  title="Sign In" onPress={signIn} /> */}
      </TouchableOpacity>
        </View>
        <MapView style={styles.map}
          initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={this.onRegionChange}

        >
        <MapView.Marker
            coordinate={{latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude}}
            title={"title"}
            description={"description"}
            draggable 
            onDragEnd={(e) => {
                const coords = e.nativeEvent.coordinate;
                const prevCoords = this.state.location;
                prevCoords.coords.latitude = coords.latitude;
                prevCoords.coords.longitude = coords.longitude;
                console.log("prevCoords.coords.latitude",prevCoords.coords.latitude);
                console.log("prevCoords.coords.longitude",prevCoords.coords.longitude);
                this.setState({
                    location: prevCoords,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    displayMapView: false
                }, () => {
                    this.setState({
                        displayMapView: true
                    });
                });
            }}
            />
      </MapView>
      </Modal>
      }
        </View>
    );
  }
}

var styles = StyleSheet.create({

    container2: {
      position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:4,
        justifyContent: 'center',
        alignItems:'center',
        padding: 16,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 250,
        zIndex:1
      },
      input: {
        height: 50,
        // paddingLeft:50,
        paddingHorizontal:20,
        width:"100%",
        margin: 10,
      },
      inputButtonView:{
        width:'100%'
      },  
      inputButton: {
        width:'40%',
        marginLeft:'auto',
        height:40,
        borderColor:'#e20000',
        borderRadius:30,
        justifyContent: 'center', 
        alignItems:'center',
        backgroundColor:'#cf2f29'
        
    
      },
  });