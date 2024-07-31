import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import VideoPlayer from './Videoplayer'; // Ensure this component is correctly imported
import courseStruct from './courseStruct.json'; // Import the JSON structure

const Course1Screen = () => {
  const videoRef = useRef(null);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNextElement = () => {
    const currentElement = courseStruct.elements[currentElementIndex];
    
    // Handle answer validation and element progression
    if (currentElement.type === 'Question') {
      if (selectedOption?.trim() === currentElement.Answer.trim()) {
        // Move to the next element if the answer is correct
        if (currentElementIndex < courseStruct.elements.length - 1) {
          setCurrentElementIndex(currentElementIndex + 1);
          setSelectedOption(null);
        } else {
          Alert.alert('Course completed!');
        }
      } else {
        Alert.alert('Incorrect answer. Please try again.');
      }
    } else {
      // Move to the next element if it's not a question
      if (currentElementIndex < courseStruct.elements.length - 1) {
        setCurrentElementIndex(currentElementIndex + 1);
        setSelectedOption(null);
      } else {
        Alert.alert('Course completed!');
      }
    }
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const currentElement = courseStruct.elements[currentElementIndex];

  // Conditional rendering based on element type
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
          onPress={handleNextElement}
          disabled={selectedOption === null} // Disable next button until an option is selected
        />
      </View>
    );
  } else if (currentElement.type === 'video') {
    return (
      <VideoPlayer
        ref={videoRef}
        source={{ uri: currentElement.url }}
        onEnd={handleNextElement} // Advance to the next element after video ends
      />
    );
  }

  // Fallback in case no elements are present
  return (
    <View style={styles.container}>
      <Text>No more content available.</Text>
    </View>
  );
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
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Course1Screen;
