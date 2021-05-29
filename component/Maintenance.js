import React from 'react'
import {StyleSheet, Text, View } from 'react-native'


export default function Maintenance(){
    return(
    <View style={styles.container}>
        <Text style={[styles.text,styles.subTitle]}>
            죄송합니다! {"\n"}
            현재 충북대학교 서버가 점검중입니다. {"\n"}
            서버 점검이 끝난 후 앱을 실행해주시기 바랍니다..
        </Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',alignItems:"center",
        backgroundColor:"#7A1C3D",
    },
    text:{
        color:"#fff",
        textAlign:"center",
    },
    subTitle :{
        fontSize:24,
        marginBottom:10,
    },
})