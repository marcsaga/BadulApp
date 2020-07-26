import React, {Component} from 'react';
import {PermissionsAndroid, StyleSheet, View, Text, Button, Image, ActivityIndicator} from 'react-native';
import MapView, {Marker} from "react-native-maps";
//import MapView from "react-native-map-clustering";
//import MapView from "react-native-map-clustering";
import {customMapStyles} from "../utils/utils";
import ButtonComponent from "../utils/ButtonComponent";
import MenuComponent from "./MenuComponent";
import icon12 from "../../images/icono12h.png"
import icon24 from "../../images/icono24h.png"
import * as Animatable from 'react-native-animatable';
import {db} from '../utils/config';
import SuperInfoComponent from "./SuperInfoComponent";
import SlidingUpPanel from "rn-sliding-up-panel";
import LoadingPage from "./LoadingPage";

const draggableRange = {top: 300, bottom: 0}
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state={
            menuDisplayed: false,
            component: 'menu',
            region: {
                latitude: 41.3818,
                longitude: 2.1685,
                latitudeDelta: 0.08,
                longitudeDelta: 0.0121,
            },
            markers: [],
            originalData:[],
            allNight: [],
            clustMarkers: [],
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
            paddingTop : 1,
            isLoaded : false,
            firstTime: true,
            longitudeDelta:0.011445321142673492,
            latitudeDelta:0.015946803178302105,
            isZoomIn: false,
            mode: "All",
            markersFirstTime: true,

        }
        this.setFilter = this.setFilter.bind(this)
        this.setApproved = this.setApproved.bind(this)
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if(nextProps === this.state.props) {
            return false
        }
        return true
    }

    update(){
        db.ref("/Supers/SuperID").once('value',function(s){
            let users = s.val()
            let newUsers = {}
            for(let key in users) {
                newUsers[key+'/approved'] = true
            }
            db.ref("/Supers/SuperID").update(newUsers)
        });

    }
