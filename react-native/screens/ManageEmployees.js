import React from "react";
import {StyleSheet, ListView, AsyncStorage, Alert} from "react-native";
import { Container, Body, Content, Header, Left, Right, List, ListItem, Thumbnail, Button, Text, Icon, Title } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from "../config";

const datas = [];

export default class ManageEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
            spinnerVisible: true,
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

            let response = await fetch(Constants.urls.root+'api/employee/view', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.state.userToken.token
                }
            });
            let responseJson = await response.json()

            this.setState({ spinnerVisible: false });
            this.setState({listViewData: responseJson})
            console.log("response:", responseJson);

        } catch (e) {
            this.setState({spinnerVisible: false});
            Alert.alert(
                "Error",
                "An error occurred, please ensure you are connected to the internet and try again",
                [
                    {text: "Try Again", onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            )
            console.log("caught", e)
        }
    }

    _onDelete = async(id) => {
        // this.setState({ spinnerVisible: true });
        try {
            let response = await fetch(Constants.urls.root+'/api/employee/delete/'+id, {
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
                // this.setState({ spinnerVisible: false });
                console.log("done", responseJson)
            }else{
                // this.setState({ spinnerVisible: false });
                this.props.navigation.navigate('ManageEmployees');
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
            // this.setState({ spinnerVisible: false });
            this.props.navigation.navigate('ManageEmployees');
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

    deleteRow(secId, rowId, rowMap, serveId) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
        this._onDelete(serveId);
    }


    render() {
        return (
            <Container style={styles.container}>
                <Header style={{'backgroundColor': '#37474F'}} androidStatusBarColor="#263238">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                    <Title>Manage Employees</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("AddEmployee")}>
                            <Icon name="add" />
                        </Button>
                    </Right>
                </Header>
                <Spinner visible={this.state.spinnerVisible}
                         textStyle={{ color: '#8bb4c2', fontSize: 16, marginTop: -30 }}
                         color={'#8bb4c2'}/>

                <Content padder>
                    { this.state.listViewData.length < 1 ?
                        <Text style={{textAlign: "center", marginTop: 50 }}>
                            No employee added yet
                        </Text>
                        :
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem thumbnail style={{ paddingLeft: 20 }}>
                            <Left>
                            <Thumbnail source={require('../assets/avatar.png' )} />
                            </Left>
                            <Body>
                            <Text>{data.firstName} {data.lastName}</Text>
                            {data.company === null ? <Text note numberOfLines={3}>
                                {data.email+'\n'+data.phone}
                            </Text> : <Text note numberOfLines={3}>
                                {data.email+'\n'+data.phone+'\n'+ data.company.name }
                            </Text> }
                            </Body>
                            <Right>
                                <Button transparent
                                        onPress={() => this.props.navigation.navigate("EditEmployee", {
                                            'id': data.id,
                                            'firstname': data.firstname,
                                            'lastname': data.lastname,
                                            'company': data.company === null ? null : data.company.name,
                                            'companyId': data.company === null ? null : data.company.id,
                                            'email': data.email,
                                            'phone': data.phone})}>
                                    <Text>Edit</Text>
                                </Button>
                            </Right>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button
                                full
                                info
                                onPress={() => this.props.navigation.navigate("ViewEmployee", {
                                    'id': data.id,
                                    'firstname': data.firstname,
                                    'lastname': data.lastname,
                                    'company': data.company === null ? null : data.company.name,
                                    'companyId': data.company === null ? null : data.company.id,
                                    'email': data.email,
                                    'phone': data.phone})}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Icon active name="information-circle" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button
                                full
                                danger
                                onPress={() => this.deleteRow(secId, rowId, rowMap, data.id)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Icon active name="trash" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    /> }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    mb: {
        marginBottom: 15
    }
})
