import { useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ClassSelection() {
  const router = useRouter();

  const whatsAppGreen = '#075E54';

  const iconBgColors = {
    classVI: '#FF7F50',
    classVII: '#8A2BE2',
    classVIII: '#9370DB',
    classIX: '#FFD700',
    classX: '#32CD32',
  };

  const handleClassSelection = (className) => {
    console.log(`Selected Class: ${className}`);
   if (
  className === "Class VI" ||
  className === "Class VII" ||
  className === "Class VIII" ||
  className === "Class X"
) {
  router.push("/ComingSoon");
} else {
  router.push("/subject");
}
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={whatsAppGreen} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Class</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
      >
          <TouchableOpacity
            onPress={() => handleClassSelection("Class VI")}
            style={styles.listItem}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: iconBgColors.classVI }]}
            >
              <MaterialCommunityIcons name="numeric-6-circle" size={28} color="white" />
            </View>
            <Text style={styles.listItemText}>Class VI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class VII")}
            style={styles.listItem}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: iconBgColors.classVII }]}
            >
              <MaterialCommunityIcons name="numeric-7-circle" size={28} color="white" />
            </View>
            <Text style={styles.listItemText}>Class VII</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class VIII")}
            style={styles.listItem}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: iconBgColors.classVIII }]}
            >
              <MaterialCommunityIcons name="numeric-8-circle" size={28} color="white" />
            </View>
            <Text style={styles.listItemText}>Class VIII</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class IX")}
            style={styles.listItem}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: iconBgColors.classIX }]}
            >
              <MaterialCommunityIcons name="numeric-9-circle" size={28} color="white" />
            </View>
            <Text style={styles.listItemText}>Class IX</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class X")}
            style={styles.listItem}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: iconBgColors.classX }]}
            >
              <MaterialCommunityIcons name="school" size={28} color="white" />
            </View>
            <Text style={styles.listItemText}>Class X</Text>
          </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#075E54',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContentContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
  },
});