/*
    setPremium(type){
        this.storeUserStatus(type).then(console.log("set"+type+" one"));
        this.getUserStatus().then(console.log("getData done"));

        this.setComponent("menu")
    }

    storeUserStatus = async (type) => {
        try {
            await AsyncStorage.setItem('@user_status', type)
        } catch (e) {
            console.log(e)
        }
    }

    getUserStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_status')
            if(value !== null) {
                console.log(value)
                this.state.user_status = value
                this.getSuperfromFirebase()
            }
            else{
                this.storeUserStatus("normal").then(this.state.user_status = "normal")
            }
        } catch(e) {
            console.log(e)
        }
    }
    */

    async componentDidMount(): void {
        if (this.state.firstTime) {
            let iniPos = {};
            await getCurrentLocation().then(position => {
                if (position) {
                    iniPos = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    };
                }
            });
            if(iniPos.latitude !== undefined){
                this.setState({region: iniPos, firstTime: false})
            }
        }
    }


    setFilter(type){
        switch (type) {
            case "24h":
                this.setState({markers: this.state.allNight, mode:"24h", changeData: true})
                break;
            case "All":
                if(this.state.isZoomIn){
                    this.setState({markers: this.state.originalData, mode:"All", changeData: true})
                }
                else{
                    this.setState({markers: this.state.originalData, mode:"All", changeData: true})
                }

                break;
            default: break;
        }
    }

    setMenuDisplayed(){

        return(
            <MenuComponent setFilter={this.setFilter}/>
        )

    }
    setApproved(info){
        info.approved = true;
        db.ref("/Supers/SuperID/"+info.key).update({approved: true}).then(this.getSuperfromFirebase()
        )
    }



    showSuperInfo(type,info){
        let curSuper = this.state.originalData.filter(sup=> sup.key === info)
        this.setState({info: curSuper[0]})
        this._panel.show();
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
            this.state.dragMarkerRegion = {
                latitude: region.latitude,
                longitude: region.longitude
            }
        }
    }
    _onMapReady() {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
                this.setState({paddingTop : 0})
            });
    }

    slidePanel(){
        return(
            <SlidingUpPanel ref={c => this._panel = c} draggableRange = {draggableRange} height={300}>
                <SuperInfoComponent info={this.state.info} approve={this.setApproved}/>
            </SlidingUpPanel>
        )
    }

    displayHeader(){
        return(
            <View style={mapStyles.header}>
                <Animatable.Text animation="fadeInDown" style={mapStyles.headerText}>BadulApp</Animatable.Text>
            </View>

        )
    }

    displayLoadingPage(){
        if(!this.state.isLoaded){
            return <LoadingPage/>
        }
    }

    clusterMarkers(region){
        if(this.state.mode === "All" && !this.state.firstTime){
            if(this.state.longitudeDelta<region.longitudeDelta || this.state.latitudeDelta<region.latitudeDelta){
                if(this.state.isZoomIn){
                    this.setState({isZoomIn:false,markers:this.state.clustMarkers})
                }
            }
            else if(!this.state.isZoomIn){
                this.setState({isZoomIn:true,markers:this.state.originalData})
            }
        }
    }

    getMarkers(){
        let markers = this.state.mode === "All" ? this.props.markers.allMarkers : this.props.markers.nightMarkers;
        return(
            markers.map((marker, index) => (
                <Marker
                    title={marker.properties.Nom_Local}
                    key={index}
                    coordinate={marker.geometry.coordinates}
                    tracksViewChanges={false}
                    icon={marker.properties.SN_Obert24h === "0" ? icon24 : icon12}
                />
            ))
        )
    }

    displayMarkers() {
        //console.log("markers: "+ this.state.markers.length + "FirstTIme: "+this.state.markersFirstTime)
        if(Object.keys(this.props.markers).length !== 0){
            console.log("display markers");
            let m = this.getMarkers();
            console.log(m);
            return m
        }
    }
    /*
    markersReady(){
        if((this.state.markersFirstTime && this.state.markers.length !== 0) || this.state.changeData){
            console.log("firstTime OFF")
            this.state.markersFirstTime = false;
            this.state.changeData = false
        }
    }
    */


    activityIndicatorOn(){
        if(this.state.changeData){
            console.log("load on")
            return(
                <View style={{top:60, height:30, width: 70,backgroundColor: 'red', position: 'absolute'}}>
                    <ActivityIndicator color={"#f8ba46"} size='large'/>
                </View>

            )
        }
        else{
            console.log("already log")
        }

    }

    activityIndicatorOff(){
        if(this.state.changeData){
            this.setState({changeData: false})
        }
    }

    render() {
        if (!this.state.firstTime) {
            return (
                <View style={[mapStyles.container, {paddingTop: this.state.paddingTop}]}>
                    {this.displayHeader()}
                    <MapView
                        style={mapStyles.map}
                        loadingEnabled={true}
                        initialRegion={this.state.region}
                        //onRegionChangeComplete={region => this.clusterMarkers(region)}
                        customMapStyle={customMapStyles.nightMapStyle}
                        showsUserLocation={true}
                        clusteringEnabled = {true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        onMapReady={() => this._onMapReady()}
                        showsCompass={true}
                    >
                        {this.displayMarkers()}


                    </MapView>
                    {this.setMenuDisplayed()}

                </View>
            )
        } else {
            return (null)
        }
    }


}

/*



import React from 'react';
import {View, Button, Text} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const draggableRange = {top: 200, bottom: 0}


export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title='Show panel' onPress={() => this._panel.show()} />
                <SlidingUpPanel ref={c => this._panel = c} draggableRange = {draggableRange} height={300}>

                    <View style={styles.container}>
                        <Text>Here is the content inside panel</Text>
                        <Button title='Hide' onPress={() => this._panel.hide()} />
                    </View>
                </SlidingUpPanel>
            </View>
        )
    }
}






* */
const mapStyles = StyleSheet.create({
    header: {
        width: '100%',
        top:0,
        position:'absolute',
        height: 60,
        backgroundColor: '#333333',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'CarterOne',
        fontSize:30,
        color: '#f8ba46',
        paddingLeft: 20,
    },
    container: {
        paddingTop:40,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
    containerSup: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {

        flex:1,
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%'
    },

});