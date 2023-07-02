import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const StartScreen = ({ navigation }) => {
    const handleStartButtonPress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.titleName}> Welcome to the {'\n'} Literature Quiz App!</Text>
                <Text style={styles.text}>Immerse yourself in the fascinating world of books and test your knowledge.{'\n'}{'\n'}Are you ready to take on exciting challenges? Explore the magic and the treasures of literature. Let the curtain rise and delve into captivating stories and masterpieces.{'\n'}{'\n'}Find out how well-versed you are in the realms of literature!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleStartButtonPress}
                >
                    <Text style={styles.buttonText}>Let's go!</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={require('../assets/lampe.png')}
                style={styles.image}
            />
            <Image
                source={require('../assets/books.png')}
                style={styles.image2}
            />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Hintergrundfarbe auf Weiß setzen
    },
    image: {
        flex: 1,
        width: '120%',
        height: '120%',
        resizeMode: 'contain',
        marginRight: windowWidth * 0.15,
        top: windowHeight * 0.3,
        zIndex: 1,
    },
    image2: {
        width: windowWidth * 0.6,
        height: windowWidth * 0.6,
        resizeMode: 'contain',
        position: 'absolute',
        left: windowWidth * 0.03,
        top: windowHeight * 0.72,
        zIndex: 2,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight * 0.42
    },
    titleName: {
        fontSize: windowWidth * 0.06,
        fontWeight: 'bold',
        marginLeft: windowWidth * -0.19,
        marginTop: windowHeight * 0.2
    },
    button: {
        backgroundColor: '#f0f0f0',
        borderRadius: windowWidth * 0.1,
        padding: windowHeight * 0.02,
        top: windowHeight * 0.15,
        zIndex: 4,
        ...Platform.select({
            ios: {
              shadowColor: 'rgba(0, 0, 0, 0.35)',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 15,
            },
            android: {
              elevation: 5,
            },
          }),
    },
    buttonText: {
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
    },
    text: {
        fontSize: windowWidth * 0.04,
        padding: windowWidth * 0.18,
        marginLeft: windowWidth * -0.05,
        marginTop: windowHeight * -0.05
    },
});

export default StartScreen;