import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScoreScreen = ({ navigation }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        try {
            const storedScores = await AsyncStorage.getItem('quizScores');
            if (storedScores) {
                const parsedScores = JSON.parse(storedScores);
                setScores(parsedScores);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            {scores.length > 0 ? (
                <View>
                    <Text style={styles.title}>Quiz Scores:</Text>
                    {scores.map((score, index) => (
                        <View key={index} style={styles.scoreItem}>
                            <Text style={styles.scoreText}>
                                Score: {score.score + 1}/{score.totalQuestions}
                            </Text>
                        </View>
                    ))}
                </View>
            ) : (
                <Text>No quiz scores available.</Text>
            )}
            <View style={styles.navigationBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Score')}>
                    <Text style={styles.buttonText}>Score</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scoreItem: {
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 18,
    },
    navigationBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#DDDDDD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#333333',
    },
});

export default ScoreScreen;
