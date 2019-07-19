import {Text, View, TouchableHighlight, StyleSheet} from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class MenuComponent extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <View style={menuStyles.container}>
                <View style={menuStyles.topView}>
                    <Text>^ ({this.props.user_status})</Text>
                </View>
                <View style={menuStyles.menu}>
                    <TouchableHighlight
                        style={menuStyles.menuOpt}
                        onPress={() => this.props.setFilter("All")}
                    >
                        <Text>All</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={menuStyles.menuOpt}
                        onPress={() => this.props.setFilter("24h")}
                    >
                        <Text>24 h</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={menuStyles.menuOpt}
                        onPress={() => this.props.setComponent("premium")}
                    >
                        <Text>Premium</Text>
                    </TouchableHighlight>
                </View>
                <View style={menuStyles.viewAddSuper}>
                    <TouchableHighlight
                        style={menuStyles.addSuper}
                        onPress={()=>this.props.setComponent("addSuper")}
                    >
                        <Text style={menuStyles.addText}>Add super >></Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

MenuComponent.propTypes = {
    setComponent: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired,
};


const menuStyles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:0,
        width: '100%',
        height: 200,
        backgroundColor:'#d4cf2d',
        flexDirection:'column',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    topView:{
        height:30,
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'center',
    },
    viewAddSuper:{
        alignItems:'center',
        justifyContent:'center',
        height:60,
        borderWidth:1
    },
    addSuper:{
        width:170,
        height:25,
        borderWidth:1,
        borderRadius:10,
        backgroundColor: '#FFFFFF',

    },
    addText:{
        textAlign: 'center'
    },
    menu:{
        flexDirection: 'row',
        height:110,
        borderWidth:1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    menuOpt:{
        height: 80,
        width: 80,
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
    }

});