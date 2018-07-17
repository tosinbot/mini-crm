import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Employees from './EmployeesList';
import Companies from './CompaniesList';

export default class Main extends React.Component {
    render() {
        return (
            <Container>
                <Header hasTabs style={{'backgroundColor': '#37474F'}} androidStatusBarColor="#263238">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3 }}>
                    <Title>Mini CRM</Title>
                    </Body>
                    <Right />
                </Header>

                <Tabs>
                    <Tab tabStyle={{'backgroundColor': '#37474F'}}
                         textStyle={{color: '#fff'}}
                         activeTabStyle={{backgroundColor: '#34434a'}}
                         activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
                         heading="Employees">
                        <Employees />
                    </Tab>
                    <Tab tabStyle={{'backgroundColor': '#37474F'}}
                         textStyle={{color: '#fff'}}
                         activeTabStyle={{backgroundColor: '#34434a'}}
                         activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
                         heading="Companies">
                        <Companies />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}