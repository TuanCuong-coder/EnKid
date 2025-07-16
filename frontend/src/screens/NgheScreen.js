// screens/NgheScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { ngheData } from '../data/ngheData';
import Tts from 'react-native-tts';
import * as Animatable from 'react-native-animatable';

export default function NgheScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const question = ngheData[index];

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.speak(question.correct);
  }, [index]);

  const handleSelect = word => {
    if (selected) return;

    const correct = word === question.correct;
    setSelected(word);
    setIsCorrect(correct);

    setTimeout(() => {
      if (index < ngheData.length - 1) {
        setIndex(index + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        Alert.alert('🎉 Hoàn thành!', 'Bạn đã hoàn thành trò chơi!');
        navigation.goBack();
      }
    }, 1500);
  };

  const replaySound = () => {
    Tts.stop();
    Tts.speak(question.correct);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔊 Nghe và chọn hình</Text>

      <TouchableOpacity onPress={replaySound} style={styles.speaker}>
        <Text style={styles.speakerText}>🗣️ Nghe lại</Text>
      </TouchableOpacity>

      <View style={styles.optionGrid}>
        {question.options.map((item, idx) => {
          const isChosen = selected === item.word;

          let animation = null;
          if (isChosen && isCorrect) animation = 'bounceIn';
          if (isChosen && !isCorrect) animation = 'shake';

          return (
            <Animatable.View key={idx} animation={animation}>
              <TouchableOpacity
                style={[
                  styles.option,
                  isChosen
                    ? isCorrect
                      ? styles.correct
                      : styles.incorrect
                    : null,
                ]}
                onPress={() => handleSelect(item.word)}
              >
                <Image source={item.image} style={styles.image} />
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
    backgroundColor: '#fffdf1',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  speaker: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#90e0ef',
    borderRadius: 10,
  },
  speakerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  option: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  correct: {
    borderColor: 'green',
    backgroundColor: '#d0f0c0',
  },
  incorrect: {
    borderColor: 'red',
    backgroundColor: '#fdd',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
