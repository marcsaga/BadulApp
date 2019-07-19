import React, { Component } from 'react';
import {AppRegistry,View,Text,StyleSheet } from 'react-native';
import MapView, {AnimatedRegion, Marker} from "react-native-maps";
import {customMapStyles} from "../utils/utils";
import ButtonComponent from "../utils/ButtonComponent";
import MenuComponent from "./MenuComponent";
import data from 'C:/Users/Marc/WebstormProjects/Pakimetro/json/super.json';


import { db } from '../utils/config';
import AddSuperComponent from "./AddSuperComponent";

import { PermissionsAndroid } from 'react-native';
import TransitionViewComponent from "../utils/TransitionViewComponent";
import SuperInfoComponent from "./SuperInfoComponent";

import AsyncStorage from '@react-native-community/async-storage';
import PremiumComponent from "./PremiumComponent";


export default class App extends Component {

    constructor(props) {
        super(props)

        this.state={
            menuDisplayed: false,
            component: 'initial',
            region: {
                latitude: 41.3818,
                longitude: 2.1685,
                latitudeDelta: 0.08,
                longitudeDelta: 0.0121,
            },
            markers: [],
            originalData:[],
            dragMarker: undefined,
            newdata :  {
                "coordinate": {
                    "latitude": 41.5818800,
                    "longitude": 3.1685700
                },
                "title": "Foo Place",
                "key": 3

            },
            addSuperDisplayed: false,
            paddingTop : 1
        }

        this.setMenuDisplayed = this.setMenuDisplayed.bind(this)

        this.addSuper = this.addSuper.bind(this)
        this.setFilter = this.setFilter.bind(this)
        this.getSuperfromFirebase();
        this.setComponent = this.setComponent.bind(this)
        this.getUserStatus().then(console.log("getData done"));
        this.setPremium = this.setPremium.bind(this)

    }

    setPremium(){
        this.storeUserStatus("Premium").then(console.log("setPremium done"));
        this.getUserStatus().then(console.log("getData done"));
        this.setComponent("menu")
    }

    storeUserStatus = async (type) => {
        try {
            await AsyncStorage.setItem('@user_status', type)
        } catch (e) {
            // saving error
        }
    }

    getUserStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_status')
            if(value !== null) {
                console.log(value)
                //this.setState({user_status: value})
                this.state.user_status = value
            }
            else{
                this.storeUserStatus("normal_user").then(this.state.user_status = "normal_user")
            }
        } catch(e) {
            // error reading value
        }
    }

    getSuperfromFirebase(){
        let ref = db.ref("/Supers/SuperID");

        ref.on("value", (snapshot) => {
            let markers = [];
            snapshot.forEach((sup) => {
                let newsuper = {
                    pos: sup.val().pos,
                    name: sup.val().name,
                    isFullDay: sup.val().isFullDay,
                    key: sup.key,
                }
                markers.push(newsuper)
            });
            this.setState({originalData:markers, markers: markers})
        })

    }

    setFilter(type){
        switch (type) {
            case "24h":
                let fullDay = this.state.originalData.filter(sup=>
                    sup.isFullDay == true
                )
                this.setState({markers: fullDay})
                break;
            case "All":
                this.setState({markers:this.state.originalData})
                break;
            default: break;
        }
    }

    setMenuDisplayed(){
        if(this.state.component !== 'initial'){
            this.setState({component: 'initial'})
        }
        else{
            this.setState({component: 'menu'})
        }

    }


    getComponent(type){
        switch (type) {
            case 'menu':
                return (
                    <MenuComponent setComponent={this.setComponent} setFilter={this.setFilter} user_status={this.state.user_status}/>
                )

            case 'addSuper':
                return (
                    <AddSuperComponent addSuper={this.addSuper} goBack={this.setComponent}/>
                )

            case 'superInfo':
                return(
                    <SuperInfoComponent info={this.state.info}/>
                )

            case 'premium':
                return(
                    <PremiumComponent setPremium={this.setPremium} goBack={this.setComponent}/>
                )
            default:

                break;

        }
    }

    setComponent(type,info){
        if(info !== undefined){
            let curSuper = this.state.originalData.filter(sup=>
                sup.key == info
            )
            this.setState({component: type, info: curSuper[0]})
        }
        else{
            this.setState({component: type})
        }

    }


    addSuper(name,isFullDay){
        db.ref('/Supers/SuperID').push({
                     pos: this.state.dragMarker,
                     name: name,
                     isFullDay: isFullDay
                 });
        console.log("data pushed:"+name+"  "+this.state.dragMarker)
        // Retrieve new posts as they are added to our database

        this.setComponent("menu")
    }

    setDraggableMarker(){
        if(this.state.component === 'addSuper'){
            return(
                <Marker draggable
                        pinColor = 'blue'
                        coordinate={this.state.dragMarkerRegion}
                        onDragEnd={(e) => this.state.dragMarker = e.nativeEvent.coordinate}
                />
            )
        }
    }

    setRegion(region){
        this.state.region = region
        if(this.state.component !== 'addSuper'){
            let dragMarkerRegion = {
                latitude: region.latitude,
                longitude: region.longitude
            }
            this.state.dragMarkerRegion = dragMarkerRegion
        }
    }
    _onMapReady() {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
                this.setState({ paddingTop: 0 });
            });
    }


    render(){

        console.log(this.state.markers)
        return(
            <View style={[mapStyles.container,{ paddingTop: this.state.paddingTop }]}>
                <MapView
                    style={mapStyles.map}
                    loadingEnabled = {true}
                    initialRegion = {this.state.region}
                    onRegionChangeComplete={region => this.setRegion(region)}
                    customMapStyle={customMapStyles.nightMapStyle}
                    showsUserLocation={true}
                    //followsUserLocation={true}
                    showsMyLocationButton={true}
                    onMapReady={() =>this._onMapReady()}
                    showsCompass={false}

                >
                    {this.state.markers.map(marker => (
                        <Marker
                            identifier={marker.key}
                            title={marker.name}
                            key={marker.key}
                            coordinate={marker.pos}
                            onPress={(event)=>this.setComponent("superInfo",event.nativeEvent.id)}
                        />
                    ))}
                    {this.setDraggableMarker()}
                </MapView>
                <ButtonComponent onPress={this.setMenuDisplayed}/>
                {this.getComponent(this.state.component)}

            </View>


        )
    }


}
const mapStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
    map: {
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '110%'
    },
});