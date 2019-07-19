import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableHighlight} from "react-native";
import PropTypes from "prop-types";
import AddSuperComponent from "./AddSuperComponent";

export default class PremiumComponent extends Component {

    constructor(props) {
        super(props)
        this.state={
            text: ""
        }
    }

    sendData(){
        if(this.state.text === ""){
            this.state.error = true
        }
        else{
            console.log("success")
        }

    }

    render(){
        return(
            <View style={premiumStyles.container}>
                <View style={premiumStyles.topView}>
                    <Text>Write password to get premium</Text>
                </View>
                <View style={premiumStyles.inputContainer}>

                    <TextInput
                        justifyContent={'center'}
                        style={{height: 40,width:150, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.state.text = text}
                        placeholder = {"Password"}
                    />
                </View>
                <TouchableHighlight
                    onPress={()=>this.sendData()}
                    underlayColor='transparent'
                >
                    <View style={premiumStyles.button}>
                        <Text style={premiumStyles.addText}>add >></Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
//
// PremiumComponent.propTypes = {
//     info: PropTypes.object.isRequired,
//
// };

const premiumStyles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#c67100',
        //alignItems:'center',
        width: '100%',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        flexDirection:'column'
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

    addText: {
        textAlign: 'center',
        color: 'white',
    },
})