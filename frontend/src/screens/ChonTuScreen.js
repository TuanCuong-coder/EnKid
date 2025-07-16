// screens/ChonTuScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { chonTuData } from '../data/chonTuData';
import * as Animatable from 'react-native-animatable';
import Tts from 'react-native-tts';

export default function ChonTuScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const question = chonTuData[currentIndex];

  // Phát âm từ khi load câu hỏi mới
  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.speak(question.correct);
  }, [currentIndex]);

  const handleSelect = word => {
    if (selectedWord) return;

    const correct = word === question.correct;
    setSelectedWord(word);
    setIsCorrect(correct);

    setTimeout(() => {
      if (currentIndex < chonTuData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedWord(null);
        setIsCorrect(null);
      } else {
        Alert.alert('🎉 Hoàn thành!', 'Bạn đã hoàn thành trò chơi!');
        navigation.goBack();
      }
    }, 1500);
  };

  const handleReplay = () => {
    Tts.stop();
    Tts.speak(question.correct);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✍️ Chọn từ đúng</Text>

      <Image source={question.image} style={styles.image} />

      <TouchableOpacity onPress={handleReplay} style={styles.speakerButton}>
        <Text style={styles.speakerText}>🔊 Nghe lại</Text>
      </TouchableOpacity>

      <View style={styles.optionWrapper}>
        {question.options.map((word, index) => {
          const isChosen = selectedWord === word;
          const correctChoice = word === question.correct;

          let animation = null;
          if (isChosen && isCorrect) animation = 'bounceIn';
          if (isChosen && !isCorrect) animation = 'shake';

          return (
            <Animatable.View key={index} animation={animation}>
              <TouchableOpacity
                style={[
                  styles.option,
                  isChosen
                    ? isCorrect
                      ? styles.correct
                      : styles.incorrect
                    : null,
                ]}
                onPress={() => handleSelect(word)}
              >
                <Text style={styles.optionText}>{word}</Text>
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
    backgroundColor: '#fff7e6',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  speakerButton: {
    backgroundColor: '#cce5ff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  speakerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  option: {
    width: '85%',
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#aaa',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  correct: {
    backgroundColor: '#c8f7c5',
    borderColor: 'green',
  },
  incorrect: {
    backgroundColor: '#ffcdd2',
    borderColor: 'red',
  },
});
