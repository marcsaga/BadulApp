import {Text, View, TouchableHighlight, StyleSheet, TextInput, CheckBox} from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AddSuperComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            text:"",
            fullDay : false,
            error: false
        }
        this.sendData = this.sendData.bind(this)
    }
    sendData(){
        if(this.state.text === ""){
            this.state.error = true
        }
        else{
            return(
                this.props.addSuper(this.state.text,this.state.fullDay)
            )
        }

    }
    render(){
       return(

           <View style={addSuperStyles.container}>
               <View style={addSuperStyles.topView}>
                   <Text>Drag and place blue marker on the new super</Text>
               </View>
               <View style={addSuperStyles.inputContainer}>

                   <TextInput
                       justifyContent={'center'}
                       style={{height: 40,width:150, borderColor: 'gray', borderWidth: 1}}
                       onChangeText={(text) => this.state.text = text}
                       placeholder = {"Super Name"}
                   />

                   <View style={{marginLeft:20, flexDirection: 'row'}}>
                       <Text style={{marginRight: 5,marginTop:5}}>24h</Text>
                       <CheckBox
                           value={this.state.fullDay}
                           onValueChange={() => this.setState({ fullDay: !this.state.fullDay })}
                       />
                   </View>
               </View>
               <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, marginHorizontal:15}}>
                   <TouchableHighlight
                       onPress={()=>this.props.goBack("menu")}
                       underlayColor='transparent'
                   >
                       <View style={addSuperStyles.button}>
                           <Text style={addSuperStyles.addText}>back</Text>
                       </View>
                   </TouchableHighlight>
                   <TouchableHighlight
                       onPress={this.sendData}
                       underlayColor='transparent'
                   >
                       <View style={addSuperStyles.button}>
                           <Text style={addSuperStyles.addText}>add >></Text>
                       </View>
                   </TouchableHighlight>
               </View>

           </View>

       )
    }
}

AddSuperComponent.propTypes = {
    addSuper: PropTypes.func.isRequired,
    goBack:  PropTypes.func.isRequired
};


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

})