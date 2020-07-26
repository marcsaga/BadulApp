import {Text, View, TouchableOpacity, StyleSheet,Image,TouchableHighlight,Modal, TouchableWithoutFeedback} from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import SlidingPanel from 'react-native-sliding-up-down-panels';
import AddSuperComponent from "./AddSuperComponent";
import superAdd from "../../images/superAdd.png"
import config from "../../images/config.png"
import * as Animatable from 'react-native-animatable';

export default class MenuComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            menuOptionOn: "All",
            modalVisibleAdd: false,
            modalVisibleConfig: false,
        }
    }
    /*
    <SlidingPanel
            headerLayoutHeight = {100}
            headerLayout = { () =>
                <View style={styles.headerLayoutStyle}>
                  <Text style={styles.commonTextStyle}>My Awesome sliding panel</Text>
                </View>
            }
            slidingPanelLayout = { () =>
                <View style={styles.slidingPanelLayoutStyle}>
                  <Text style={styles.commonTextStyle}>The best thing about me is you</Text>
                </View>
            }
        />
        */
    changeToAdd(){
        return(
            console.log("add")
        )
    }
    menuOption(option){
        if(!(this.state.menuOptionOn === option)) {
            this.props.setFilter(option);
            this.setState({menuOptionOn: option});
        }
    }
    getActiveStyle(option){
        if(this.state.menuOptionOn === option) {
            return menuStyles.menuTextActive;
        }
    }
    toggleModalAdd(visible){
        this.setState({ modalVisibleAdd: visible });
    }
    toggleModalConfig(visible){
        this.setState({ modalVisibleConfig: visible });
    }
    displayModalConfig(){
        return(

            <Modal animationType = {"fade"} transparent = {true}
                   visible = {this.state.modalVisibleConfig}
                   onRequestClose = {() => { this.toggleModalConfig(!this.state.modalVisibleConfig)}}>
                <TouchableWithoutFeedback onPress={()=>{this.toggleModalConfig(!this.state.modalVisibleConfig)}}>
                    <View style={menuStyles.modalOverlay} />
                </TouchableWithoutFeedback>

                <Animatable.View animation="fadeInRight"  style = {menuStyles.modalAdd}>
                    <Text style={menuStyles.modalTitle}>CONFIGURATION</Text>
                    <Text style={[menuStyles.modalText,{textAlign: 'center',}]}>Update coming!</Text>
                    <View style={menuStyles.modalAddOptions}>
                        <TouchableHighlight>
                            <View style={menuStyles.modalAddOp}>
                                <Text style={menuStyles.modalAddOpText}>Admin mode</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Animatable.View>

            </Modal>
        )
    }
    displayModalAdd(){
        return(
            <Modal animationType = {"fade"} transparent = {true}
                   visible = {this.state.modalVisibleAdd}
                   onRequestClose = {() => { this.toggleModalAdd(!this.state.modalVisibleAdd)}}>
                <TouchableWithoutFeedback onPress={()=>{this.toggleModalAdd(!this.state.modalVisibleAdd)}}>
                    <View style={menuStyles.modalOverlay} />
                </TouchableWithoutFeedback>
                <Animatable.View animation="fadeInLeft"  style={menuStyles.modalAdd}>

                    <Text style={menuStyles.modalTitle}>AÑADIR SUPERMERCADO</Text>
                    <Text style={menuStyles.modalText}>Falta algun supermercado en el mapa? No somos perfectos! Puedes añadirlo tu mismo y nosotros
                        comprovaremos los datos. Estas enfrente del supermercado o prefieres marcarlo en el mapa? </Text>
                    <View style={menuStyles.modalAddOptions}>
                        <TouchableHighlight>
                            <View style={menuStyles.modalAddOp}>
                                <Text style={menuStyles.modalAddOpText}>Estoy enfrente</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <View style={menuStyles.modalAddOp}>
                                <Text style={menuStyles.modalAddOpText}>Marcarlo</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Animatable.View>
            </Modal>
        )
    }
    render(){
        return(
            <View style={menuStyles.container}>
                <TouchableOpacity onPress={() => this.toggleModalAdd(!this.state.modalVisibleAdd)}>
                    <Animatable.Image
                        animation="fadeInLeft"
                        style={menuStyles.menuIcon}
                        source={superAdd}
                    />
                </TouchableOpacity>
                <View style={menuStyles.mainOptContainer}>
                    <View>
                        <TouchableOpacity onPress={() => this.menuOption("All")}>
                            <Animatable.Text animation="fadeInUp" style={[menuStyles.menuText, this.getActiveStyle("All")]}>All</Animatable.Text>
                        </TouchableOpacity>
                    </View>
                    <Animatable.View animation="fadeInDown" style={menuStyles.midBar}/>
                    <View>
                        <TouchableOpacity onPress={() => this.menuOption("24h")}>
                            <Animatable.Text animation="fadeInUp" style={[menuStyles.menuText, this.getActiveStyle("24h")]}>24h</Animatable.Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.toggleModalConfig(!this.state.modalVisibleConfig)}>
                    <Animatable.Image
                        animation="fadeInRight"
                        style={[menuStyles.menuIcon,{width:30},{height:30}]}
                        source={config}
                    />
                </TouchableOpacity>
                {this.displayModalAdd()}
                {this.displayModalConfig()}

            </View>
        )
    }
}

/*
<TouchableHighlight onPress={()=>{this.toggleModalAdd(!this.state.modalVisibleAdd)}}>
    <View style={{position: 'absolute',top: 0, right: 5}}>
        <Text style={{color: '#f8ba46', fontSize: 20}}>X</Text>
    </View>
</TouchableHighlight>
*/

/*
*                   <View style={menuStyles.menu}>
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
                            style={menuStyles.addSuper}
                            onPress={()=>this.changeToAdd()}
                        >
                            <Text style={menuStyles.addText}>Add super >></Text>
                        </TouchableHighlight>
                    </View>
* */

MenuComponent.propTypes = {
    setFilter: PropTypes.func.isRequired,
};


const menuStyles = StyleSheet.create({
    container:{
        width: '100%',
        height: 110,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#333333',
        flexDirection:'row',
    },
    menuText:{
        fontFamily: 'Acme',
        fontSize:30,
        color: '#f9efcf',
    },
    menuTextActive:{
        color: '#f8ba46',
    },
    mainOptContainer:{
        justifyContent: 'center',
        flexDirection: 'row',
    },
    midBar:{
        backgroundColor: '#f8ba46',
        width: 1,
        height:38,
        marginHorizontal: 20,
    },
    menuIcon:{
        height:35,
        width:35,
        marginHorizontal: 20,
    },
    modalAdd:{
        height:'auto',
        width:300,
        justifyContent: 'space-between',
        backgroundColor: '#333333',
        marginTop: 200,
        borderWidth: 1,
        borderColor: '#f8ba46',
        alignSelf: 'center'

    },
    modalText:{
        color: '#f8ba46',
        textAlign: 'justify',
        paddingHorizontal: 25,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalTitle:{
        alignSelf: 'center',
        color: '#f8ba46',
        paddingVertical: 10,
    },
    modalAddOptions:{
        flexDirection: 'row',
        justifyContent:'center',
        paddingVertical: 10,
    },
    modalAddOp:{
        backgroundColor: '#f8ba46',
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 10,
    },
    modalAddOpText:{
        textAlign: 'center',
        color: '#333'
    }

});