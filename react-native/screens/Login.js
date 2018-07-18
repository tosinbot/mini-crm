import React, { Component } from "react";
import { ImageBackground, View, StatusBar, StyleSheet, Dimensions, Platform, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Input,
    Body,
    Left,
    Right,
    Icon,
    Form,
    Text } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from '../config';

const launchscreenBg = require("../assets/launchscreen-bg.png");
const launchscreenLogo = require("../assets/logo-kitchen-sink.png");






export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authType: 1,
            spinnerVisible: false,
            name: '',
            email: '',
            password: '',
        }
    }

    _onLogin = async() => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.email < 2) {
            Alert.alert(
                "Alert",
                "Please provide a valid email address",
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
        }else if(this.state.password < 2){
            Alert.alert(
                "Alert",
                "Please provide a valid password",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else{

            this.setState({ spinnerVisible: true });
            try {
                let response = await fetch(Constants.urls.root+'api/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                    }),
                });
                let responseJson = await response.json();
                console.log("response:", responseJson);
                if(responseJson.status === "success"){
                    await AsyncStorage.setItem('api/user', JSON.stringify({token: responseJson.data.token}));
                    this.setState({ spinnerVisible: false });
                    this.props.navigation.navigate("Main");
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


    _onRegister = async() => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.name < 2) {
            Alert.alert(
                "Alert",
                "Please provide a valid name",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else if(this.state.email < 2) {
            Alert.alert(
                "Alert",
                "Please provide a valid email address",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else if(!reg.test(this.state.email)) {
            Alert.alert(
                "Alert",
                "Please enter a valid email address",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else if(this.state.password < 2){
            Alert.alert(
                "Alert",
                "Please enter a valid password",
                [
                    { text: "Ok", onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            )
        }else{

            this.setState({ spinnerVisible: true });
            try {
                let response = await fetch(Constants.urls.root+'api/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                    }),
                });
                let responseJson = await response.json();
                console.log("response:", responseJson);
                if(responseJson.status === "success"){
                    await AsyncStorage.setItem('api/user', JSON.stringify({token: responseJson.data.token}));
                    this.setState({ spinnerVisible: false });
                    this.props.navigation.navigate("Main");
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
                    "An error occurred, please try later",
                    [
                        { text: "Try Again", onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                )
                console.log("caught", error)
            }

        }

    }


    changeForm = (data) => {
        this.setState({ authType: data });
    }




    render() {
        return (
            <Container style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={"#37474F"} />
                <Spinner visible={this.state.spinnerVisible}
                         textStyle={{ color: '#8bb4c2', fontSize: 16, marginTop: -30 }}
                         color={'#8bb4c2'}
                         textContent={'Logging In'} />
                <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
                    <View style={styles.logoContainer}>
                        <ImageBackground source={launchscreenLogo} style={styles.logo} />
                    </View>
                    <Content>
                        {this.state.authType == 1 ? <Form style={{ paddingLeft: 10, paddingRight: 10}}>
                            <Item>
                                <Input style={{color: "#ffffff" }}
                                       placeholderTextColor="#ffffff"
                                       placeholder="Email Address"
                                       keyboard-type={'email-address'}
                                       autoCapitalize='none'
                                       onChangeText={(text) => this.setState({ email: text })}
                                       onSubmitEditing={(event) => {
                                           this.refs.password._root.focus();
                                       }}/>
                            </Item>
                            <Item>
                                <Input ref={'password'}
                                       style={{color: "#ffffff" }}
                                       placeholderTextColor="#ffffff"
                                       autoCapitalize='none'
                                       secureTextEntry={true}
                                       placeholder="Password"
                                       onChangeText={(text) => this.setState({ password: text })}
                                       onSubmitEditing={(event) => {
                                           this._onLogin();
                                       }}/>
                            </Item>
                        </Form> : <Form style={{ paddingLeft: 10, paddingRight: 10}}>
                            <Item>
                                <Input
                                    style={{color: "#ffffff" }}
                                    placeholderTextColor="#ffffff"
                                    placeholder="Full Name"
                                    onChangeText={(text) => this.setState({ name: text })}
                                    onSubmitEditing={(event) => {
                                        this.refs.email._root.focus();
                                    }}
                                    />
                            </Item>
                            <Item>
                                <Input ref="email"
                                        style={{color: "#ffffff" }}
                                       placeholderTextColor="#ffffff"
                                       placeholder="Email Address"
                                       keyboard-type={'email-address'}
                                       onChangeText={(text) => this.setState({ email: text })}
                                       onSubmitEditing={(event) => {
                                           this.refs.passwordReg._root.focus();
                                       }} />
                            </Item>
                            <Item>
                                <Input ref="passwordReg"
                                       style={{color: "#ffffff" }}
                                       placeholderTextColor="#ffffff"
                                       placeholder="Password"
                                       secureTextEntry
                                       onChangeText={(text) => this.setState({ password: text })}
                                       onSubmitEditing={(event) => {

                                       }}/>
                            </Item>

                        </Form> }
                        {this.state.authType == 1 ?
                        <Button block style={{ marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 20, backgroundColor: "#049053" }}
                                onPress={() => this._onLogin()}
                        >
                            <Text>Login</Text>
                        </Button> :
                            <Button block style={{ marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 20, backgroundColor: "#049053" }}
                                    onPress={() => this._onRegister()}
                            >
                                <Text>Register</Text>
                            </Button>

                        }
                        <View style={{paddingRight: 20, paddingLeft: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={this.state.authType == 1 ? () =>this.changeForm('2') : () =>this.changeForm('1')}>
                                <Text style={{color: "#ffffff"}} >{this.state.authType == 1 ? 'New Account?' : 'Login'} </Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width: null,
        height: null
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 12,
        // marginBottom: 30
    },
    logo: {
        position: "absolute",
        left: Platform.OS === "android" ? 40 : 50,
        top: Platform.OS === "android" ? 35 : 60,
        width: 280,
        height: 100,
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    },
    text2: {
        color: "#fde428",
        bottom: 6,
        marginTop: 5,
    }
})