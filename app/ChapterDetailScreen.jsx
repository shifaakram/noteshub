// app/ChapterDetailScreen.jsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const whatsAppGreen = '#075E54';

const iconBgColors = {
  notes: '#007BFF',      // Blue for Notes
  handwritten: '#FFA500', // Orange for Handwritten Notes
  video: '#8A2BE2',      // Blue Violet for Video
  chatbot: '#28A745',    // Green for Chatbot
  mcqs: '#FF4500',       // OrangeRed for MCQs (New color for MCQs button)
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: whatsAppGreen,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: { marginRight: 16 },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  buttonGroup: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

const ChapterDetailScreen = () => {
  const router = useRouter();
  const { chapter: chapterParam } = useLocalSearchParams();
  const chapter = chapterParam ? JSON.parse(chapterParam) : {};

  const handleNotes = () => {
    if (chapter.blogUrl) {
      router.push({
        pathname: '/NotesScreen',
        params: { blogUrl: chapter.blogUrl, title: chapter.title },
      });
    } else {
      Alert.alert('Error', 'No blog URL available for this chapter.');
    }
  };

  const handleHandwrittenNotes = () => {
    // CHANGE 3: Check for handwrittenImageUrls and pass it to the new screen
    if (chapter.handwrittenImageUrls && chapter.handwrittenImageUrls.length > 0) {
      router.push({
        pathname: '/HandwrittenImageViewerScreen', // NEW SCREEN NAME
        params: {
          handwrittenImageUrls: JSON.stringify(chapter.handwrittenImageUrls), // Pass array as string
          title: chapter.title
        },
      });
    } else {
      Alert.alert('Error', 'No handwritten notes (images) available for this chapter.');
    }
  };

  const handleWatchVideo = () => {
    if (chapter.videoUrl) {
      router.push({
        pathname: '/VideoPlayerScreen', // Assuming you have a VideoViewerScreen
        params: { videoUrl: chapter.videoUrl, title: chapter.title },
      });
    } else {
      Alert.alert('Error', 'No video URL available for this chapter.');
    }
  };

const handleChatbot = () => {
    router.push({
      pathname: "/ChatbotScreen",
      params: { chapter: JSON.stringify(chapter) },
    });
  };

  const handleChapterMCQs = () => {
    if (chapter.unit && chapter.title) {
      router.push({
        pathname: '/ChapterMCQScreen',
        params: { chapterId: chapter.unit, chapterTitle: chapter.title },
      });
    } else {
      Alert.alert('Error', 'Chapter details missing for MCQs.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {chapter.title || 'Chapter Details'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.buttonGroup}>
          {/* Notes Button */}
          <TouchableOpacity
            onPress={handleNotes}
            style={styles.button}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: iconBgColors.notes }]}>
              <MaterialCommunityIcons name="note-text" size={28} color="white" />
            </View>
            <Text style={styles.buttonText}>Theory Notes</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>

          {/* Handwritten Notes Button */}
          <TouchableOpacity
            onPress={handleHandwrittenNotes}
            style={styles.button}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: iconBgColors.handwritten }]}>
              <MaterialCommunityIcons name="fountain-pen-tip" size={28} color="white" />
            </View>
            <Text style={styles.buttonText}>Handwritten Notes</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>

          {/* Watch Video Button */}
          <TouchableOpacity
            onPress={handleWatchVideo}
            style={styles.button}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: iconBgColors.video }]}>
              <MaterialCommunityIcons name="play-circle" size={28} color="white" />
            </View>
            <Text style={styles.buttonText}>Watch Video</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>

          {/* Chat with AI Button */}
          <TouchableOpacity
            onPress={handleChatbot}
            style={styles.button}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: iconBgColors.chatbot }]}>
              <MaterialCommunityIcons name="robot" size={28} color="white" />
            </View>
            <Text style={styles.buttonText}>Chat with AI</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>

          {/* New Chapter MCQs Button */}
          <TouchableOpacity
            onPress={handleChapterMCQs}
            style={styles.button}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: iconBgColors.mcqs }]}>
              <MaterialCommunityIcons name="clipboard-list" size={28} color="white" />
            </View>
            <Text style={styles.buttonText}>Chapter MCQs</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChapterDetailScreen;