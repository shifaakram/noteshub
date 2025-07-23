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
  Image, // Import Image component
  ActivityIndicator, // For loading indicator
  Alert, // For error alerts
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const whatsAppGreen = '#075E54';
const { width } = Dimensions.get('window');

const HandwrittenImageViewerScreen = () => {
  const { handwrittenImageUrls: urlsParam, title } = useLocalSearchParams();
  const router = useRouter();

  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (urlsParam) {
      try {
        // Parse the stringified array back into an array
        const parsedUrls = JSON.parse(urlsParam);
        if (Array.isArray(parsedUrls) && parsedUrls.length > 0) {
          setImageUrls(parsedUrls);
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
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.image}
            resizeMode="contain" // Ensures the whole image is visible within the bounds
          />
        ))}
      </ScrollView>
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
    alignItems: 'center', // Center images horizontally
    paddingVertical: 10,
  },
  image: {
    width: width, // Image takes full width
    height: width * 1.414, // Assuming a common A4-like aspect ratio (approx. 1:1.414). Adjust as needed.
    marginBottom: 10, // Space between images
    backgroundColor: '#f0f0f0', // Placeholder background while loading
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
});

export default HandwrittenImageViewerScreen;