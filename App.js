import React from 'react';
import {AppRegistry, StyleSheet, View, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Swiper from 'react-native-swiper/src';
import Menu from './component/Menu';
import Header from './component/Header';
// import Footer from './component/Footer';
import Loading from './component/Loading';

import {AsyncStorage } from 'react-native';



// 크롤링 과정에서 buffer 오류 방지.
import { Buffer } from 'buffer';
global.Buffer = Buffer; // very important


// 크롤링 사용 
const axios = require("axios");
const cheerio = require("cheerio");
const he = require('he');

// 기숙사 이름
const domitoryNames = ["개성재","양성재","양진재"]

export default class App extends React.Component {

  constructor(){
    super(); 

    this.state = {
      today: this.__getToday(), // 날짜
      isLoading:true, // 초기 로딩
      menuList:false, // 식단 Object
      reLoading: false, // 날짜 변경시 로딩 
      domOpt : domitoryNames,
    }

    this.handler = this.handler.bind(this);
  }

  // 식단 변경 함수
  handler = async (cond,newState) => {
    if(cond =="date"){
      if(this.state.today != newState){
        this.setState({reLoading: true})
        await this.__getJSON(newState);
      } else{
        Alert.alert("이미 업데이트가 완료 되었습니다.");
      }
      this.setState({reLoading: false})
    } else {
      // console.log("여기까지 왓나?" + newState.split(","));
      this.setState({reLoading: true})
      this.setState({domOpt : newState.split(",")})
      this.setState({reLoading: false})
    }
  }


    


  _getAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('domOpt');
      if(value == null)
        return null;
        
      this.setState({domOpt: value.split(",")}); 
    } catch (error) {
      // Error retrieving data
      console.log("getAsync err!")
      return false;
    }
  };

  // handler = async (changeDate, cond) => {
  //   if(this.state.today != changeDate){
  //     this.setState({reLoading: true})
  //     await this.__getJSON(changeDate);
  //   } else{
  //     Alert.alert("이미 업데이트가 완료 되었습니다.");
  //   }

  //   this.setState({reLoading: false})
  // }

  

  // 오늘의 날짜 얻어오기 함수
  __getToday = () => {
    let today = new Date();   
    let year = today.getFullYear();
    let month = (today.getMonth() + 1) < 10 ? "0"+ (today.getMonth() + 1) : today.getMonth() + 1;  // 월
    let date = today.getDate() < 10 ? "0"+ today.getDate() : today.getDate();  // 날짜
    return year+"-"+month+"-"+date;
  }

  // 크롤링 
  __getJSON = async (paramDate) => {
      const newList = {
        "개성재":{},
        "양성재":{},
        "양진재":{}
      };
      try {
        for(let i=1; i<=3;i++){
           await axios.get(`https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&cur_day=${paramDate}&type=${i}`)
          .then(html => {

            const $ = cheerio.load(html.data);
            const $bodyList = $("table.contTable_c.m_table_c.margin_t_30 tbody").children("tr");
  
            // 오늘 날짜 기준의 식단.
            $bodyList.each(function(j, elem) {
                if($(this).attr('id') == paramDate){
                  newList[domitoryNames[i-1]][$(this).attr('id')] = {
                    아침: he.decode($(this).find('.morning').html()),
                    점심: he.decode($(this).find('.lunch').html()),
                    저녁: he.decode($(this).find('.evening').html()),
                }
                }
            });
           
        });
       }
      } catch (error) {
        console.log("this.getJSON() 크롤링에 실패하였습니다.")
      }
      this.setState({
        menuList:newList,
        today:paramDate,
        isLoading:false,
        reLoading:false,
      })
    };



  componentDidMount(){
    this.__getJSON(this.state.today);
    this._getAsync();
  }



  render(){
    return this.state.isLoading == true ? <Loading /> : (


      <View style={styles.container}>
        <StatusBar style="light" />

        {/* header */}
        <View style={styles.header}>
          <Header 
          today={this.state.today}
          handler={this.handler}
          domOpt={this.state.domOpt}
          />
        </View>

        {/* section */}
        <View style={styles.botSection}>  

          {/* header의 날짜 변경시 발생하는 reLoading */}
          {
            this.state.reLoading == true ?
              <View style={styles.loadingIndicator}>
                <ActivityIndicator 
                size="large" 
                color="black"
                style={
                  {
                  transform:[{scale:3}]
                  }
                  }
                />
              </View> : null
          }
          
          <Swiper 
          style={styles.wrapper}
          showsPagination={false}
          showsButtons={true}
          showsButtons loop ={false}
          horizontal={true}
          >

          {this.state.domOpt.map((domitoryName, i) => {
              return (<Menu 
                date = {this.state.today}
                domitoryName={domitoryName}
                domitoryNames={domitoryNames}
                menuList={this.state.menuList}
                key={i} 
                        />);
          })}
          </Swiper>
        </View>

        {/* height 떄문에 푸터 제거. footer */}
        {/* <View style={styles.footer}>
          <Footer />
        </View> */}
      </View>

    ); 
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header:{
    flex:1.5,
  },
  botSection:{
    flex:8.8,
    padding:15,
    zIndex:0,
    elevation:0,
  },
  // footer:{
  //   flex:0.6,
  // },
  buttonText:{
    fontSize:150,
    width:150
  },
  loadingIndicator:{
    backgroundColor:"#FFE4E1",
    opacity:0.5,
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex:9999,
    elevation:9999,
  }
});


AppRegistry.registerComponent('App/', () => App)