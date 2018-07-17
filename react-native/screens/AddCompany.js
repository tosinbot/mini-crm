import React, { Component } from 'react';
import { Container, Header, Content, Text, Form, Item, Input, Label, Button, Right, Left, Icon, Body, Title } from 'native-base';
import FilePickerManager from 'react-native-file-picker';

export default class AddCompany extends Component {

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
                    <Title>Add Company</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel style={{ margin: 15 }}>
                            <Label>Name</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }}>
                            <Label>Logo</Label>
                            <Right>
                                <Button onPress={this.uploadLogo.bind(this)} title="Upload Image"
                                        color="#841584"
                                        accessibilityLabel="Choose Company Logo" />
                            </Right>
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }}>
                            <Label>Website</Label>
                            <Input />
                        </Item>

                        <Button block style={{ margin: 15 }}>
                            <Text>Add Company</Text>
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