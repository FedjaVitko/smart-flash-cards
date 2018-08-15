import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

class TokenizedText extends Component {

    state = {
        tokenColors: {}
    }

    componentWillReceiveProps(nextProps) {
        const tokenColors = nextProps.tokens.reduce((tokenColors, token) => {
            return tokenColors[token] = 'white';
        }, {});

        this.setState({ tokenColors });
    }

    render() {
        return this.props.tokens.map((token, id) => {
            return (
                <Text
                    key={`${token}:${id}`} 
                    onPress={() => { 
                        console.log(token);
                        // this.setState(prevState => ({
                        //     tokenColors : {
                        //         ...prevState.tokenColors,
                        //         token: 'green'
                        //     }
                        // }))
                        let newState = Object.assign({}, this.state);
                        newState.tokenColors[token] = 'green';
                        console.log(this.state.tokenColors);
                    }}
                    style={{ backgroundColor: this.state.tokenColors[token] }}
                >
                    {`${token} `}
                </Text>
            );
        });
    }
}

export default TokenizedText;

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'white'
    }
});