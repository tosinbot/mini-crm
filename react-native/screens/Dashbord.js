import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import { Container, Header, Title, Card, CardItem, Button, Left, Right, Body, Icon, Fab } from 'native-base';



export default class DashbordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
          };
    }

    goToNotePad = async () => {
        this.props.navigation.navigate("Notepad");
    }
    render() {
        return (

            <Container style={{ backgroundColor: "#fcf2f4" }}>
                <Header transparent>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' style={{ color: 'black' }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Title style={{ color: 'black' }}>Dashboard</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={[styles.parent]}>
                    <View style={[styles.child]} >
                        <Card style={{ borderRadius: 8 }}>
                            <CardItem bordered style={styles.cardItem}>
                                <Body>
                                    <Image source={require('../assets/phone-icon.png')} style={styles.logoContainer} />
                                    <Text>Call Report</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={[styles.child]} >
                        <Card style={{ borderRadius: 8 }}>
                            <CardItem bordered style={styles.cardItem}>
                                <Body>
                                    <Image source={require('../assets/calender-icon.png')} style={styles.logoContainer} />
                                    <Text>Calendar</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={[styles.child]}>
                        <Card style={{ borderRadius: 8 }} >
                            <CardItem bordered style={styles.cardItem} button onPress={() => this.props.navigation.navigate("Notepad")}>
                                <Body>
                                    <Image source={require('../assets/note-icon.png')} style={styles.logoContainer} />
                                    <Text>NotePad</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    
                </View>
                <View style={{ flex: 1 }}>
                        <Fab
                            active={this.state.active}
                            containerStyle={{}}
                            style={{ backgroundColor: '#DD5144' }}
                            position="bottomRight"
                            onPress={() => this.setState({ active: !this.state.active })}>
                            <Icon name="search" />
                        </Fab>
                    </View>
            </Container>
        );
    }
}
const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    parent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15
    },
    child: {
        width: '45%',
        margin: '2%',
        aspectRatio: 1,
    },
    logoContainer: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
        // marginBottom: 30
    },
    cardItem: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    }
})