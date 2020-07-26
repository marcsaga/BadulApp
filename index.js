/**
 * @format
 */
import React, { Component } from 'react';
import {AppRegistry, PermissionsAndroid, View} from 'react-native';
import './src/utils/fixtimerbug';
import MainMap from "./src/screenComponents/MainMap";
import LoadingPage from "./src/screenComponents/LoadingPage";
import getSuperfromFirebase from "./src/utils/dataManager";

const requestLocationPermission = async() => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Location Permission',
                'message': 'This App needs access to your location ' +
                    'so we can know where you are.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use locations ")
        } else {
            console.log("Location permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
};

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state= {
            isLoaded: false,
            markers: {}
        }
    }
    async componentDidMount() {
        if(!this.state.isLoaded){
            requestLocationPermission().then(null)
            let markers = await getSuperfromFirebase().then(console.log("markers loaded"));
            this.setState({markers: markers, isLoaded: true})
        }

    }
    displayView(){
        console.log("loading main map")
        return(
            <View flex={1}>
                {this.state.isLoaded ? null : <LoadingPage/>}
                <MainMap markers={this.state.markers}/>
            </View>
        )
    }
    render() {
        return (
            this.displayView()
        )
    }
}

AppRegistry.registerComponent('Pakimetro', () => App);

