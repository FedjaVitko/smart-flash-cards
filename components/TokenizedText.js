import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

const TokenizedText = ({ tokens, onPress, tokenColors }) => (
        tokens.map((token, id) => {
            return (
                <Text
                    key={`${token}:${id}`} 
                    onPress={() => onPress(token)}
                    style={{ backgroundColor: tokenColors[token] }}
                >
                    {`${token} `}
                </Text>
            );
        })
    );

export default TokenizedText;

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'white'
    }
});