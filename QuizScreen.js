import React, { useState } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const QuizScreen = () => {
  const questions = [
    { questionText: 'What is Neos Favourite Color ?', answerOptions: ['Black', 'Olive', 'Beige', 'Maroon'], correctAnswer: 'Beige' },
    { questionText: 'Who is Neos Favourive Singer ', answerOptions: ['Travis Scott', 'Kendrik Lemar', 'Em', 'Snoop Dogg'], correctAnswer: 'Em' },
    // Add more questions as needed!
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerOptionClick = (answer) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (answer === correctAnswer) {
        <Video
        source={{ uri: 'https://drive.google.com/uc?id=1DqYfYKfvWVG09LP3ekoWYZaUX8qY7ipk&export=download' }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } 
  };

  return (
    <View>
      <Text>{questions[currentQuestion].questionText} </Text>
      {questions[currentQuestion].answerOptions.map((answerOption) => (
        <Button title={answerOption} onPress={() => handleAnswerOptionClick(answerOption)} />
      ))}
    </View>
  );
  
};
const styles =StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
  },
})

export default QuizScreen;