import {Text, View, TouchableHighlight, StyleSheet, Image} from "react-native";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import menuIcon from "../../images/menu-button.png"
import menuIcon_white from "../../images/menu-button_white.png"

export default class ButtonComponent extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <TouchableHighlight
                style={buttonStyles.button}
                onPress={this.props.onPress}
            >
                <Image style={{resizeMode: 'contain',width:50,
                    height:50}} source={menuIcon_white} />
            </TouchableHighlight>

        )
    }
}

ButtonComponent.propTypes = {
    onPress: PropTypes.func.isRequired,
};


const buttonStyles = StyleSheet.create({
    button:{
        borderRadius:12,
        width:50,
        height:50,
        position:'absolute',
        top:15,
        left:15,
        //backgroundColor:'red'
    }
});