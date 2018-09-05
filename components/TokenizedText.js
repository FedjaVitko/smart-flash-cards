import React from 'react';
import { Text } from 'react-native';

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