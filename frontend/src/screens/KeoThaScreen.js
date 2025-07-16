// src/screens/KeoThaScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PanResponder,
  Animated,
  Alert,
} from 'react-native';
import Tts from 'react-native-tts';
import { keoThaData } from '../data/keoThaData';

export default function KeoThaScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [dragWord, setDragWord] = useState('');
  const [dropCorrect, setDropCorrect] = useState(false);
  const [pan] = useState(new Animated.ValueXY());

  const current = keoThaData[index];

  useEffect(() => {
    setDragWord(current.word);
    Tts.speak(current.word);
  }, [index]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gesture) => {
      const dropZone = { x: 100, y: 300, width: 150, height: 150 }; // vị trí hình
      if (
        gesture.moveX > dropZone.x &&
        gesture.moveX < dropZone.x + dropZone.width &&
        gesture.moveY > dropZone.y &&
        gesture.moveY < dropZone.y + dropZone.height
      ) {
        setDropCorrect(true);
        setTimeout(() => {
          if (index < keoThaData.length - 1) {
            setIndex(index + 1);
            setDropCorrect(false);
            pan.setValue({ x: 0, y: 0 });
          } else {
            Alert.alert('🎉 Hoàn thành!', 'Bạn đã hoàn thành trò chơi!');
            navigation.goBack();
          }
        }, 1000);
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧲 Kéo từ vào hình</Text>

      <View style={styles.dropZone}>
        <Image source={current.image} style={styles.image} />
        {dropCorrect && <Text style={styles.correctText}>✅ Đúng rồi!</Text>}
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.draggable]}
      >
        <Text style={styles.word}>{dragWord}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbe0',
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  dropZone: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 50,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  correctText: {
    position: 'absolute',
    bottom: -25,
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  draggable: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#a2e8ff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  word: {
    fontSize: 18,
    fontWeight: '600',
  },
});
