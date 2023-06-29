import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose a level!</Text>
      <View style={styles.buttonContainerDifficulty}>
        <TouchableOpacity
          style={styles.buttonDifficulty}
          onPress={() => navigation.navigate('Quiz', { difficulty: 'easy' })}
        >
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDifficulty}
          onPress={() => navigation.navigate('Quiz', { difficulty: 'medium' })}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDifficulty}
          onPress={() => navigation.navigate('Quiz', { difficulty: 'hard' })}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationBar}>
      <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Score')}
        >
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
  buttonDifficulty: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    width: '48%',
    borderRadius: 20,
    margin: 10
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
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
});

export default HomeScreen;