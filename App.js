import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { AppLoading } from 'expo';

import CreateCardScreen from './screens/CreateCardScreen';
import DeckScreen from './screens/DeckScreen';

class App extends React.Component {

  state = {
    loading: true
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {

    if (this.state.loading) {
      return <Expo.AppLoading />
    }

    const MainNavigator = createBottomTabNavigator({
      createCard: CreateCardScreen,
      deck: DeckScreen
    })

    return (
        <MainNavigator/>
    );
  }
}

export default App;
