import React from 'react';
import { StyleSheet, Text, View, Linking} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { RFValue } from "react-native-responsive-fontsize";

export default function Footer(){
    return (
      <View style={styles.container}>
          <AntDesign name="mail" size={15} color="white" />
            <Text 
            style={styles.text}
            onPress={() => Linking.openURL('mailto:boatman97@naver.com')}
            >
            {` 문의메일 : boatman97@naver.com`}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor: '#7A1C3D',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row"
  },
  text:{
      color:"white",
      textAlign:"center",
      fontSize: RFValue(10, 720),
  }
});