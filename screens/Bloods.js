import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Header, Icon,Avatar } from 'react-native-elements';

import * as ImagePicker from "expo-image-picker";
const {height,width}=Dimensions.get('window')
import firebase from "firebase";
import { Dimensions } from 'react-native';
import { mrn2, nameValue2 } from './ViewDetails';
import { Ionicons } from '@expo/vector-icons';

export default class Bloods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: firebase.auth().currentUser.email,
        image: "https://dummyimage.com/400x400/000000/0011ff.png&text=Phoo",
        isLoading: true
        
      
    };
  }

  componentDidMount() {
    this.fetchImage();
   
    console.log(nameValue2);
  }

  uploadImage = async (uri) => {
    this.setState({ isLoading: true });
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + this.state.userId);

    return ref.put(blob).then((response) => {
      this.fetchImage();
      
    });
  };

  fetchImage = (x) => {
   // this.setState({ isLoading: true });
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + this.state.userId);

    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({
          image: "https://dummyimage.com/1000x800/208ec9/ffffff.png&text=Photo",
        });
       // alert("No Image Found");
      });
      setInterval(() => {
        this.setState({ isLoading: false });
    }, 2000);
     
  };
  selectPicture = async () => {
    const { canceled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!canceled) {
      this.uploadImage(uri);
    }
  };

  render() {
    return (
        <ScrollView
        style={{
          flex: 1,
        
        }}
      >
        <ImageBackground
        source={require("../assets/ViewDetailsBackground.png")}
        style = {styles.bg}
        >
           <View
      style = {styles.titleContainer}
      >
        <View style = {{justifyContent: 'center', marginLeft: 0}}>
      
        <Ionicons name={'person-circle-outline'} size={80} color={'grey'} style = {{marginLeft: 0}}/>
         </View>
      <Text
      
      style = {styles.title}>
        {nameValue2}
      </Text>

      <Text
      
      style = {styles.subtitle2}>
        {mrn2}
      </Text>


      </View>
        <View style={{height:height-100,width:width-10,marginTop:50 }}>
            <Text
            style = {styles.title2}
            >Bloods Reports</Text>
            <ActivityIndicator color={"green"}  animating={this.state.isLoading} style={{alignSelf: 'center', justifyContent: 'center'}} size={'large'}/>
          <Avatar
            containerStyle={{
              alignSelf: "center",
             // margin: "10%",
             // marginBottom: "1%",
             // marginTop: "20%",
              width: width-50,
              height: height-450,
            }}
            rounded
            source={{ uri: this.state.image }}
            size="small"
            onPress={() => {
              this.selectPicture();
            }}
          />
          </View>
          </ImageBackground>
          </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  headerImg: {
    width: '90%',
    height: 60,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#62A001',
    borderRadius: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginTop: 15,
    backgroundColor: "#E2F0D9",
    width: width-15,
    alignSelf: "center",
    borderRadius: 25,
    height: 50
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginTop: 15,
    backgroundColor: "#E2F0D9",
    width: width-15,
    alignSelf: "center",
    borderRadius: 25,
    
  },
  bg: {
    width: width,
    height: height,
    alignSelf: "center",
    resizeMode: "contain",
  },
  titleContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: width-100,
    height: 200,
    alignSelf: "center",
    margin: 30,
    marginBottom: 0,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: 'black',
    paddingRight: 0,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: "center",
    justifyContent: "center",
  },
  title2: {
    color: 'black',
    paddingLeft: 20,
    fontSize: 32,
    fontWeight: 'bold',
    // textAlign: 'center',
    // alignSelf: "center",
    // justifyContent: "center",
  },
  subtitle: {
    color: 'black',
    paddingRight: 0,
    fontSize: 30,
    fontWeight: 'bold',
    // textAlign: 'center',
   // alignSelf: "",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 20
  },
  subtitle2: {
    color: 'black',
    //marginLeft:25,
   // paddingRight: 0,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: "center",
    justifyContent: "center",
  },
  edit: {
    marginLeft: 40,
    // marginTop: 30
  },
  container2: {
   // flexDirection: "column",
    //justifyContent: "space-around",
    alignContent: "center",
    marginTop: 15,
    backgroundColor: "#E2F0D9",
    width: width-15,
    alignSelf: "center",
    borderRadius: 25,
    marginLeft: 0
  },
  subheading: {
    color: 'black',
    paddingRight: 0,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
   // alignSelf: "",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 5
  },
  subheading1: {
    color: 'black',
    paddingRight: 0,
    fontSize: 23,
    // fontWeight: 'bold',
    textAlign: 'center',
   // alignSelf: "",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 5
  }
});
