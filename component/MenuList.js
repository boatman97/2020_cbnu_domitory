import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";




export default function Menu({date,time,menuList}){

    return (
      <View style={styles.container}>
        <View style={styles.menuListTop}>
          <Text style={[styles.text,{color:"white"}]}>{time}({date})</Text>
        </View>
        <View style={styles.menuListBot}>
          <Text style={styles.botText}>
            {menuList}
          </Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderColor:"#DCDCDC",
    borderWidth:1,
  },
  menuListTop:{
      flex:2,
      backgroundColor:"#7A1C3D",
      justifyContent:"center",
      alignItems:"center"
  },
  menuListBot:{
      flex:8,
      justifyContent:"center",
      alignItems:"center",
  },
  botText:{
    paddingTop:10,
    fontSize: RFValue(10, 720),
    textAlign:"center",
  }
});