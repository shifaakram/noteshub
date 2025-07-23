import { useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ComingSoonPage() {
  const router = useRouter();

  const styles = {
    container: { flex: 1, backgroundColor: "white" },
    header: {
      backgroundColor: "#075E54",
      paddingVertical: 16,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      flex: 1,
      fontSize: 24,
      fontWeight: "600",
      color: "white",
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      backgroundColor: "white",
    },
    card: {
      alignItems: "center",
      backgroundColor: "#F9FAFB",
      padding: 30,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      width: "100%",
    },
    icon: {
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#374151",
      textAlign: "center",
      marginBottom: 10,
    },
    message: {
      fontSize: 16,
      color: "#6B7280",
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 20,
    },
    thankYou: {
      fontSize: 14,
      fontWeight: "500",
      color: "#4B5563",
      textAlign: "center",
    },
    goBackButton: {
      marginTop: 30,
      backgroundColor: "#075E54",
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    goBackButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
      marginLeft: 8,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E54" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Coming Soon</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="timer-sand-empty"
            size={80}
            color="#FFC107"
            style={styles.icon}
          />
          <Text style={styles.title}>Exciting New Content is On Its Way!</Text>
          <Text style={styles.message}>
            We are diligently working to bring you more valuable educational resources and features.
            Please check back soon for updates!
          </Text>
          <Text style={styles.thankYou}>
            Thank you for your patience and support!
          </Text>

          <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
            <MaterialCommunityIcons name="home" size={20} color="white" />
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
