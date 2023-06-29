import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const StartScreen = ({ navigation }) => {
    const handleStartButtonPress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/lampe.png')}
                style={styles.image}
            />
            <View style={styles.overlay}>
                <Text style={styles.title}>Welcome to the</Text>
                <Text style={styles.titleName}>Literature Quiz App!</Text>
                <Text style={styles.text}>Immerse yourself in the fascinating world of books and test your knowledge.{'\n'}{'\n'}Are you ready to take on exciting challenges? Explore the magic and the treasures of literature. Let the curtain rise and delve into captivating stories and masterpieces.{'\n'}{'\n'}Find out how well-versed you are in the realms of literature!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleStartButtonPress}
                >
                    <Text style={styles.buttonText}>Let's go!</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={require('../assets/books.png')}
                style={styles.image2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
        paddingHorizontal: '5%',
        paddingVertical: '10%',
    },
    image: {
        flex: 1,
        width: '130%',
        height: '130%',
        resizeMode: 'contain',
        marginTop: '120%',
        marginRight: '20%',
    },
    image2: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        position: 'absolute',
        left: '10%',
        bottom: '-18%',
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginTop: '40%',
        marginLeft: '15%',
    },
    titleName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: '15%',
    },
    button: {
        backgroundColor: '#DDDDDD',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
        width: '30%',
        left: '1%',
        bottom: '10%',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        padding: 50,
        marginBottom: '35%',
        marginLeft: '2%',
    },
});

export default StartScreen;
