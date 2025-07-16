// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const userName = 'Bé Na'; // sau này lấy từ backend hoặc AsyncStorage
  const score = 120;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>🎉 Xin chào, {userName}!</Text>

      <Image
        source={require('../assets/images/hero_kid.png')}
        style={styles.image}
      />

      <Text style={styles.scoreText}>🌟 Bạn đã có {score} điểm!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GameMenu')}
      >
        <Text style={styles.buttonText}>🎮 Bắt đầu chơi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ffb703' }]}
        onPress={() => navigation.navigate('Reward')}
      >
        <Text style={styles.buttonText}>🎥 Xem phần thưởng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcdc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#555',
  },
  button: {
    backgroundColor: '#219ebc',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
