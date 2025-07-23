import { useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ClassSelection() {
  const router = useRouter();

  const whatsAppGreen = '#075E54';

  const iconBgColors = {
    classVI: '#FF7F50',   // Coral for Class VI
    classVII: '#8A2BE2',  // Blue Violet for Class VII
    classVIII: '#9370DB', // Medium Purple for Class VIII
    classIX: '#FFD700',   // Gold for Class IX
    classX: '#32CD32',    // Lime Green for Class X
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
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle={"light-content"} backgroundColor={whatsAppGreen} />

      <View className="bg-[#075E54] py-4 px-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold flex-1">Choose Class</Text>
      </View>

      <ScrollView className="flex-1 bg-white">
        <View className="mt-4 px-0">

          <TouchableOpacity
            onPress={() => handleClassSelection("Class VI")}
            className="flex-row items-center bg-white border-b border-gray-200 py-4 px-4 active:bg-gray-100"
          >
            <View
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: iconBgColors.classVI }}
            >
              <MaterialCommunityIcons name="numeric-6-circle" size={28} color="white" />
            </View>
            <Text className="text-lg font-medium text-gray-800 flex-1">Class VI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class VII")}
            className="flex-row items-center bg-white border-b border-gray-200 py-4 px-4 active:bg-gray-100"
          >
            <View
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: iconBgColors.classVII }}
            >
              <MaterialCommunityIcons name="numeric-7-circle" size={28} color="white" />
            </View>
            <Text className="text-lg font-medium text-gray-800 flex-1">Class VII</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class VIII")}
            className="flex-row items-center bg-white border-b border-gray-200 py-4 px-4 active:bg-gray-100"
          >
            <View
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: iconBgColors.classVIII }}
            >
              <MaterialCommunityIcons name="numeric-8-circle" size={28} color="white" />
            </View>
            <Text className="text-lg font-medium text-gray-800 flex-1">Class VIII</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class IX")}
            className="flex-row items-center bg-white border-b border-gray-200 py-4 px-4 active:bg-gray-100"
          >
            <View
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: iconBgColors.classIX }}
            >
              <MaterialCommunityIcons name="numeric-9-circle" size={28} color="white" />
            </View>
            <Text className="text-lg font-medium text-gray-800 flex-1">Class IX</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleClassSelection("Class X")}
            className="flex-row items-center bg-white border-b border-gray-200 py-4 px-4 active:bg-gray-100"
          >
            <View
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: iconBgColors.classX }}
            >
              <MaterialCommunityIcons name="school" size={28} color="white" />
            </View>
            <Text className="text-lg font-medium text-gray-800 flex-1">Class X</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
