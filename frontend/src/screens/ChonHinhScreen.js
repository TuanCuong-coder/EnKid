// src/screens/ChonHinhScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Tts from 'react-native-tts';
import { chonHinhData } from '../data/chonHinhData';

export default function ChonHinhScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = chonHinhData[currentIndex];

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.speak(currentQuestion.word);
  }, [currentIndex]);

  const handleSelect = option => {
    if (selectedOption !== null) return;

    const correct = option === currentQuestion.correctImage;
    setSelectedOption(option);
    setIsCorrect(correct);

    setTimeout(() => {
      if (currentIndex < chonHinhData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        Alert.alert('🎉 Hoàn thành!', 'Bạn đã hoàn thành trò chơi!');
        navigation.goBack();
      }
    }, 1500);
  };

  const handleReplay = () => {
    Tts.stop();
    Tts.speak(currentQuestion.word);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷 Chọn hình đúng</Text>

      <Text style={styles.word}>{currentQuestion.word}</Text>

      <TouchableOpacity onPress={handleReplay} style={styles.speakerButton}>
        <Text style={styles.speakerText}>🔊 Nghe lại</Text>
      </TouchableOpacity>

      <View style={styles.imageGrid}>
        {currentQuestion.options.map((img, idx) => {
          const isChosen = selectedOption === img;
          let animation = null;

          if (isChosen && isCorrect) animation = 'bounceIn';
          if (isChosen && !isCorrect) animation = 'shake';

          return (
            <Animatable.View key={idx} animation={animation}>
              <TouchableOpacity
                onPress={() => handleSelect(img)}
                style={[
                  styles.imageWrapper,
                  isChosen
                    ? isCorrect
                      ? styles.correct
                      : styles.incorrect
                    : null,
                ]}
              >
                <Image source={img} style={styles.image} />
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fff4',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  word: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  speakerButton: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  speakerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    margin: 8,
    padding: 5,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  correct: {
    borderColor: 'green',
    backgroundColor: '#d0f7c0',
  },
  incorrect: {
    borderColor: 'red',
    backgroundColor: '#ffcdd2',
  },
});
