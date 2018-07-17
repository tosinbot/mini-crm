import React, { Component } from 'react';
import { Container, Header, Content, Text, Form, Item, Input, Label, Button, Right, Left, Icon, Body, Title } from 'native-base';
import Constants from "../config";
export default class AddEmployee extends Component {

    render() {

        return (
            <Container>
                <Header style={{'backgroundColor': '#37474F'}} androidStatusBarColor="#263238">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                    <Title>Add Employee</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel style={{ margin: 15 }}>
                            <Label>Firstname</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Lastname</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Email Address</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Phone Number</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Company</Label>
                            <Input />
                        </Item>
                        <Button block style={{ margin: 15 }}>
                            <Text>Add Employee</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }


    uploadLogo() {
        FilePickerManager.showFilePicker(null, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled file picker');
            }
            else if (response.error) {
                console.log('FilePickerManager Error: ', response.error);
            }
            else {
                this.setState({
                    file: response
                });
            }
        });
    }
}