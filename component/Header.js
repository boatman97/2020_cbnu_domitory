import React from 'react';
import {Text,Alert, TouchableOpacity, Dimensions ,StyleSheet, View, YellowBox, Button} from 'react-native';
import {Picker, AsyncStorage } from 'react-native';

import DatePicker from 'react-native-datepicker'
import { AntDesign } from '@expo/vector-icons'; 

const windowWidth = Dimensions.get('window').width;
const inputWidth = windowWidth / 2;

YellowBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified.',
]);



export default class Header extends React.Component{


    constructor(props){
      super(props);
      this.state = {
        date : this.props.today,
        pickerValue : this.props.domOpt[0],
      }
    };


    _setAsync = async (domOpt) => {
      try {

        await AsyncStorage.removeItem('domOpt'); // 초기화
        await AsyncStorage.setItem(
          'domOpt',
          domOpt
        );
        console.log("_setAsync 성공!");
      } catch (error) {
        // Error saving data
        console.log("setAsync err!")
      }
    };

    childToParent = (cond) => {
      if(cond =="date"){
      this.props.handler(cond,this.state.date);
      } else{
        this.props.handler(cond,this.state.pickerValue);
      }
    }
    

    __openTimeTable = () => {
      Alert.alert(
        '즐거운 식사 되세요 :)',
        `<평일>\n아침 : 07:20 ~ 09:00\n점심 : 11:30 ~ 13:30\n저녁 : 17:30 ~ 19:10\n
        \n<주말/공휴일>\n아침 : 08:00 ~ 09:00\n점심 : 12:00 ~ 13:00\n저녁 : 17:30 ~ 19:00 \n\n문의사항 : applewodnr@naver.com
        
        `,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }

    __getDate = (originDate) => {
      let year = originDate.getFullYear();
      let month = (originDate.getMonth() + 1) < 10 ? "0"+ (originDate.getMonth() + 1) : originDate.getMonth() + 1;  // 월
      let date = originDate.getDate() < 10 ? "0"+ originDate.getDate() : originDate.getDate();  // 날짜
      return year+"-"+month+"-"+date;
    }


    __changeDate = (cond) => {
      const tempDate = new Date(
        this.state.date.substring(0,4),
        this.state.date.substring(5,7)-1,
        this.state.date.substring(8)
        )
      cond == "+" ? tempDate.setDate(tempDate.getDate()+1) : tempDate.setDate(tempDate.getDate()-1)
      const newDate = this.__getDate(tempDate);      
      this.setState({date: newDate}, ()=>{this.childToParent("date",this.state.date);});
    }
    

    __prevDate = () => {
      this.__changeDate("-");
    }

    __nextDate = () => {
      this.__changeDate("+");
    }


    render(){
    return (

      <View style={styles.container}>

          
          <TouchableOpacity
                          style={styles.headerBtn}
                          onPress={this.__openTimeTable}
                          >
                          <Text style={styles.headerBtnText}>식사시간</Text>
          </TouchableOpacity>   

          <View style={styles.domOptWrap}>
              <Picker
                selectedValue={this.state.pickerValue}
                style={{ height: 30, width: 150,}}
                onValueChange={(itemValue, itemIndex) =>{ 
                  this._setAsync(itemValue); 
                  this.setState({pickerValue: itemValue}, ()=>{this.childToParent("domOpt",itemValue);});
                  }}
                >

                <Picker.Item label="개성재" value="개성재" />
                <Picker.Item label="양성재" value="양성재" />
                <Picker.Item label="양진재" value="양진재" />
              


            </Picker>






          </View>
    
            <View style={{flex:1, justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              <AntDesign 
              name="caretleft" size={24} color="white" 
              onPress={this.__prevDate}
              />

                <DatePicker
                style={{width:inputWidth}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2020-09-01"
                maxDate="2023-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon= {true}
                customStyles={{
                  dateInput: {
                    backgroundColor:"#fff",
                    borderRadius:10,
                    borderWidth:2,
                    borderColor:"black",
                  },
                  dateText:{
                    color:'black'
                  },
                  dateIcon: {
                    position: 'absolute',
                    right: 0,
                    top: 4,
                    marginLeft: 0
                  },
                }}
                onDateChange={(date) => {
                  this.setState({date: date});
                  this.childToParent("date",this.state.date);
                }}
              />
             

              <AntDesign 
              name="caretright" size={24} color="white" 
              onPress={this.__nextDate}
              
              />


           
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#7A1C3D",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    paddingTop:25,
    paddingBottom:20,
    position:"relative"
  },
  domOptWrap:{
    marginBottom:20,
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    borderWidth: 2,
    borderColor: 'black',
    padding : 10,
    backgroundColor:"#fff",   
  },
  headerBtn:{
    position:"absolute",
    padding:5,
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor:"#fff",   
    top : 25,
    right: 5,

  },
  headerBtnText:{
      color:'black',
      textAlign:'center',
  }
});
