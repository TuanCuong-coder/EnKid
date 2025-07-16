// screens/GameMenuScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

export default function GameMenuScreen({ navigation }) {
  const games = [
    {
      id: 1,
      name: 'Chọn hình đúng',
      icon: require('../assets/images/icon_chonhinh.png'),
      screen: 'ChonHinh',
    },
    {
      id: 2,
      name: 'Chọn từ đúng',
      icon: require('../assets/images/icon_chontu.png'),
      screen: 'ChonTu', // chưa tạo, sau sẽ thêm
    },
    {
      id: 3,
      name: 'Kéo thả',
      icon: require('../assets/images/icon_keotha.png'),
      screen: 'KeoTha', // chưa tạo
    },
    {
      id: 4,
      name: 'Nghe rồi chọn',
      icon: require('../assets/images/icon_nghe.png'),
      screen: 'Nghe', // chưa tạo
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🕹️ Chọn một trò chơi</Text>

      {games.map(game => (
        <TouchableOpacity
          key={game.id}
          style={styles.gameButton}
          onPress={() => navigation.navigate(game.screen)}
        >
          <Image source={game.icon} style={styles.icon} />
          <Text style={styles.gameText}>{game.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gameButton: {
    backgroundColor: '#8ecae6',
    width: '85%',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  gameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
