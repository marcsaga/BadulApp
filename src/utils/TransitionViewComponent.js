import * as Animatable from 'react-native-animatable';
import React, {Component} from 'react';


export default class TransitionViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render(){
        const {...rest} = this.props;
        return(
            <Animatable.View
                animation="fadeOut"
                duration={500}
                useNativeDriver
                {...rest}
            />
        )
    }
}