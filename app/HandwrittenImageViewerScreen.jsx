// HandwrittenImageViewerScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
  Modal, // Import Modal from react-native
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer'; // Import ImageViewer

const whatsAppGreen = '#075E54';
const { width, height } = Dimensions.get('window');

const HandwrittenImageViewerScreen = () => {
  const { handwrittenImageUrls: urlsParam, title } = useLocalSearchParams();
  const router = useRouter();

  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (urlsParam) {
      try {
        const parsedUrls = JSON.parse(urlsParam);
        if (Array.isArray(parsedUrls) && parsedUrls.length > 0) {
          // Format URLs for react-native-image-zoom-viewer
          const formattedUrls = parsedUrls.map(url => ({ url }));
          setImageUrls(formattedUrls);
          setLoading(false);
        } else {
          Alert.alert('Error', 'No image URLs found for this chapter.');
          setError(true);
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to parse image URLs:", e);
        Alert.alert('Error', 'Invalid image URLs provided.');
        setError(true);
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'No image URLs provided.');
      setError(true);
      setLoading(false);
    }
  }, [urlsParam]);

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Loading Notes...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={whatsAppGreen} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || imageUrls.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
            Error
          </Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Could not load handwritten notes. Please check the URLs.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {title || 'Handwritten Notes'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {imageUrls.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openImageViewer(index)}
            style={styles.imageTouchable}
          >
            <Image
              source={{ uri: image.url }}
              style={styles.imageThumbnail}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* MODAL WRAPPER FOR IMAGEVIEWER */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <ImageViewer
          imageUrls={imageUrls}
          index={currentImageIndex}
          onCancel={() => setModalVisible(false)}
          enableSwipeDown={true}
          renderHeader={() => (
            <View style={styles.imageViewerHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButton}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.imageViewerTitle}>
                {title || 'Handwritten Notes'} ({currentImageIndex + 1}/{imageUrls.length})
              </Text>
            </View>
          )}
          // You can customize more props like renderIndicator, etc.
        />
      </Modal>
    </SafeAreaView>
  );
};

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
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageTouchable: {
    marginBottom: 10, // Space between image thumbnails
  },
  imageThumbnail: {
    width: width,
    height: width * 1.414, // Maintain aspect ratio for thumbnails
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  imageViewerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  imageViewerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
});

export default HandwrittenImageViewerScreen;