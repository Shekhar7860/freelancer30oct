import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Select,
  Picker,
  Alert
} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';

import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
import DateTimePicker from 'react-native-modal-datetime-picker'
import Moment from 'moment';
import { strings } from '../services/stringsoflanguages';



export default class PostProject extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = { 
       userResponse: {},
       title:'',
       description:'',
       loading: false,
       country:'',
       jobType:'',
       budget:'',
       skills:'', 
       startDate :'',
       endDate :'',
       category : '',
       isDateTimePickerVisible: false,
       isDateTimePickerVisible2: false,
       startDateText : 'Start Date',
       endDateText : 'End Date',
       category :'Select Category',
       user: '',
       cities : '',
       selectedCity : ' ',
       date : new Date()
      }
     
      
  }

   updateUser = (user) => {
      this.setState({ user: user })
   }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log("date1", date);
    var newDate = Moment(date).format('YYYY-MM-DD');
    this.setState({ startDateText:newDate})
    this._hideDateTimePicker();
  };

  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  _handleDatePicked2 = (date) => {
    var newDate = Moment(date).format('YYYY-MM-DD');
    this.setState({ endDateText:newDate})
    this._hideDateTimePicker2();
  };

  componentDidMount() {
    if(this.props.navigation.state.params)
    {
      console.log(this.props.navigation.state.params.category)
    this.setState ({ category: this.props.navigation.state.params.category.selectedCategory});
      this.setState ({ title: this.props.navigation.state.params.category.inputData.title});
      this.setState ({ description: this.props.navigation.state.params.category.inputData.description});
      this.setState ({ selectedCity: this.props.navigation.state.params.category.inputData.selectedCity});
    }
      service.getUserData("user").then(
        keyValue => {
          console.log("local", keyValue);
          var parsedData = JSON.parse(keyValue);
          console.log("json", parsedData);
          this.setState({ userResponse: parsedData });
        },
        error => {
          console.log(error); //Display error
        }
      );
      service.cities().then(
        keyValue => {
          console.log("local", keyValue);
          this.setState({ cities: keyValue.city });
        },
        error => {
          console.log(error); //Display error
        }
      );
      
    }

    onChangeTextPress = ( value) => {
      console.log(value)
      this.setState({ selectedCity : value })
      console.log(this.state.selectedCity)
    }
    
    openCategory = () => {
      var projectData = {
        "title" :this.state.title,
        "description" : this.state.description,
        "selectedCity" : this.state.selectedCity,
        "pageName" : 'post'
      }
      this.props.navigation.navigate("Cat",  { page: projectData });
    }

  goToJobs = () => {
    this.props.navigation.navigate("Jobs");
  };

  goBack = () =>{
    this.props.navigation.navigate('Jobs');
   }
   
   disablePrevDates = (startDate) => {
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }


  post_project = () => {
    console.log('today', this.state.date)
    // if(this.state.endDateText >= this.state.date && this.state.startDateText >= this.state.date)
    //     {
        if(this.state.endDateText >= this.state.startDateText)
        {
          this.setState({loading: true})
          setTimeout(() => 
          {
          this.setState({loading: false})
          var array = this.state.skills.split(',');
          if(array.length >= 3)
          {
          var skills =  {
              "lastname": array[0],
              "email": array[1],
              "phone": array[2]
          }
          }
          else if (array.length = 2)
          {
            var skills =  {
              "lastname": array[0],
              "email": array[1],
              "phone": " "
          }
          }
          else if (array.length = 1)
          {
            var skills =  {
              "lastname": array[0],
              "email": " ",
              "phone": " "
          }
          }
          service.post_project(this.state.userResponse.api_token,this.state.title,this.state.description, this.state.selectedCity, this.state.category, this.state.jobType, this.state.budget,this.state.startDateText, this.state.endDateText, skills).then((res) => {
        // console.log(this.state.startDateText);
        // console.log(this.state.endDateText);
          if(res)
        {
          console.log("project posted", res)
            if(res.status == "success")
            {
            // this.refs.defaultToastBottom.ShowToastFunction('Job Added Successfully');
              Alert.alert(
                'Job Added Successfully'
              )
              this.openProject();
            }
            else
            {
              // this.refs.defaultToastBottom.ShowToastFunction('An Error Occured');
              Alert.alert(
                'An Error Occured'
              )
            }
          }
        else
          {
            Alert.alert(
              'Network error'
            )
          // this.refs.defaultToastBottom.ShowToastFunction('Network error');
        }
      })
        }, 3000)
      }
      else
      {
        Alert.alert(
          'Invalid End Date'
        )
      // this.refs.defaultToastBottom.ShowToastFunction('Invalid End Date');
      }
  //   }
  // else
  // {
  //   Alert.alert(
  //     'Please select valid date'
  //   )
  //  // this.refs.defaultToastBottom.ShowToastFunction('Invalid End Date');
  // }
}

openProject()
{
setTimeout(() => {
this.props.navigation.navigate('Jobs')
}, 1000)
}


  render() {
   
    let data = [{
      value: 'Afif',
    }, {
      value: 'Abha',
    }, {
      value: 'Abqaiq',
    },
    {
      value: 'Ad Darb',
    },
    {
      value: 'Ad Dawadimi',
    },
    {
      value: 'Ad Dilam',
    },
    {
      value: 'Al Artawiyah',
    },
    {
      value: '"Al Battaliyah',
    },
    {
      value: 'Al Hufuf',
    },
    {
      value: 'Al Jumum',
    },
    {
      value: 'Al Khafji',
    },
    {
      value: 'Al Majaridah',
    },
    {
      value: 'Al Markaz',
    },
    {
      value: 'Al Mindak',
    },
    {
      value: 'Al Mithnab',
    },
    {
      value: 'Al Mubarraz',
    },
    {
      value: 'Al Munayzilah',
    },
    {
      value: 'Al Mutayrifi',
    },
    {
      value: 'Al Qarah',
    },
    {
      value: 'Al Qatif',
    },
    {
      value: 'Al Qurayn',
    },
    {
      value: 'Al Wajh',
    },
    {
      value: 'Al Ula',
    },
    {
      value: 'Al Nimas',
    },
    {
      value: 'Ar Rass',
    },
    {
      value: 'Arar',
    },
    {
      value: 'As Saffaniyah',
    },
    {
      value: 'Ash Shafa',
    },
    {
      value: 'At Taraf',
    },
    {
      value: 'At Tubi',
    },
    {
      value: 'At Zulfi',
    },
    {
      value: 'Badr Hunayn',
    },
    {
      value: 'Buraydah',
    },
    {
      value: 'Dammam',
    },
    {
      value: 'Dhahran',
    },
    {
      value: 'Duba',
    },
    {
      value: 'Farasan',
    },
    {
      value: 'Ha il',
    },
    {
      value: 'Hafar Al-Batin',
    },
    {
      value: 'Jeddah',
    },
    {
      value: 'Jizan',
    },
    {
      value: 'Julayjilah',
    },
    {
      value: 'Khamis Mushait',
    },
    {
      value: 'Khobar',
    },
    {
      value: 'Marat',
    },
    {
      value: 'Mecca',
    },
    {
      value: 'Medina',
    },
    {
      value: 'Misliyah',
    },
    {
      value: 'Mizhirah',
    },
    {
      value: 'Mulayjah',
    },
    {
      value: 'Najran',
    },
    {
      value: 'Qaisumah',
    },
    {
      value: 'Qal at Bishah',
    },
    {
      value: 'Qurayyat',
    },
    {
      value: 'Rabigh',
    },
    {
      value: 'Rahimah',
    },
    {
      value: 'Riyadh',
    },
    {
      value: 'Sabya',
    },
    {
      value: 'Safwa',
    },
    {
      value: 'Sajir',
    },
    {
      value: 'Sakakah',
    },
    {
      value: 'Samitah',
    },
    {
      value: 'Sayhat',
    },
    {
      value: 'Suwayr',
    },
    {
      value: 'Ta if',
    },
    {
      value: 'Tabalah',
    },
    {
      value: 'Tabuk',
    },
    {
      value: 'Tanumah',
    },
    {
      value: 'Tarut',
    },
    {
      value: 'Tubarjal',
    },
    {
      value: 'Tumayr',
    },
    {
      value: 'Turabah',
    },
    {
      value: 'Turaif',
    },
    {
      value: 'Unm as Sahik',
    },
    {
      value: 'Unm Lajj',
    },
    {
      value: 'Unaizah',
    },
    {
      value: 'Yanbu',
    }];

    return (
    
      <SafeAreaView style = { styles.MainContainerProject }>
         <View style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.goToJobs()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}> {strings.AddJob} </Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity>
         <Image style={styles.searchIcon} />
        </TouchableOpacity>
        </View>
        
        <ScrollView>
         <Text style={styles.projectInput}>
            {strings.Title}
        </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Title"
            onChangeText={(text)=>this.setState({ title:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
           // value={this.state.title}
          />

          <Text style={styles.projectInput}>
            {strings.City}
         </Text>
         <View style={styles.dropDown}
        >
         <Dropdown
        label=''
        data={data}
        valueExtractor={({value})=> value}
        onChangeText={(value)=>{this.onChangeTextPress( value)}}
      />
      </View>
        
            


          {/* <Text style={styles.projectInputJob}>
            Job Type
           </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="ABC"
            onChangeText={(text)=>this.setState({ jobType:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.jobType}
          /> */}



                <Text style={styles.projectInputJob}>
                    {strings.Category}
                </Text>
                <TouchableOpacity  style={styles.dropDown2} onPress={() => this.openCategory()}>
                    <Text style={styles.dateTextColorProfile} >
                  {this.state.category}
                    </Text>
                </TouchableOpacity>
            
           <Text style={styles.projectInput}>
            {strings.Budget}
          </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Enter amount"
            onChangeText={(text)=>this.setState({ budget:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            keyboardType="numeric"
            // value={this.state.budget}
          />
          
          <Text style={styles.projectInput}>
            {strings.Startenddate}
          </Text>
          <View style={{ flexDirection: "row", marginRight:'3%' }}>
            <View style={{ width: "49%" }}>
                  <TouchableOpacity onPress={this._showDateTimePicker} style={styles.postprojectinput}>
                  <Text style={styles.dateTextColor}>{this.state.startDateText}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "49%" }}>
                <TouchableOpacity onPress={this._showDateTimePicker2} style={styles.postprojectinput}>
                  <Text style={styles.dateTextColor}>{this.state.endDateText}</Text>
                </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.projectInput}>
            {strings.Skills}
          </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Enter skills"
            onChangeText={(text)=>this.setState({ skills:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
           // value={this.state.skills}
          />
        
          <Text style={styles.projectInput}>
            {strings.Description}
          </Text>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Description"
            onChangeText={(text)=>this.setState({ description:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            multiline={true}
            numberOfLines={4}
            //value={this.state.description}
          />
          
      
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          
        />
         <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible2}
          onConfirm={this._handleDatePicked2}
          onCancel={this._hideDateTimePicker2}
        />
      <TouchableOpacity style={ styles.bottomViewRequest} onPress={() => this.post_project()}>
         <Text style={styles.textStyle}>{strings.Submit} </Text>
      </TouchableOpacity>
      </ScrollView>
      <Loader
          loading={this.state.loading} />
      
   </SafeAreaView>
    );
  }
}
