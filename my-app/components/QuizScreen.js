import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizScreen = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const saveScore = async () => {
    try {
      const scores = await AsyncStorage.getItem('quizScores');
      const parsedScores = scores ? JSON.parse(scores) : [];
      const newScore = { score: score, totalQuestions: questions.length }; // Hier wird der Score übergeben
      parsedScores.push(newScore);
      await AsyncStorage.setItem('quizScores', JSON.stringify(parsedScores));
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchQuestions(route.params.difficulty);
  }, []);

  const fetchQuestions = async (difficulty) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=10&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      setQuestions(data.results);
    } catch (error) {
      console.log(error);
    }
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
    return questionText.replaceAll('&quot;', '"').replaceAll('&#039;', '´').replaceAll('&amp; ', '&');
  };

  const cleanAnswerText = (answerText) => {
    return answerText.replaceAll('&quot;', '"').replaceAll('&amp; ', '&').replaceAll('&#039;', '´');
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
              ]}
              onPress={() => handleAnswer(true, 3)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.buttonText}>{cleanedCorrectAnswer}</Text>
            </TouchableOpacity>
          </View>
        </View>
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

  const renderScore = () => (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>
        You scored {score} out of {questions.length}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {showScore ? (
        renderScore()
      ) : (
        <View style={{ flex: 1 }}>{renderQuiz()}</View>
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
  quizContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    padding: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 40,
    width: '48%',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: 'green', // Change to the desired color for the selected answer
  },
  selectedButton2: {
    backgroundColor: 'red', // Change to the desired color for the selected answer
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  navigationButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default QuizScreen;