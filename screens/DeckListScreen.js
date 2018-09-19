import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

import { DeckList } from '../components';

class DeckListScreen extends Component {

    state = {
        decks: [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ]
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <DeckList decks={this.state.decks} />
                <Button onPress={() => navigate('createDeck')}>
                    <Text>Create a new Deck</Text>
                </Button>
            </View>
        )
    }
}

export default DeckListScreen;