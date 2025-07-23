// app/VideoPlayerScreen.js
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const whatsAppGreen = '#075E54';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: whatsAppGreen,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: { marginRight: 16 },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
  },
  videoContainer: {
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'black',
    alignSelf: 'center',
    marginBottom: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  errorText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  chapterText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    backgroundColor: whatsAppGreen,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const VideoPlayerScreen = () => {
  const { videoUrl, title, chapterSummary, imageUrl } = useLocalSearchParams();
  const router = useRouter();

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return (match && match[1] && match[1].length === 11) ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  // Responsive 16:9 aspect ratio
  const videoPlayerWidth = width - 32;
  const videoPlayerHeight = videoPlayerWidth * 9 / 16;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      {/* Chapter Summary */}
      <Text style={styles.chapterText}>{chapterSummary}</Text>

      {/* Image */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* Heading */}
      <Text style={styles.heading}>Watch Video Lesson</Text>

      {/* Video Container */}
      <View
        style={[
          styles.videoContainer,
          { width: videoPlayerWidth, height: videoPlayerHeight }
        ]}
      >
        {videoId ? (
          <YoutubePlayer
            height={videoPlayerHeight}
            width={videoPlayerWidth}
            play={true}
            videoId={videoId}
            onError={(error) => console.error("YouTube Player Error:", error)}
          />
        ) : (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="alert-circle-outline" size={50} color="#FFD700" />
            <Text style={styles.errorText}>
              Video not available or invalid URL. Please check the video link.
            </Text>
          </View>
        )}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/ChatbotScreen')}
        >
          <Text style={styles.buttonText}>Chat with AI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back to Chapter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VideoPlayerScreen;
