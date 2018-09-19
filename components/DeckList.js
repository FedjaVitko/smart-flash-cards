import React from 'react';
import { View, Text } from 'react-native';

const DeckList = ({ decks }) => (
        decks.map((deck, id) => {
            return (
                <View>
                    <Text>{deck.id}</Text>
                </View>
            );
        })
    );

export default DeckList;