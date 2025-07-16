// screens/KeoThaScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Draggable from 'react-native-draggable';
import { keoThaData } from '../data/keoThaData';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function KeoThaScreen({ navigation }) {
  const [dropped, setDropped] = useState([]);
  const data = keoThaData[0];

  const handleDrop = (word, targetWord) => {
    const alreadyDropped = dropped.find(d => d.word === word);
    if (alreadyDropped) return;

    const isCorrect = word === targetWord;
    setDropped(prev => [...prev, { word, targetWord, isCorrect }]);

    if (dropped.length + 1 === data.pairs.length) {
      setTimeout(() => {
        const allCorrect = dropped.every(d => d.isCorrect) && isCorrect;
        if (allCorrect) {
          Alert.alert('🎉 Hoàn thành!', 'Bạn đã ghép đúng tất cả!');
          navigation.goBack();
        } else {
          Alert.alert('😢 Thử lại!', 'Một số từ chưa đúng!');
        }
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Kéo từ vào đúng hình</Text>

      <View style={styles.targets}>
        {data.pairs.map((item, index) => (
          <View key={index} style={styles.targetBox}>
            <Image source={item.image} style={styles.image} />
            <TouchableOpacity
              style={styles.dropZone}
              onLayout={e => {
                item.dropLayout = e.nativeEvent.layout;
              }}
              onPressIn={() => {}}
            >
              <Text style={styles.dropText}>
                {dropped.find(d => d.targetWord === item.word)?.word ||
                  '⬇️ Thả vào đây'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.draggables}>
        {data.pairs.map((item, index) => {
          const isDropped = dropped.find(d => d.word === item.word);
          if (isDropped) return null;

          return (
            <Draggable
              key={index}
              x={20 + index * 100}
              y={500}
              renderSize={80}
              renderColor="#90e0ef"
              renderText={item.word}
              isCircle
              onShortPressRelease={() => {}}
              onDragRelease={(e, gestureState, bounds) => {
                data.pairs.forEach(target => {
                  const layout = target.dropLayout;
                  if (!layout) return;

                  const insideX =
                    bounds.left > layout.x &&
                    bounds.left < layout.x + layout.width;
                  const insideY =
                    bounds.top > layout.y &&
                    bounds.top < layout.y + layout.height;

                  if (insideX && insideY) {
                    handleDrop(item.word, target.word);
                  }
                });
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ee',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  targets: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  targetBox: {
    alignItems: 'center',
    width: 100,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  dropZone: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    width: 90,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  dropText: {
    fontSize: 14,
    textAlign: 'center',
  },
  draggables: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
