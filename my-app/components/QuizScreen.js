import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizScreen = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progress, setProgress] = useState(0);

  const saveScore = async () => {
    try {
      const scores = await AsyncStorage.getItem('quizScores');
      const parsedScores = scores ? JSON.parse(scores) : [];
      const newScore = {
        score: score,
        totalQuestions: questions.length,
        difficulty: route.params.difficulty,
        date: new Date().toLocaleDateString(),
      };
      parsedScores.push(newScore);
      await AsyncStorage.setItem('quizScores', JSON.stringify(parsedScores));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchQuestions(route.params.difficulty);
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [currentQuestion]);

  const fetchQuestions = async (difficulty) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=23&category=10&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      const randomizedQuestions = getRandomQuestions(data.results, 10);
      setQuestions(randomizedQuestions);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getRandomQuestions = (questions, count) => {
    if (questions.length <= count) {
      return questions;
    }
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, count);
  };

  const handleAnswer = (isCorrect, index) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(index);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      }, 1000);
    } else {
      setShowScore(true);
      saveScore();
    }
  };

  const cleanQuestionText = (questionText, buttonText) => {
    return questionText
      .replaceAll('&quot;', '"')
      .replaceAll('&#039;', '´')
      .replaceAll('&amp; ', '&')
      .replaceAll('&euml;', 'e')
      .replaceAll('&eacute;', 'e')
      .replaceAll('&rsquo;', '´');
  };

  const cleanAnswerText = (answerText) => {
    return answerText
      .replaceAll('&quot;', '"')
      .replaceAll('&amp; ', '&')
      .replaceAll('&#039;', '´')
      .replaceAll('&euml;', 'e')
      .replaceAll('&eacute;', 'e')
      .replaceAll('&rsquo;', '´');
  };

  const calculateProgress = () => {
    const totalQuestions = questions.length;
    const currentProgress = ((currentQuestion + 1) / totalQuestions) * 100;
    const adjustedProgress = currentProgress - (100 / totalQuestions);
    setProgress(adjustedProgress);
  };

  const renderQuiz = () => {
    if (questions.length === 0) {
      return (
        <View style={styles.quizContainer}>
          <Text>Loading questions...</Text>
        </View>
      );
    }

    const question = questions[currentQuestion];
    if (!question) {
      return (
        <View style={styles.quizContainer}>
          <Text>Oops! Something went wrong.</Text>
        </View>
      );
    }

    const cleanedQuestionText = cleanQuestionText(question.question);
    const cleanedAnswers = question.incorrect_answers.map(cleanAnswerText);
    const cleanedCorrectAnswer = cleanAnswerText(question.correct_answer);

    return (
      <View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
        </View>
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>{cleanedQuestionText}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedAnswer === 0 && styles.selectedButton2,
                ]}
                onPress={() => handleAnswer(false, 0)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.buttonText}>{cleanedAnswers[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedAnswer === 1 && styles.selectedButton2,
                ]}
                onPress={() => handleAnswer(false, 1)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.buttonText}>{cleanedAnswers[1]}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedAnswer === 2 && styles.selectedButton2,
                ]}
                onPress={() => handleAnswer(false, 2)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.buttonText}>{cleanedAnswers[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedAnswer === 3 && styles.selectedButton,
                  selectedAnswer !== null &&
                  !question.incorrect_answers.includes(cleanedCorrectAnswer) &&
                  styles.selectedButton,
                ]}
                onPress={() => handleAnswer(true, 3)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.buttonText}>{cleanedCorrectAnswer}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderScore = () => {
    let imageSource = null;
    if (score <= 3) {
      imageSource = require('../assets/buch-sad.png');
    } else if (score >= 4 && score <= 7) {
      imageSource = require('../assets/buch-normal.png');
    } else {
      imageSource = require('../assets/buch-happy.png');
    }

    return (
      <View style={styles.scoreContainer}>
        <Image source={imageSource} style={styles.scoreImage} />
        <Text style={styles.scoreText}>
          You scored {score} out of {questions.length}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        renderScore()
      ) : (
        <View style={{ flex: 1 }}>{renderQuiz()}</View>
      )}
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.NavbuttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Score')}>
          <Text style={styles.NavbuttonText}>Score</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'white',
  },
  quizContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: '80%',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 30,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 40,
    width: '48%',
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: '#66A07D', // Change to the desired color for the selected answer
  },
  selectedButton2: {
    backgroundColor: '#C6566B', // Change to the desired color for the selected answer
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: windowHeight * 0.3
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: '#f0f0f0',

  },
  navigationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  progressBar: {
    width: '80%',
    height: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#878787',
  },
  progressBarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: windowHeight * 0.1
  },
  scoreImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
  NavbuttonText: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default QuizScreen;
