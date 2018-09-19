import React, { Component } from 'react';
import { StyleSheet, Keyboard } from 'react-native'
import { Container, Header, Content, Textarea, Form, Text, Card, CardItem, Body, Title, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { TokenizedText } from '../components';

const colorsToImportance = {
  'white' : 0,
  'green' : 1,
  'orange' : 2,
  'red' : 3
}

class CreateCardScreen extends Component {

    state = {
        question: '',
        answer: '',
        tokenizedAnswer: {},
        tokenColors: {},
        selectedColor: 'green'
    };

    componentWillMount () {
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
      this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide = () => {
      if (this.state.answer.length > 0) {
        this.tokenizeAnswer();
      }
    }

    componentWillReceiveProps(nextProps) {
      let tokenColors = this.state.tokenColors;
      if (!this.state.tokenColors) {
          tokenColors = Object.keys(this.state.tokenizedAnswer).reduce((tokenColors, token) => {
              tokenColors[token] = 'white';
              return tokenColors;
          }, {});
      }

      this.setState({ tokenColors });
    }

    tokenizeAnswer = () => {
      const stringToTokenize = this.state.answer;
      const tokens = stringToTokenize.split(" ");
      console.log(tokens);

      const tokenizedAnswer = tokens.reduce((answer, token) => {
        answer[token] = 0;
        return answer;
      }, {});
    
      this.setState({ tokenizedAnswer });
    }

    onPress = (token) => {
      const { tokenColors, selectedColor, tokenizedAnswer } = this.state;

      let newTokenColors = Object.assign({}, tokenColors);
      newTokenColors[token] = selectedColor;

      let newTokenizedAnswer = Object.assign({}, tokenizedAnswer);
      newTokenizedAnswer[token] = colorsToImportance[selectedColor];

      this.setState({ tokenColors: newTokenColors, tokenizedAnswer: newTokenizedAnswer });          
    }

    createCard = () => {
      const { question, answer, tokenizedAnswer } = this.state;
      const card = {
        question,
        answer,
        tokenizedAnswerJson: JSON.stringify(tokenizedAnswer),
        deckId: "5b98a24c096b9b273aac71b9"
      };

      fetch('https://smart-flash-cards-api.herokuapp.com/cards', {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(card)
      })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    render() {
        return (
          <Container>
            <Header style={styles.header} androidStatusBarColor="orange">
              <Body>
                <Title>Create a Card!</Title>
              </Body>
            </Header>
            <Content padder>
              <Form>

                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Enter the card's question..."
                  onChangeText={(question) => {this.setState({ question })}}
                  value={this.state.question}
                />

                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Enter the card's answer..."
                  onChangeText={(answer) => { this.setState({ answer }) }}
                  value={this.state.answer}
                />

                {this.state.answer.length > 0 && 
                <Card>
                  <CardItem>
                    <Body>
                      <Text>
                        <TokenizedText
                          onPress={this.onPress}
                          tokens={Object.keys(this.state.tokenizedAnswer)}
                          tokenColors={this.state.tokenColors}
                          selectedColor={this.state.selectedColor}
                        />
                      </Text>
                    </Body>
                  </CardItem>

                  <CardItem footer bordered>
                    <Grid>
                      <Col>
                        <Row>
                          <Button rounded onPress={() => this.setState({ selectedColor: 'white' })} style={styles.button}>
                            <Text style={styles.buttonText}>Not Important</Text>
                          </Button>
                          <Button rounded success onPress={() => this.setState({ selectedColor: 'green' })} style={styles.button}>
                            <Text style={styles.buttonText}>Less Important</Text>
                          </Button>
                        </Row>
                        <Row>
                          <Button rounded warning onPress={() => this.setState({ selectedColor: 'orange' })} style={styles.button}>
                            <Text style={styles.buttonText}>Important</Text>
                          </Button>
                          <Button rounded danger onPress={() => this.setState({ selectedColor: 'red' })} style={styles.button}>
                            <Text style={styles.buttonText}>Very Important</Text>
                          </Button>
                        </Row>
                      </Col>
                    </Grid>
                  </CardItem>

                </Card>}

                <Button rounded success onPress={this.createCard} style={styles.createButton}>
                  <Text>Create Card</Text>
                </Button>

              </Form>
            </Content>
          </Container>
        )
    }
}

export default CreateCardScreen;

const styles = StyleSheet.create({
  header: {
    height: 44 + getStatusBarHeight(),
    backgroundColor: 'orange',
  },
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