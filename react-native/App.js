import React, { Component } from "react";
import Login from "./screens/Login";
import Main from "./screens/Main";
import AddCompany from "./screens/AddCompany";
import AddEmployee from "./screens/AddEmployee";
import ManageCompanies from "./screens/ManageCompanies";
import ManageEmployees from "./screens/ManageEmployees";
import EditCompany from "./screens/EditCompany";
import EditEmployee from "./screens/EditEmployee";
import ViewCompany from "./screens/ViewCompany";
import ViewEmployee from "./screens/ViewEmployee";
import SideBar from "./screens/SideBar";
import { DrawerNavigator, StackNavigator  } from "react-navigation";

const drawer1 = StackNavigator(
    {
        Login: { screen: Login,
            navigationOptions: ({navigation}) => ({
                drawerLockMode: 'locked-closed'
            })
        },
        Main: { screen: Main },
        AddCompany: { screen: AddCompany },
        AddEmployee: { screen: AddEmployee },
        ManageCompanies: { screen: ManageCompanies },
        ManageEmployees: { screen: ManageEmployees },
        EditCompany: { screen: EditCompany },
        EditEmployee: { screen: EditEmployee },
        ViewCompany: { screen: ViewCompany },
        ViewEmployee: { screen: ViewEmployee },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }

);

const HomeScreenRouter = DrawerNavigator(
    {
        drawer1: { screen: drawer1 }
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default HomeScreenRouter;