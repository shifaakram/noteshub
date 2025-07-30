// ChatbotScreen.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Alert,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey;
const BASE_BACKEND_URL = 'http://192.168.0.103:3000'; // Still defined but no longer used in this file for chat

let geminiModel = null;
if (GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  geminiModel = genAI.getGenerativeModel({
    model: 'models/gemini-2.5-flash',
    generationConfig: {
      temperature: 0.2,
      topP: 0.9,
      topK: 40,
    },
  });
}

const whatsAppGreen = '#075E54';

const ChatbotScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scrollViewRef = useRef();
  const { height: windowHeight } = useWindowDimensions();

  const [chapterContext, setChapterContext] = useState('');
  const [chapterUnit, setChapterUnit] = useState('');
  useEffect(() => {
    if (params.chapter) {
      try {
        const chapter = typeof params.chapter === 'string' ? JSON.parse(params.chapter) : params.chapter;
        setChapterContext(chapter.title || '');
        setChapterUnit(chapter.unit || '');
      } catch {
        setChapterContext('');
        setChapterUnit('');
      }
    } else {
      setChapterContext(params.chapterTitle || '');
      setChapterUnit(params.unit || '');
    }
  }, [params.chapter, params.chapterTitle, params.unit]);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chapterContent, setChapterContent] = useState('');
  const [isChapterLoading, setIsChapterLoading] = useState(false);

  const appendMessage = useCallback((sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const fetchChapterContent = async () => {
      if (!chapterUnit) {
        setChapterContent('');
        setIsChapterLoading(false);
        return;
      }
      setIsChapterLoading(true);
      try {
        const res = await fetch(`${BASE_BACKEND_URL}/chapter-content/${chapterUnit}`);
        if (!res.ok) {
          setChapterContent('');
        } else {
          const text = await res.text();
          setChapterContent(text);
        }
      } catch {
        setChapterContent('');
      } finally {
        setIsChapterLoading(false);
      }
    };
    fetchChapterContent();
  }, [chapterUnit]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isChapterLoading) return;

    const userMessage = inputMessage.trim();
    appendMessage('user', userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      let aiResponseText = '';

      if (geminiModel && chapterContent) {
        // Try Gemini with context first
        const contextPrompt = `
You are an expert tutor. Answer the following question using ONLY the provided chapter content below.
If the answer is NOT found in the content, reply exactly with: NOT_FOUND_IN_CONTEXT

Chapter Content:
${chapterContent}

Question:
${userMessage}
        `.trim();

        const result = await geminiModel.generateContent(contextPrompt);
        let geminiText = result.response.text();
        if (typeof geminiText.then === 'function') {
          geminiText = await geminiText;
        }

        if (geminiText.trim() === "NOT_FOUND_IN_CONTEXT") {
          // If not found in chapter content, display apology
          aiResponseText = "I'm sorry, I couldn't find a relevant answer for your question within the chapter content. Please try rephrasing or asking a different question. 😔";
        } else {
          aiResponseText = geminiText; // Found in chapter
        }
      } else {
        // If no Gemini model or no chapter content, directly display apology
        aiResponseText = "I'm sorry, I cannot answer your question at this moment as the chapter content is unavailable or the AI model could not be initialized. Please try again later or select a different chapter. 😔";
      }

      appendMessage('ai', aiResponseText);
    } catch (error) {
      console.error("AI Chatbot error:", error);
      Alert.alert("Error", "Failed to get a response from the AI. Please try again.");
      appendMessage('ai', "I apologize, but I encountered an error. Please try asking again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { height: windowHeight }]}>
      <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{chapterContext ? `${chapterContext} Chatbot` : 'AI Chatbot'}</Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            {chapterContext && messages.length === 0 && (
              <View style={[styles.messageBubble, styles.aiBubble]}>
                <Text style={styles.messageText}>
                  Hello! You are currently in the context of: {chapterContext}. How can I help you with this topic today?
                </Text>
              </View>
            )}

            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            ))}

            {(isLoading || isChapterLoading) && (
              <View style={[styles.messageBubble, styles.loadingBubble]}>
                <ActivityIndicator size="small" color="#555" />
                <Text style={styles.loadingText}>
                  {isChapterLoading ? 'Loading chapter...' : 'Thinking...'}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputBar}>
            <TextInput
              style={styles.textInput}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Type your message..."
              placeholderTextColor="#888"
              returnKeyType="send"
              onSubmitEditing={handleSendMessage}
              editable={!isLoading && !isChapterLoading}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.sendButton}
              disabled={isLoading || isChapterLoading || !inputMessage.trim()}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <MaterialCommunityIcons name="send" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  header: {
    backgroundColor: whatsAppGreen,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: { marginRight: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '600', flex: 1 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  toggleLabel: { fontSize: 16, color: '#333', flex: 1 },
  scrollView: { flex: 1, backgroundColor: '#fdfdfd' },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
  messageBubble: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: { color: '#333' },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'flex-start',
  },
  loadingText: { marginLeft: 10, color: '#555' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#555',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatbotScreen;