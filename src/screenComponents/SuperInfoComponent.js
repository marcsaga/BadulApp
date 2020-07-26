import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Button} from "react-native";
import PropTypes from "prop-types";
import AddSuperComponent from "./AddSuperComponent";

export default class SuperInfoComponent extends Component {

    constructor(props) {
        super(props)
    }

    render(){
        if (this.props.info) {
            console.log(this.props.info.name);
        }
        return(
            <View style={superInfoStyles.containerSup}>

                <Text>{this.props.info ? this.props.info.name : "No name" }</Text>


            </View>
        )
    }
}

AddSuperComponent.propTypes = {
    info: PropTypes.object.isRequired,
    approve: PropTypes.object.isRequired,
};

const superInfoStyles = StyleSheet.create({


    containerSup: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },


    approveView:{
        height: 40,
        borderBottomWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderTopWidth:1
    },

    nameContainer:{
        marginTop:5,
        alignItems:'center',
        justifyContent:'center',
        height:50,

    },
})