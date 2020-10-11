import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import { Container, Header, Title, Card, Input, Button, Left, Right, Body, Icon, Item } from 'native-base';


export default class NotePadScreen extends Component {  
    render() {  
        return (  
            <Container style={{ backgroundColor: "#fcf2f4" }}>
                <Header transparent>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={{ color: 'black' }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Title style={{ color: 'black' }}>Notepad</Title>
                    </Body>
                    <Right />
                    <Button transparent>
                            <Icon type="Feather" name='plus-circle' style={{ color: 'black' }} />
                    </Button>
                </Header>
                <View>
                <Item>
                    <Icon name="search" />
                    <Input placeholder="Search" />
                    <Icon name="people" />
                </Item>
                    <Text>asdasd</Text>
                </View>
            </Container>
    );  
    }  
}  