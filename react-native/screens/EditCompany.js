import React, { Component } from 'react';
import { Container, Header, Content, Text, Form, Item, Input, Label, Button, Right, Left, Icon, Body, Title } from 'native-base';
import {Alert, AsyncStorage, ListView} from "react-native";
import Constants from "../config";
import Spinner from "react-native-loading-spinner-overlay";

export default class EditCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinnerVisible: false,
            name: props.navigation.getParam('name'),
            email: props.navigation.getParam('email'),
            website: props.navigation.getParam('website'),
        };
    }

    componentDidMount = async() => {
        try {
            const value = await AsyncStorage.getItem('api/user');
            if (value !== null) {
                console.log("token", value);
                this.setState({ userToken: JSON.parse(value) });
            }
        } catch (error) {
            this.props.navigation.navigate("Login");
            Alert.alert(
                "Error",
                "Your session expired, please login again",
                [
                    {text: "Ok", onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }
    }

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    _onSave = async() => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.name < 2) {
            Alert.alert(
                "Alert",
                "Please provide a valid company name",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else if(!reg.test(this.state.email)) {
            Alert.alert(
                "Alert",
                "Please provide a valid email address",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else{
            this.setState({ spinnerVisible: true });
            try {
                let response = await fetch(Constants.urls.root+'api/company/edit/'+this.props.navigation.getParam('id'), {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.state.userToken.token
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        website: this.state.website,
                    }),
                });
                let responseJson = await response.json();
                console.log("response:", responseJson);
                if(responseJson.status === "success"){
                    this.setState({ spinnerVisible: false });
                    this.props.navigation.navigate('ManageCompanies');
                    Alert.alert(
                        "Success",
                        responseJson.message,
                        [
                            { text: "Ok", onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    )
                }else{
                    this.setState({ spinnerVisible: false });
                    Alert.alert(
                        "Error",
                        responseJson.message,
                        [
                            { text: "Try Again", onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    )
                }
            } catch (error) {
                this.setState({ spinnerVisible: false });
                Alert.alert(
                    "Error",
                    "An error occurred, please ensure you are connected to the internet and try again",
                    [
                        { text: "Try Again", onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                )
                console.log("caught", error)
            }

        }

    }

    _onDelete = async() => {
            this.setState({ spinnerVisible: true });
            try {
                let response = await fetch(Constants.urls.root+'/api/company/delete/'+this.props.navigation.getParam('id'), {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.state.userToken.token
                    },
                });
                let responseJson = await response.json();
                console.log("response:", responseJson);
                if(responseJson.status === "success"){
                    this.setState({ spinnerVisible: false });
                    this.props.navigation.navigate('ManageCompanies');
                    Alert.alert(
                        "Success",
                        responseJson.message,
                        [
                            { text: "Ok", onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    )
                }else{
                    this.setState({ spinnerVisible: false });
                    Alert.alert(
                        "Error",
                        responseJson.message,
                        [
                            { text: "Try Again", onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                    )
                }
            } catch (error) {
                this.setState({ spinnerVisible: false });
                Alert.alert(
                    "Error",
                    "An error occurred, please ensure you are connected to the internet and try again",
                    [
                        { text: "Try Again", onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                )
                console.log("caught", error)
            }

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
                    <Title>Edit Company</Title>
                    </Body>
                    <Right />
                </Header>
                <Spinner visible={this.state.spinnerVisible}
                         textStyle={{ color: '#8bb4c2', fontSize: 16, marginTop: -30 }}
                         color={'#8bb4c2'}
                         textContent={'Please wait...'} />
                <Content padder>
                    <Form>
                        <Item floatingLabel style={{ margin: 15 }}>
                            <Label>Name</Label>
                            <Input
                                autoCapitalize='none'
                                value={this.state.name}
                                onChangeText={(text) => this.setState({ name: text })}
                                onSubmitEditing={(event) => {
                                    this._focusInput('email')
                                }}/>
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Email</Label>
                            <Input
                                getRef={(input) => this.email = input}
                                value={this.state.email}
                                autoCapitalize='none'
                                keyboard-type={'email-address'}
                                onChangeText={(text) => this.setState({ email: text })}
                                onSubmitEditing={(event) => {
                                    this._focusInput('website')
                                }} />
                        </Item>
                        {/*<Item floatingLabel style={{ margin: 15 }}>*/}
                            {/*<Label>Logo</Label>*/}
                            {/*<Right>*/}
                                {/*<Button onPress={this.uploadLogo.bind(this)} title="Upload Image"*/}
                                        {/*color="#841584"*/}
                                        {/*accessibilityLabel="Choose Company Logo" />*/}
                            {/*</Right>*/}
                        {/*</Item>*/}
                        <Item floatingLabel style={{ margin: 15 }}>
                            <Label>Website</Label>
                            <Input
                                getRef={(input) => this.website = input}
                                value={this.state.website}
                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({ website: text })}
                                onSubmitEditing={(event) => {
                                }}/>
                        </Item>

                        <Button
                            onPress={() => this._onSave()}
                            block style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                            <Text>Save</Text>
                        </Button>
                        <Button
                            onPress={() => this._onDelete()}
                            block danger style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Text>Delete Company</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }


    // uploadLogo() {
    //     FilePickerManager.showFilePicker(null, (response) => {
    //         console.log('Response = ', response);
    //
    //         if (response.didCancel) {
    //             console.log('User cancelled file picker');
    //         }
    //         else if (response.error) {
    //             console.log('FilePickerManager Error: ', response.error);
    //         }
    //         else {
    //             this.setState({
    //                 file: response
    //             });
    //         }
    //     });
    // }
}