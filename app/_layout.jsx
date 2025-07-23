// app/_layout.js
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { flex: 1, backgroundColor: "#fff" } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="grade" />
        <Stack.Screen name="subject" />
        <Stack.Screen name="ChatbotScreen" />
        <Stack.Screen name="math" />
        <Stack.Screen name="urdu" />
        <Stack.Screen name="computer" />
        <Stack.Screen name="ComingSoon" />
        <Stack.Screen name="HandwrittenImageViewerScreen" /> 
        <Stack.Screen name="VideoPlayerScreen" />
        <Stack.Screen name="NotesScreen" /> 
        <Stack.Screen name="ChapterMCQScreen" /> 
      </Stack>
    </GestureHandlerRootView>
  );
}