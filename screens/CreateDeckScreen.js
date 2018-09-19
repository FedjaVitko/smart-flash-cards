import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

class CreateDeckScreen extends Component {

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Button rounded success onPress={() => navigate('deckList')} style={styles.createButton}>
                  <Text>Create Card</Text>
                </Button>
            </View>
        )
    }
}

export default CreateDeckScreen;

const styles = StyleSheet.create({
    // header: {
    //   height: 44 + getStatusBarHeight(),
    //   backgroundColor: 'orange',
    // },
    button: {
      width: '50%',
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 10,
      textAlign: 'center'
    },
    createButton: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 20
    }
  })