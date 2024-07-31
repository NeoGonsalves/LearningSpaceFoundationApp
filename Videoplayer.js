import React, { useImperativeHandle, useRef, forwardRef, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import courseStruct from './courseStruct.json'; // Import your JSON structure

const VideoPlayer = forwardRef((props, ref) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Use useImperativeHandle to control video playback externally
  useImperativeHandle(ref, () => ({
    play: () => {
      video.current.playAsync();
    },
    pause: () => {
      video.current.pauseAsync();
    },
    stop: () => {
      video.current.stopAsync();
    }
  }));

  // Handle video playback status update
  const onPlaybackStatusUpdate = (status) => {
    setStatus(() => status);
    if (status.didJustFinish) {
      handleNext();
    }
  };

  // Handle moving to the next element in the course structure
  const handleNext = () => {
    const currentElement = courseStruct.elements[currentElementIndex];
    if (currentElement.type === 'Question') {
      // Check if the selected option is correct
      if (selectedOption?.trim() === currentElement.Answer.trim()) {
        // Move to the next element
        if (currentElementIndex < courseStruct.elements.length - 1) {
          setCurrentElementIndex(currentElementIndex + 1);
          setSelectedOption(null);
        } else {
          Alert.alert('Quiz completed!');
        }
      } else {
        Alert.alert('Incorrect answer. Please try again.');
      }
    } else {
      // Move to the next element if not a question
      if (currentElementIndex < courseStruct.elements.length - 1) {
        setCurrentElementIndex(currentElementIndex + 1);
        setSelectedOption(null);
      } else {
        Alert.alert('Course completed!');
      }
    }
  };

  // Handle option selection for questions
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  // Determine the current element from the JSON structure
  const currentElement = courseStruct.elements[currentElementIndex];

  // Render video player if the current element is a video
  if (currentElement.type === 'video') {
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: currentElement.url }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        <Button title="Next" onPress={handleNext} />
      </View>
    );
  }

  // Render quiz questions if the current element is a question
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
          disabled={selectedOption === null} // Ensure an answer is selected
        />
      </View>
    );
  }

  // Fallback render if there are no elements
  return (
    <View style={styles.container}>
      <Text style={styles.question}>No more elements.</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  question: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default VideoPlayer;
