import React from 'react';
import {StyleSheet, Text, View } from 'react-native'
import MenuList from './MenuList';
import PropTypes from 'prop-types';




const times = ["아침","점심","저녁"]

export default class Menu extends React.Component{

    constructor(props){
      super(props);
    }

    __objectIsEmpty = (obj) => {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    
    render(){
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{this.props.domitoryName}</Text>

        {times.map((time, i) => {
            return (
            <View style={styles.thirdContainer} key={i}>
            <MenuList
              key={i} 
              time = {times[i]}
              date = {this.props.date}
              menuList=
              {this.__objectIsEmpty(this.props.menuList[this.props.domitoryName]) == false ?
                this.props.menuList[this.props.domitoryName][this.props.date][time].replace(/\n/gi,"").replace(/<br>/gi,"\n"):
                // this.props.menuList[this.props.domitoryName][this.props.date][time].replaceAll("\n","").replaceAll("<br>","\n") :
                 "아직 기숙사에서 식당 정보를 제공하지 않았습니다."}
              
                      />
            </View>);
        })}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    borderColor:"black",
    borderWidth:1,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    paddingLeft:15,
    paddingRight:15,
  },
  title:{
    color: "black",
    fontSize: 24,
    // fontFamily: 'BMHANNAir',
    marginBottom:15,
  },
  thirdContainer:{
    flex:3
  }

});


Menu.propTypes ={
  domitoryName:PropTypes.string.isRequired,
}
