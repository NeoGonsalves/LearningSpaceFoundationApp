import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
const itemWidth = width / 2;

export default function TileScrollingReanimated() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.x;
  });

  const images = [
    { id: 1, source: require('./App/assets/blog.jpeg') },
    { id: 2, source: require('./App/assets/Csa.png') },
    { id: 3, source: require('./App/assets/Newsletter.jpg') },
    { id: 4, source: require('./App/assets/blog.jpeg') },
  ];

  return (
    <View style={styles.flex}>
      <Animated.FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => <Item index={index} scrollY={scrollY} imageSource={item.source} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        snapToInterval={itemWidth}
        onScroll={scrollHandler}
        decelerationRate="fast"
      />
    </View>
  );
}

function Item({ index, scrollY, imageSource }) {
  const itemScaleStyle = useAnimatedStyle(() => {
    const input = [
      index * itemWidth - itemWidth,
      index * itemWidth,
      index * itemWidth + itemWidth,
    ];
    const output = [0.8, 1, 0.8];
    const clamp = {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    };
    return {
      transform: [{ scale: interpolate(scrollY.value, input, output, clamp) }],
    };
  });

  const handlePress = () => {
    console.log(`Tile ${index + 1} pressed`);
    // Add any other functionality here, such as navigation or state updates
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.item, itemScaleStyle]}>
        <Image source={imageSource} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    height: itemWidth,
    width: itemWidth,
    backgroundColor: 'tan',
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  list: {
    alignItems: 'center',
    paddingHorizontal: (width - itemWidth) / 2,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
