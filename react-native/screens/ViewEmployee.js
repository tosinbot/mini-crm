import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Title, Body } from 'native-base';
export default class CardShowcaseExample extends Component {
    render() {
        return (
            <Container>
                <Header style={{'backgroundColor': '#37474F'}} androidStatusBarColor="#263238">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                    <Title>View Employee</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../assets/avatar.png')} />
                                <Body>
                                <Text>{this.props.navigation.getParam('firstname', 'First')} {this.props.navigation.getParam('lastname', 'last')}</Text>
                                <Text note>{this.props.navigation.getParam('email', null)}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Company: {this.props.navigation.getParam('company', null)}
                            </Text>
                            <Text>
                                Phone: {this.props.navigation.getParam('phone', null)}
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}
                                        onPress={() => this.props.navigation.navigate("EditEmployee", {
                                            'firstname': data.firstname,
                                            'lastname': data.lastname,
                                            'company': data.company.name,
                                            'email': data.email,
                                            'phone': data.phone})}>
                                    <Icon name="md-create" />
                                    <Text>Edit Employee</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}