import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import Video from './Videoplayer';
import questionsData from './courseStruct.json';

const Course1Screen = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [currentElementIndex, setCurrentElementIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [showVideo, setShowVideo] = React.useState(false);

  // Extract elements from JSON
  const elements = questionsData.elements;

  const onPlaybackStatusUpdate = (status) => {
    setStatus(() => status);
    if (status.didJustFinish) {
      handleVideoEnd();
    }
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setCurrentElementIndex(currentElementIndex + 1); // Move to the next question after video
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentElement = elements[currentElementIndex];

    if (currentElement.type === 'Question') {
      // Trim and normalize both selectedOption and correct Answer for comparison
      const normalizedSelectedOption = selectedOption?.trim().toLowerCase();
      const normalizedCorrectAnswer = currentElement.Answer.trim().toLowerCase();

      console.log('Selected:', normalizedSelectedOption);
      console.log('Correct:', normalizedCorrectAnswer);

      if (normalizedSelectedOption === normalizedCorrectAnswer) {
        // Correct answer, proceed to the next element
        setCurrentElementIndex(currentElementIndex + 1);
        setSelectedOption(null);
      } else {
        Alert.alert('Wrong answer, please try again.');
      }
    }
  };

  const currentElement = elements[currentElementIndex];

  // Render Question
  if (currentElement.type === 'Question' && !showVideo) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>{currentElement.Question}</Text>
        {currentElement.Answers.map((option) => (
          <Button
            key={option}
            title={option}
            onPress={() => handleOptionPress(option)}
            color={selectedOption === option ? 'blue' : 'gray'}
          />
        ))}
        <Button title="Next" onPress={handleNext} />
      </View>
    );
  }

  // Render Video
  if (currentElement.type === 'video' || showVideo) {
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: currentElement.url,
          }}
          useNativeControls
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          isLooping={false}
        />
        <Button title="Proceed to Next" onPress={handleVideoEnd} disabled={!status.didJustFinish} />
      </View>
    );
  }

  return null; // In case there's an issue, return null (or handle it as needed)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
});

export default Course1Screen;
