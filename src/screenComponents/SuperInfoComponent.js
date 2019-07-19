import React, { Component } from 'react';
import {StyleSheet, View, Text} from "react-native";
import PropTypes from "prop-types";
import AddSuperComponent from "./AddSuperComponent";

export default class SuperInfoComponent extends Component {

    constructor(props) {
        super(props)
    }

    render(){
        console.log("super id: "+this.props.info.name)
        return(
            <View style={superInfoStyles.container}>
                <View style={superInfoStyles.nameContainer}>
                    <Text>{this.props.info.name}</Text>
                    {this.props.info.isFullDay &&
                    <Text>24 h</Text>
                    }
                </View>
            </View>
        )
    }
}

AddSuperComponent.propTypes = {
    info: PropTypes.object.isRequired,

};

const superInfoStyles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#c61226',
        //alignItems:'center',
        width: '100%',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        flexDirection:'column'
    },

    nameContainer:{
        marginTop:5,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderWidth:1
    },
})