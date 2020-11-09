import React from 'react'
import {StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 


export default function Loading(){
    return(
    <View style={styles.container}>
        <View style={styles.bomttomContainer}>
            <Text style={[styles.text,styles.subTitle]}>Loading</Text>
            <ActivityIndicator 
                    size="large" 
                    color="#fff"
                    style={
                    {
                    transform:[{scale:1.5}]
                    }
                    }
            />
            </View>
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
    title:{
        fontSize:48,
        marginBottom:50,
    },
    subTitle :{
        fontSize:24,
        marginBottom:10,
    },
    

})