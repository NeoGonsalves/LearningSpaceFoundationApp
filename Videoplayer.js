import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const VideoPlayer = forwardRef((props, ref) => {
  const video = useRef(null);

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
    },
  }));

  // Handle video playback status update
  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      props.onEnd(); // Notify parent component when video ends
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={props.source} // Use props to set video source
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false} // Disable looping for sequential playback
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});

export default VideoPlayer;
