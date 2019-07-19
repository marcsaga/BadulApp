/**
 * @format
 */
import React, { Component } from 'react';
import {AppRegistry, PermissionsAndroid, View} from 'react-native';
import './src/utils/fixtimerbug';
import {name as appName} from './app.json';
import MainMap from "./src/screenComponents/MainMap";

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
}

export default class App extends Component {


    constructor(props) {
        super(props)
    }

    render() {
        requestLocationPermission().then(console.log("hey"))
        return (
            <View flex={1}>
                <MainMap/>
            </View>
        )

    }
}

AppRegistry.registerComponent('Pakimetro', () => App);

