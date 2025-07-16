// screens/RewardScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import { rewardVideos } from '../data/rewardVideos';

export default function RewardScreen() {
  const [userPoints] = useState(120); // giả lập, sau lấy từ API hoặc AsyncStorage

  const handleWatch = (youtubeId, requiredPoints) => {
    if (userPoints >= requiredPoints) {
      const url = `https://www.youtube.com/watch?v=${youtubeId}`;
      Linking.openURL(url);
    } else {
      alert(`Bạn cần ít nhất ${requiredPoints} điểm để xem video này!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Phần thưởng của bạn</Text>
      <FlatList
        data={rewardVideos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.videoItem,
              userPoints >= item.requiredPoints
                ? styles.unlocked
                : styles.locked,
            ]}
            onPress={() => handleWatch(item.youtubeId, item.requiredPoints)}
          >
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoStatus}>
              {userPoints >= item.requiredPoints
                ? '🔓 Đã mở khóa'
                : `🔒 Cần ${item.requiredPoints} điểm`}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  videoItem: {
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
  },
  unlocked: {
    backgroundColor: '#d0f0c0',
    borderColor: 'green',
  },
  locked: {
    backgroundColor: '#ffe0e0',
    borderColor: 'red',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoStatus: {
    fontSize: 14,
    marginTop: 4,
  },
});
