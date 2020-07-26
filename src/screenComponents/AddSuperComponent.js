import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    CheckBox,
    Modal,
    TouchableWithoutFeedback
} from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {db} from "../utils/config";
import * as Animatable from "react-native-animatable";

export default class AddSuperComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    sendData() {
        if (this.state.text === "") {
            this.state.error = true
        } else {
            return (
                this.addSuper(this.state.text, this.state.fullDay)
            )
        }

    }

    addSuper(name, isFullDay) {
        db.ref('/Supers/SuperID').push({
            pos: this.state.dragMarker,
            name: name,
            isFullDay: isFullDay,

        });
        console.log("data pushed:" + name + "  " + this.state.dragMarker)
        // Retrieve new posts as they are added to our database

        //this.setComponent("menu")
    }

    render() {
        return (
            <View></View>
        )
    }
}

const addSuperStyles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#4c49c6',
        //alignItems:'center',
        width: '100%',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    button: {
        width: 80,
        height: 30,
        borderRadius: 8,
        backgroundColor: '#526020',
        alignSelf: 'flex-end',
        //marginBottom: 13,
        //marginRight: 10,
        justifyContent: 'center',
    },
    topView: {
        width: '100%',
        height: 30,
        borderBottomWidth: 1,
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'center'
    },
    inputContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        marginLeft: 40,
        alignItems: 'center',
        //backgroundColor:'red',
        //justifyContent:'center'
    },
    addText: {
        textAlign: 'center',
        color: 'white',
    },
    modalTitle:{
        alignSelf: 'center',
        color: '#f8ba46',
        paddingVertical: 10,
    },
    modalAdd:{
        height:200,
        width:300,
        justifyContent: 'space-between',
        backgroundColor: '#333333',
        marginTop: 200,
        borderWidth: 1,
        borderColor: '#f8ba46',
        alignSelf: 'center'

    },
    modalText:{
        color: '#f8ba46'
    },

})