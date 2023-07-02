import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose a level!</Text>
      <View style={styles.buttonContainerDifficulty}>
        <TouchableOpacity
          style={styles.buttonDifficultyEasy}
          onPress={() => navigation.navigate('Quiz', { difficulty: 'easy' })}
        >
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDifficultyMedium}
          onPress={() => navigation.navigate('Quiz', { difficulty: 'medium' })}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDifficultyHard}
          onPress={() => navigation.navigate('Quiz', { difficulty: 'hard' })}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationBar}>
      <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.NavbuttonText2}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Score')}
        >
          <Text style={styles.NavbuttonText}>Score</Text>
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
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainerDifficulty: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDifficultyEasy: {
    backgroundColor: '#66A07D',
    paddingVertical: 40,
    width: '48%',
    borderRadius: 20,
    margin: 10,
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
  buttonDifficultyMedium: {
    backgroundColor: '#EDB74A',
    paddingVertical: 40,
    width: '48%',
    borderRadius: 20,
    margin: 10,
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
  buttonDifficultyHard: {
    backgroundColor: '#C6566B',
    paddingVertical: 40,
    width: '48%',
    borderRadius: 20,
    margin: 10,
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
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
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
    backgroundColor: '#f0f0f0'
  },
  NavbuttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  NavbuttonText2: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default HomeScreen;