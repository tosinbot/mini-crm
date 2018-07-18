import React, {Component} from "react";
import { AppRegistry, Image, StatusBar, Platform, StyleSheet, Dimensions } from "react-native";
import { Container, Content, Text, List, ListItem, Left, Icon } from "native-base";

const drawerCover = require("../assets/drawer-cover.png");
const drawerImage = require("../assets/logo-kitchen-sink.png");
const routes =  [
    {
        name: "Companies/Employees",
        route: "Main",
        icon: "md-filing"
    },
    {
        name: "Add Company",
        route: "AddCompany",
        icon: "md-add"
    },
    {
        name: "Manage Companies",
        route: "ManageCompanies",
        icon: "md-list"
    },
    {
        name: "Add Employee",
        route: "AddEmployee",
        icon: "person-add"
    },
    {
        name: "Manage Employees",
        route: "ManageEmployees",
        icon: "md-create"
    },
    {
        name: "Logout",
        route: "Login",
        icon: "md-power"
    }

    ];


export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        };
    }

    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
                >
                    <Image source={drawerCover} style={styles.drawerCover} />
                    <Image square style={styles.drawerImage} source={drawerImage} />

                    <List
                        dataArray={routes}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                onPress={() => this.props.navigation.navigate(data.route)}
                            >
                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        style={{ color: "#777", fontSize: 26, width: 30 }}
                                    />
                                    <Text style={styles.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }

}
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    drawerCover: {
        alignSelf: "stretch",
        height: deviceHeight / 3.5,
        width: null,
        position: "relative",
        marginBottom: 10
    },
    drawerImage: {
        position: "absolute",
        left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
        top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
        width: 210,
        height: 75,
        resizeMode: "cover"
    },
    text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
    }
})
