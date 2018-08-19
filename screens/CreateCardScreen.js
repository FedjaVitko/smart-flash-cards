import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Textarea, Form, Text, Card, CardItem, Body, Title, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import TokenizedText from '../components/TokenizedText';

class CreateCardScreen extends Component {

    state = {
        question: '',
        answer: '',
        tokenizedAnswer: {},
        tokenColors: {},
        selectedColor: 'green'
    };

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
      const { tokenColors, selectedColor } = this.state;

      let newTokenColors = Object.assign({}, tokenColors);
      newTokenColors[token] = selectedColor;

      this.setState({ tokenColors: newTokenColors });          
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
                  onChangeText={(question) => {this.setState({question})}}
                  value={this.state.question}
                />
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Enter the card's answer..."
                  onChangeText={(answer) => { this.setState({answer}) }}
                  value={this.state.answer}
                  onBlur={this.tokenizeAnswer}
                />
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
                          <Button rounded onPress={() => this.setState({ selectedColor: 'white' })} style={{ width: '50%' }}>
                            <Text style={styles.buttonText}>Not Important</Text>
                          </Button>
                          <Button rounded success onPress={() => this.setState({ selectedColor: 'green' })} style={{ width: '50%' }}>
                            <Text style={styles.buttonText}>Less Important</Text>
                          </Button>
                        </Row>
                        <Row>
                          <Button rounded warning onPress={() => this.setState({ selectedColor: 'orange' })} style={{ width: '50%' }}>
                            <Text style={styles.buttonText}>Important</Text>
                          </Button>
                          <Button rounded danger onPress={() => this.setState({ selectedColor: 'red' })} style={{ width: '50%' }}>
                            <Text style={styles.buttonText}>Very Important</Text>
                          </Button>
                        </Row>
                      </Col>
                    </Grid>
                  </CardItem>
                </Card>
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
  buttonText: {
    fontSize: 10,
    textAlign: 'center'
  }
})