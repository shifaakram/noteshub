import { useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const whatsAppGreen = '#075E54';

const subjectData = [
  { name: "Mathematics", icon: "➗", bgColor: "#FF7F50", iconColor: "#fff" },
  { name: "Urdu", icon: "✒️", bgColor: "#8A2BE2", iconColor: "#fff" },
  { name: "Computer", icon: "💻", bgColor: "#FFD700", iconColor: "#000" },
  { name: "Biology", icon: "🧬", bgColor: "#32CD32", iconColor: "#fff" },
  { name: "English", icon: "🅰️", bgColor: "#9370DB", iconColor: "#fff" },
  { name: "Physics", icon: "⚛️", bgColor: "#FF4500", iconColor: "#fff" },
  { name: "Chemistry", icon: "🔬", bgColor: "#00CED1", iconColor: "#fff" },
  { name: "Islamiat", icon: "🕌", bgColor: "#1E90FF", iconColor: "#fff" },
];

export default function SubjectSelection() {
  const router = useRouter();

  const handleSubjectSelection = (subjectName) => {
    if (subjectName === "Mathematics") {
      router.push("/math");
    } else if (subjectName === "Urdu") {
      router.push("/urdu");
    } else if (subjectName === "Computer") {
      router.push("/computer");
    } else {
      router.push("/ComingSoon");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Subject</Text>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {subjectData.map((subject) => (
          <TouchableOpacity
            key={subject.name}
            onPress={() => handleSubjectSelection(subject.name)}
            style={styles.listItem}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: subject.bgColor }]}>
              <Text style={[styles.iconText, { color: subject.iconColor }]}>{subject.icon}</Text>
            </View>
            <Text style={styles.listItemText}>{subject.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: whatsAppGreen,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
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
  listContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContentContainer: {
    paddingBottom: 32,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  listItemText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1F2937",
    flex: 1,
  },
});