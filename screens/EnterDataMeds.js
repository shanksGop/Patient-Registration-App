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
  Modal,
  Button,
  FlatList,
} from 'react-native';
import db from '../config';
import AppHeader from '../components/AppHeader';
import AppHeaderMedications from '../components/AppHeaderMedications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RFValue from 'react-native-responsive-fontsize';
import AwesomeAlert from 'react-native-awesome-alerts';
import DropDownPicker from 'react-native-dropdown-picker';
import EnterDataDetails from './EnterDataDetails';
import { nameValue } from './EnterDataDetails';
import { mrn2 } from './ViewDetails';
import { nameValue2 } from './ViewDetails';
import { triggered } from './ViewDetails';

import firebase, { doc, setDoc } from 'firebase';

import moment from 'moment';
var nameReal

const allMeds = [];
const noMeds = [1, 2, 3, 4];

export default class EnterDataMeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      drug: '',
      drugValue: [],
      dosage: '',
      frequency: '',
      route: '',
      timings: '',
      modalOpen: false,
      dropdownHeight: 40,
      routeMed: 'PO',
      duration: '',
    };
    var medicine = this.state.drug;
  }

  getMeds = () => {
    const allMeds = [
      this.state.drug,
      this.state.frequency,
      this.state.dosage,
      this.state.route,
      this.state.timings,
      this.state.duration,
    ];
  };
  renderItem = ({ item }) => {
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.title}>{allMeds}</Text>
      </View>
    );
  };
  goBack = () => {
    this.props.navigation.navigate('ViewData');
  };

  readDetails = async () => {
    const user = firebase.auth().currentUser;
    const email = user.email
    var docRef = db.collection(email).doc(nameReal);

  docRef.get().then((doc) => {
      if (doc.exists) {
        //  console.log("Document data:", doc.data());
        // this.setState({ name: doc.data().name });
        this.setState({ drugValue: doc.data().meds });
        console.log(this.state.drugValue);
        // this.setState({ age: doc.data().age });
        // this.setState({ height: doc.data().height });
        // this.setState({ weight: doc.data().weight });
        // this.setState({ bpm: doc.data().bpm });
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  }); 
  }
  componentDidMount = () => {
    this.getMeds();
    this.readDetails();
    this.testForNavigation();
  };

  testForNavigation(){
    if(triggered==true){
      nameReal = nameValue2
    } else{
      nameReal = nameValue
    }
  }
  handleUpdate = async () => {
    // console.log(this.state.drug);
    var { date} = this.state;
    const user = firebase.auth().currentUser;
    const email = user.email
    var addMed = db
      .collection(email)
      .doc(nameReal);

    var setWithMerge = addMed.set(
      {
        meds: {
          [this.state.drug]: {
            drug: this.state.drug,
            frequency: this.state.frequency,
            dosage: this.state.dosage,
            route: this.state.route,
            timings: this.state.timings,
            duration: this.state.duration,
          },
        },
      },
      { merge: true }
    );
    console.log(allMeds);
  };
  renderItem = ({ item,i }) => {
    return (
    //<ViewDetails details={viewDetails} navigation={this.props.navigation} />
      <View style={{ borderWidth: 1 }}>
        <View style={{ zIndex: 0 }}>
            <ListItem key={i} bottomDivider>
              <Icon type={'antdesign'} name={'book'} size={40} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  {this.state.drugValue}
                </ListItem.Title>
                {/* <ListItem.Title style={styles.title2}>
                  {item.mrn}
                </ListItem.Title> */}
                <View style={styles.lowerLeftContaiiner}>
                  <View style={styles.transactionContainer}>
                    <Icon
                      type={'ionicon'}
                      name={
                        item.transaction_type === 'issue'
                          ? 'checkmark-circle-outline'
                          : 'arrow-redo-circle-outline'
                      }
                      color={
                        item.transaction_type === 'issue'
                          ? '#78D304'
                          : '#0364F4'
                      }
                    />
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
        </View>
      </View>
    )
  };
  modalHandle = () => {
    this.setState({
      modalOpen: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  addMedication = () => {
    const user = firebase.auth().currentUser;
    const email = user.email
    db.collection(email+'/allMeds');
  };

  render() {
    const { showAlert } = this.state;
    return (
      <View>
        <Text>{this.state.drug}</Text>
        <Text>{this.state.frequency}</Text>
        <Text>{this.state.timings}</Text>
        <Text>{this.state.route}</Text>
        <Text>{this.state.dosage}</Text>

        <FlatList
            data={this.state.drugValue}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
           // onEndReached={() => this.fetchMorePatients(searchText)}
            onEndReachedThreshold={0.7}
            ListHeaderComponent={() => (!this.state.drugValue?
              <Text style={styles.emptyMessageStyle}>No Records at the moment.Click on the '+' icon to add.</Text>  
              : null)
            }
          
          />
        
        <View
          style={{ alignSelf: 'flex-end', bottom: -541, position: 'absolute' }}>
          <TouchableOpacity onPress={() => this.modalHandle()}>
            <Ionicons name={'add-circle'} size={100} color={'#41C264'} />
          </TouchableOpacity>
        </View>
        <Modal
          visible={this.state.modalOpen}
          animationType="slide"
          style={styles.modal}>

            <View style= {styles.textContainer}>
              <TouchableOpacity onPress={() => this.setState({ modalOpen: false })}>
                <Ionicons name={'close-circle-outline'} size={50} color={"white"} style={{marginBottom: 0}}/>
              </TouchableOpacity>

              <Text style={styles.text}>Medications</Text>
              
            </View>

          
          <View>
            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Drug"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ drug: text });
              }}></TextInput>
            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Dosage"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ dosage: text });
              }}></TextInput>
           
           <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Route"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ route: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Timings"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ timings: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Frequency"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ frequency: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Duration"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ duration: text });
              }}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                this.handleUpdate();
                this.setState({
                  modalOpen: false,
                  drug: '',
                  duration: '',
                  frequency: '',
                  dosage: '',
                  route: '',
                  timings: '',
                });
              }}>
              <Text style={styles.text2}>Next</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002B5B',
    marginTop: 10,
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
  text2: {
    color: 'white',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  fillContainer2: {
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    margin: 20,
    borderWidth: 4,
    borderColor: '#256D85',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  textContainer:{
    backgroundColor: '#002B5B',
    flexDirection: "row"
  },
  text:{
    color: 'white',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
