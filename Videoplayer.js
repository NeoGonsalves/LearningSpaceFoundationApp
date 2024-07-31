import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

// Import quiz questions from the JSON file
import quizQuestions from './quizQuestions.json';

const VideoPlayer = forwardRef((props, ref) => {
  const video = useRef(null);
  const [status, setStatus] = React.useState({});
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);

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

  const onPlaybackStatusUpdate = (status) => {
    setStatus(() => status);
    if (status.didJustFinish) {
      handleVideoEnd();
    }
  };

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      Alert.alert('Quiz completed');
    }
  };

  if (showQuiz) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option) => (
          <Button
            key={option}
            title={option}
            onPress={() => handleOptionPress(option)}
            color={selectedOption === option ? 'blue' : 'gray'}
          />
        ))}
        <Button title="Next" onPress={handleNextQuestion} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
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
