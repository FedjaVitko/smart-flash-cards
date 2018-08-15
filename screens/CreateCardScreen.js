import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Container, Header, Content, Textarea, Form, Text, Card, CardItem, Body, Title } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import TokenizedText from '../components/TokenizedText';

class CreateCardScreen extends Component {

    state = {
        question: '',
        answer: '',
        tokenizedAnswer: {}
    };

    tokenizeAnswer = () => {
      const stringToTokenize = this.state.answer;
      const tokens = stringToTokenize.split(" ");
      console.log(tokens);

      const tokenizedAnswer = tokens.reduce((answer, token) => {
        answer[token] = 0;
        return answer;
      }, {});

      console.log(tokenizedAnswer);
    
      this.setState({ tokenizedAnswer });
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
                          tokens={Object.keys(this.state.tokenizedAnswer)}
                        />
                      </Text>
                    </Body>
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
  }
})