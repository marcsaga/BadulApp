import React, {Component} from 'react';
import {StyleSheet,View,Text,Image,ActivityIndicator} from "react-native";


export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props)

    }

    render(){
        console.log("loading page")
        return(
            <View style={loadingStyles.container}>
                <Text style={loadingStyles.text}>BadulApp</Text>
                <ActivityIndicator color={"#f8ba46"} size='large'/>
            </View>
        );
    }
}
const loadingStyles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: '#333',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute'
    },
    text:{
        color: '#f8ba46',
        fontFamily: 'CarterOne',
        fontSize: 50,
    },
    loadGIF:{
        resizeMode: 'contain',
        width: 40,
        height: 80,

    }
})


