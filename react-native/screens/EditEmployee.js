import React, { Component } from 'react';
import { Container, Header, Content, Text, Form, Item, Input, Label, Button, Right, Left, Icon, Body, Title, Picker } from 'native-base';
import Constants from "../config";
import {Alert, AsyncStorage} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

export default class EditEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinnerVisible: false,
            firstname: props.navigation.getParam('firstname'),
            lastname: props.navigation.getParam('lastname'),
            email: props.navigation.getParam('email'),
            phone: props.navigation.getParam('phone'),
            selected: props.navigation.getParam('companyId', 'No company added'),
            companies: []
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

        try {
            let response = await fetch(Constants.urls.root + 'api/company/view', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.userToken.token
                }
            });
            let responseJson = await response.json();
            this.setState({companies: responseJson});
            console.log("response:", responseJson);
        }catch(e){
            console.log("opt", e);
            Alert.alert(
                "Error",
                "An error occurred, please ensure you are connected to the internet and try again",
                [
                    { text: "Try Again", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }
    }

    _focusInput(inputField) {
        this[inputField]._root.focus();
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    _onSave = async() => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.firstname < 2) {
            Alert.alert(
                "Alert",
                "Please provide a valid firstname",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else if(this.state.lastname < 2) {
            Alert.alert(
                "Alert",
                "Please provide a valid lastname",
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
                    {text: "Ok", onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
        }else{
            this.setState({ spinnerVisible: true });
            try {
                let response = await fetch(Constants.urls.root+'api/employee/edit/'+this.props.navigation.getParam('id'), {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.state.userToken.token
                    },
                    body: JSON.stringify({
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        email: this.state.email,
                        phone: this.state.phone,
                        company: this.state.selected
                    }),
                });
                let responseJson = await response.json();
                console.log("response:", responseJson);
                if(responseJson.status === "success"){
                    this.setState({ spinnerVisible: false });
                    this.props.navigation.navigate('ManageEmployees');
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
            let response = await fetch(Constants.urls.root+'/api/employee/delete/'+this.props.navigation.getParam('id'), {
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
                this.props.navigation.navigate('ManageEmployees');
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
                    <Title>Edit Employee</Title>
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
                            <Label>Firstname</Label>
                            <Input
                                autoCapitalize='none'
                                value={this.state.firstname}
                                onChangeText={(text) => this.setState({ firstname: text })}
                                onSubmitEditing={(event) => {
                                    this._focusInput('lastname')
                                }}/>
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Lastname</Label>
                            <Input
                                getRef={(input) => this.lastname = input}
                                value={this.state.lastname}
                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({ lastname: text })}
                                onSubmitEditing={(event) => {
                                    this._focusInput('email')
                                }} />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Email Address</Label>
                            <Input
                                getRef={(input) => this.email = input}
                                value={this.state.email}
                                autoCapitalize='none'
                                keyboard-type={'email-address'}
                                onChangeText={(text) => this.setState({ email: text })}
                                onSubmitEditing={(event) => {
                                    this._focusInput('phone')
                                }} />
                        </Item>
                        <Item floatingLabel style={{ margin: 15 }} >
                            <Label>Phone Number</Label>
                            <Input
                                getRef={(input) => this.phone = input}
                                value={this.state.phone}
                                autoCapitalize='none'
                                keyboard-type={'phone-pad'}
                                onChangeText={(text) => this.setState({ phone: text })}
                                onSubmitEditing={(event) => {
                                    this._focusInput('company');
                                }} />
                        </Item>
                        <Label
                            style={{ margin: 15 }}>Company</Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select Company"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={{ width: undefined, marginLeft: 15, marginRight: 15}}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            {this.state.companies.map((item, i) => (
                                <Picker.Item key={i} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                        <Button
                            onPress={() => this._onSave()}
                            block style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
                            <Text>Save</Text>
                        </Button>
                        <Button
                            onPress={() => this._onDelete()}
                            block danger style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
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