import React, { Component } from 'react';
import { Container, Header, Content, Text, Form, Item, Input, Label, Button, Right, Left, Icon, Body, Title } from 'native-base';

export default class EditEmployee extends Component {

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
                    <Title>Edit Employee</Title>
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
                        <Button block style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                            <Text>Save</Text>
                        </Button>
                        <Button block danger style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Text>Delete Employee</Text>
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