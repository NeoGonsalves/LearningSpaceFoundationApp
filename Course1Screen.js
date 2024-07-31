import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import VideoPlayer from './Videoplayer'; // Ensure the path is correct
import courseStruct from './courseStruct.json'; // Import the JSON structure

const Course1Screen = () => {
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Get the current element from the JSON data
  const currentElement = courseStruct.elements[currentElementIndex];

  // Handle option selection
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  // Move to the next element
  const handleNext = () => {
    if (currentElement.type === 'Question') {
      // Check if the selected option matches the correct answer
      if (selectedOption?.trim() === currentElement.Answer.trim()) {
        // Correct answer, move to the next element
        if (currentElementIndex < courseStruct.elements.length - 1) {
          setCurrentElementIndex(currentElementIndex + 1);
          setSelectedOption(null); // Reset selection for the next question
        } else {
          setQuizCompleted(true);
          Alert.alert('Quiz completed!');
        }
      } else {
        Alert.alert('Incorrect answer. Please try again.');
      }
    } else {
      // Move to the next element if it is not a question
      if (currentElementIndex < courseStruct.elements.length - 1) {
        setCurrentElementIndex(currentElementIndex + 1);
        setSelectedOption(null); // Reset selection
      } else {
        setQuizCompleted(true);
        Alert.alert('Course completed!');
      }
    }
  };

  // Render video
  if (currentElement.type === 'video') {
    return (
      <View style={styles.container}>
        <VideoPlayer
          uri={currentElement.url}
          onEnd={() => handleNext()} // Proceed to next element when video ends
        />
      </View>
    );
  }

  // Render quiz question
  if (currentElement.type === 'Question') {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{currentElement.Question}</Text>
        {currentElement.Answers.map((answer) => (
          <Button
            key={answer}
            title={answer}
            onPress={() => handleOptionPress(answer)}
            color={selectedOption === answer ? 'blue' : 'gray'}
          />
        ))}
        <Button
          title="Next"
          onPress={handleNext}
          disabled={selectedOption === null} // Ensure an answer is selected before proceeding
        />
      </View>
    );
  }

  // Render completion message or any default fallback
  return quizCompleted ? (
    <View style={styles.container}>
      <Text style={styles.question}>Congratulations! You've completed the course.</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Course1Screen;
