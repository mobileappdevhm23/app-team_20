import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScoreScreen = ({ navigation }) => {
  const [quizScores, setQuizScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const scores = await AsyncStorage.getItem('quizScores');
      const parsedScores = scores ? JSON.parse(scores) : [];
      setQuizScores(parsedScores);
    } catch (error) {
      console.log(error);
    }
  };

  const getScoreColor = (score) => {
    if (score <= 3) {
      return {
        backgroundColor: '#C6566B',
        borderRadius: 20,
        padding: 10,
      };
    } else if (score >= 4 && score <= 7) {
      return {
        backgroundColor: '#EDB74A',
        borderRadius: 20,
        padding: 10,
      };
    } else {
      return {
        backgroundColor: '#66A07D',
        borderRadius: 20,
        padding: 10,
      };
    }
  };

  const renderScores = () => {
    return quizScores.slice().reverse().map((item, index) => (
      <View key={index} style={[styles.scoreItem, getScoreColor(item.score)]}>
        <View style={styles.leftColumn}>
          <Text style={styles.difficultyText}>{item.difficulty && item.difficulty.toUpperCase()}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.scoreText}>
            {item.score}/{item.totalQuestions}
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quiz Scores</Text>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {quizScores.length === 0 ? (
            <Text style={styles.text}>There are no scores available yet.{'\n'}Take a quiz first!</Text>
        ) : (
          renderScores()
        )}
      </ScrollView>
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
    backgroundColor: '#f4f4f4',
  },
  contentContainer: {
    padding: '10%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '20%',
    marginLeft: '10%',
  },
  scoreItem: {
    flexDirection: 'row',
    marginBottom: '11%',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: '10%'
  },
  difficultyText: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginLeft: '10%'
  },
  dateText: {
    fontSize: 18,
    marginLeft: '10%'
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
  navigationButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'left'
  },
});

export default ScoreScreen;
