import React from "react";
import { ListView, AsyncStorage, Alert } from "react-native";
import { Container, Body, Content, Header, Left, Right, List, ListItem, Thumbnail, Button, Text, Icon, Title } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from "../config";
const datas = [
];

export default class ManageCompanies extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
            spinnerVisible: true,
        };
    }
    deleteRow(secId, rowId, rowMap, serveId) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
        this._onDelete(serveId);
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

            let response = await fetch(Constants.urls.root+'api/company/view', {
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
            let response = await fetch(Constants.urls.root+'/api/company/delete/'+id, {
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
                this.props.navigation.navigate('ManageCompanies');
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
                    <Title>Companies</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate("AddCompany")}>
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
                            No company added yet
                        </Text>
                        :
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem thumbnail style={{ paddingLeft: 20 }}>
                                <Left>
                                    {data.logo !== null ? <Thumbnail square source={{ uri: Constants.urls.storageRoot+data.logo }} />
                                        : <Thumbnail square source={require('../assets/avatar_company.png')} />
                                    }
                                </Left>
                                <Body>
                                <Text>{data.name}</Text>
                                <Text note numberOfLines={3}>{data.email+'\n'+data.website}</Text>
                                </Body>
                                <Right>
                                    <Button transparent
                                            onPress={() => this.props.navigation.navigate("EditCompany", {
                                                'id': data.id,
                                                'name': data.name,
                                                'email': data.email,
                                                'website': data.website,
                                                'logo': data.logo})}>
                                        <Text>Edit</Text>
                                    </Button>
                                </Right>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button
                                full
                                info
                                onPress={() => this.props.navigation.navigate('ViewCompany', {
                                    'id': data.id,
                                    'name': data.name,
                                    'email': data.email,
                                    'website': data.website,
                                    'logo': data.logo})}
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
                                onPress={_ => this.deleteRow(secId, rowId, rowMap, data.id)}
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
