import React, { useEffect } from 'react';
import { useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import logo from "../assets/images/logo1.png";

const { width, height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const logoTranslateY = useSharedValue(50);
  const logoRotateX = useSharedValue(20);

  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(40);

  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  // Define animated styles
  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: logoTranslateY.value },
      { rotateX: `${logoRotateX.value}deg` },
    ],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  // Trigger animations
  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 900 });
    logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    logoTranslateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    logoRotateX.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) });

    textOpacity.value = withTiming(1, { duration: 700, delay: 500, easing: Easing.out(Easing.ease) });
    textTranslateY.value = withTiming(0, { duration: 700, delay: 500, easing: Easing.out(Easing.ease) });

    buttonOpacity.value = withTiming(1, { duration: 700, delay: 900, easing: Easing.out(Easing.ease) });
    buttonScale.value = withSpring(1, { damping: 10, stiffness: 100, delay: 900 });
  }, [buttonOpacity, buttonScale, logoOpacity, logoRotateX, logoScale, logoTranslateY, textOpacity, textTranslateY]);

  const logoPrimaryGreenTeal = '#1A635B';
  const logoAccentGreenTeal = '#288075';
  const textDarkGray = '#333333';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.innerContainer}>
          {/* Animated Logo */}
          <Animated.Image
            source={logo}
            style={[
              styles.logo,
              { shadowColor: logoPrimaryGreenTeal },
              animatedLogoStyle
            ]}
            resizeMode="contain"
          />

          {/* Animated App Title */}
          <Animated.Text
            style={[
              animatedTextStyle,
              styles.title,
              { color: logoPrimaryGreenTeal }
            ]}
          >
            Notes Hub
          </Animated.Text>

          {/* Animated Subtitle/Description */}
          <Animated.Text
            style={[
              animatedTextStyle,
              styles.subtitle,
              { color: textDarkGray }
            ]}
          >
            Master any subject with personalized notes, interactive practice, and AI-powered insights.
          </Animated.Text>

          {/* Animated "Get Started" Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              { backgroundColor: logoAccentGreenTeal, shadowColor: logoPrimaryGreenTeal },
              animatedButtonStyle
            ]}
          >
            <TouchableOpacity
              onPress={() => router.push("grade")}
              style={styles.buttonTouchable}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>{'Start Learning'.toUpperCase()}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    minHeight: height - (Platform.OS === 'android' ? 24 : 0),
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  logo: {
    width: Math.min(width * 0.7, 260),
    height: Math.min(width * 0.7, 260),
    marginBottom: 16,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 25,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    width: '90%',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 40,
    width: '90%',
  },
  buttonContainer: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 18,
    borderRadius: 10,
    width: '90%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  buttonTouchable: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
