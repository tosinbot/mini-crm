import React, { Component } from 'react';
import {Alert, AsyncStorage} from "react-native";
import { Container, Header, Content, Text, Form, Item, Input, Label, Button, Right, Left, Icon, Body, Title, Picker } from 'native-base';
import Constants from "../config";
import Spinner from "react-native-loading-spinner-overlay";
export default class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinnerVisible: false,
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            company: '',
            selected: 0,
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
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else{
            this.setState({ spinnerVisible: true });
            try {
                let response = await fetch(Constants.urls.root+'api/employee/create', {
                    method: 'POST',
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
                                keyboard-type={'email-address'}
                                autoCapitalize='none'
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
                                keyboard-type={'phone-pad'}
                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({ phone: text })}
                                onSubmitEditing={(event) => {
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
                                style={{ width: undefined, margin: 15}}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {this.state.companies.map((item, i) => (
                                    <Picker.Item key={i} label={item.name} value={item.id} />
                                ))}
                            </Picker>
                        <Button
                            onPress={() => this._onSave()}
                            block style={{ margin: 15 }}>
                            <Text>Add Employee</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }

}