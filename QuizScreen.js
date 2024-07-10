import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const QuizScreen = () => {
  const questions = [
    { questionText: 'It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?', answerOptions: ['A. Sunday', 'B. Saturday', 'C. Friday', 'D. Friday'], correctAnswer: 'C. Friday' },
    // Add more questions here
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const handleAnswerOptionClick = (answer) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (answer === correctAnswer) {
      if (currentQuestion === 0) {
        setShowVideo(true);
      } else {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          Alert.alert('Quiz Completed', 'You have completed the quiz!');
        }
      }
    } else {
      Alert.alert('Incorrect Answer', 'Try Again!');
    }
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setShowVideo(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</Text>
      </View>
      {!showVideo ? (
        <>
          <Text style={styles.questionText}>{questions[currentQuestion].questionText}</Text>
          {questions[currentQuestion].answerOptions.map((answerOption, index) => (
            <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswerOptionClick(answerOption)}>
              <Text style={styles.answerText}>{answerOption}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <Video
          ref={videoRef}
          source={{ uri: 'https://drive.google.com/uc?id=1DqYfYKfvWVG09LP3ekoWYZaUX8qY7ipk&export=download' }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  progressText: {
    fontSize: 16,
  },
  questionText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  answerText: {
    color: '#fff',
    fontSize: 16,
  },
  video: {
    width: '100%',
    height: 200,
    marginTop: 20,
    backgroundColor: 'black',
  },
});

export default QuizScreen;
