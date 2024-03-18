import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  CheckBox,
  Dimensions,
  ImageBackground,
  Ionicons
} from 'react-native';
import db from '../config';
import AppHeader from '../components/AppHeader';
import firebase, { doc, setDoc } from 'firebase';
import DatePicker from 'react-native-datepicker';

import moment from 'moment';
const { height, width } = Dimensions.get("window");
export var nameValue

export default class EnterDataDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mrn: '',
      date: null,
      name: '',
      age: '',
      gender: '',
      phoneNo: "",
      referredBy: "",
      BP:"",
      height:'',
      weight:'',
      bloodgroup:'',
      bpm:'',
    };
  }
  goBack = () => {
    this.props.navigation.navigate('EnterDataMeds');
  };
  handleUpdate = async () => {
    var { date, name} = this.state;
    const user = firebase.auth().currentUser;
    const email = user.email
    //alert(email)
    // alert(user)
    db.collection(email).doc(this.state.name).set({
    
      mrn: this.state.mrn,
      name: this.state.name,
      date: this.state.date,
      age: this.state.age,
      gender: this.state.gender,
      BP:this.state.BP,
      height:this.state.height,
      weight:this.state.weight,
      phoneNo: this.state.phoneNo,
      referredBy: this.state.referredBy,
      bloodgroup:this.state.bloodgroup,
      bpm:this.state.bpm,
     // userId:firebase.auth.currentUser.uid,

    
    name: this.state.name
    });
    this.props.navigation.navigate("EnterDataMeds", {
      details: this.state.name
    })
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
        style = {{backgroundColor: "white", opacity: 1}}
        >
          <ImageBackground
          source = {require("../assets/ViewDetailsBackground2.png")}
          style = {{height: height+450}}
          >
          <View
          style = {styles.titleContainer}
          >

        <Image
        source = {require("../assets/user.png")}
        style = {{width: 100, height: 100}}
        >

        </Image>
        <Text
        style = {styles.title}
        >
          Record Patients
        </Text>
        {/* <Image
        source={require("../assets/stethoscope.png")}
        style = {{width: 150,height: 150 , alignSelf: "center"}}
        >

        </Image> */}
        </View>
        <Text
        style = {styles.subtitle}
        >
          Enter Details:
        </Text>
          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>Name:</Text> */}
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ name: text });
                nameValue=text;
              }}
              placeholder='Patient Name'
              placeholderTextColor={"black"}
              ></TextInput>
          </View>




          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>MRN:</Text> */}
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ mrn: text });
              }}
              placeholder='Patient MRN'
              placeholderTextColor={"black"}
              ></TextInput>
          </View>

       
          <View style={styles.fillContainer2}>
            {/* <Text style={styles.text}>Phone No:</Text> */}
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ date: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient DoB'></TextInput>
              
          </View>

        

          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>Age:</Text> */}
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ age: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient Age'></TextInput>
              
          </View>

         

          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>Gender:</Text> */}
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ gender: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient Sex'></TextInput>
          </View>

          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>BP:</Text> */}
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ BP: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient BP'></TextInput>
          </View>

          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>Height:</Text> */}
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ height: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient Height'></TextInput>
          </View>

          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>Weight:</Text> */}
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ weight: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient Weight'></TextInput>
          </View>

          <View style={styles.fillContainer}>
            {/* <Text style={styles.text}>Blood group:</Text> */}
            <TextInput
              style={styles.inputBoxLong}
              onChangeText={(text) => {
                this.setState({ bloodgroup: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient Blood Group'></TextInput>
          </View>

          <View style={styles.fillContainer2}>
            {/* <Text style={styles.text}>Phone No:</Text> */}
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ phoneNo: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient Phone Number'></TextInput>
          </View>

          <View style={styles.fillContainer2}>
            {/* <Text style={styles.text}>Ref By:</Text> */}
            <TextInput
              style={styles.inputBoxShort}
              onChangeText={(text) => {
                this.setState({ referredBy: text });
              }}
              placeholderTextColor={"black"}
              placeholder='Patient Reffered By'></TextInput>
          </View>

        </ImageBackground>
        </ScrollView>
          <View>
          <TouchableOpacity 
          style={styles.saveButton}
          onPressIn = {()=> this.handleUpdate()}
          onPress= {()=> this.goBack()}
          >
            <Text style={styles.text2}>Next</Text>
          </TouchableOpacity>
        </View>
        
        
      </KeyboardAvoidingView>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fillContainer: {
    // flexDirection: 'row',
    // padding: 10,
    // alignItems: 'center',
    // margin: 20,
    // borderWidth: 4,
    // borderColor: "#256D85"
  },
  saveButton: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002B5B',
    marginTop: 0,
  },
  text: {
    color: '#256D85',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  inputBoxShort: {
    width: '80%',
    // alignSelf: 'center',
    height: 50,
    // textAlign: 'center',
    borderWidth: 4,
    marginLeft: 20,
    borderColor: "#D3D3D3",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 35,
  },
  inputBoxLong: {
    width: '80%',
    // alignSelf: 'center',
    height: 50,
    // textAlign: 'center',
    borderWidth: 4,
    marginLeft: 20,
    borderColor: "#D3D3D3",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 35
  },
  text2: {
    color: 'white',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    // borderRadius: 0,
  },
  fillContainer2: {
    // flexDirection: 'row',
    // padding: 0,
    // alignItems: 'center',
    // margin: 20,
    // borderWidth: 4,
    // borderColor: "#256D85"
  },
  title: {
    fontSize: 35,
    // alignSelf: "center",
    // justifyContent: "center",
    fontWeight: "bold",
    color: "black",
    marginTop: 25,
    // marginBottom: -20,
    // marginRight: 80,
    marginLeft: 20,
   // fontFamily: 'Rajdhani_600SemiBold',
  },
  titleContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: width-50,
    height: 250,
    alignSelf: "center",
    margin: 30,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  subtitle: {
    color: 'black',
    paddingRight: 0,
    fontSize: 30,
    fontWeight: 'bold',
    // textAlign: 'center',
   // alignSelf: "",
    justifyContent: "center",
    marginLeft: 23,
    marginTop: 20
  },
});
