import React, { Component } from 'react';
import {Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Title, Body } from 'native-base';
export default class CardShowcaseExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basic: true,
            spinnerVisible: true,
        };
    }


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
                    <Title>View Company</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'https://cregital-crmapi.botmotion.net/storage/'+this.props.navigation.getParam('logo', null)}} />
                                <Body>
                                <Text>{this.props.navigation.getParam('name', 'Company Name')}</Text>
                                <Text note>{this.props.navigation.getParam('website', 'Company Website')}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                {this.props.navigation.getParam('email', 'Company Email')}
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent textStyle={{color: '#87838B'}}
                                        onPress={() => this.props.navigation.navigate('EditCompany', {
                                            'name': this.props.navigation.getParam('name', null),
                                            'email': this.props.navigation.getParam('email', null),
                                            'website': this.props.navigation.getParam('website', null),
                                            'logo': this.props.navigation.getParam('logo', null) })}>
                                    <Icon name="md-create" />
                                    <Text>Edit Company</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}