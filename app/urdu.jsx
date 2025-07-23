// app/urdu.jsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Define your Urdu chapter data based on the provided list
const chapters = [
  // --- حصہ نثر- مضامین (Prose - Essays) ---
  { unit: "01", title: "إخلأق نبوی ﷺ", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/01_68.html', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: "02", title: "امید کی خوشی", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/02_69.html', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: "03", title: "قومی ہمدردی", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/03_24.html', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: "04", title: "رشتہ ناتا", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/03_56.html', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: "05", title: "نظریۂ پاکستان", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/05_88.html', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: "06", title: "علامہ محمد اقبال", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/06_8.html', handwrittenNotesImageUrls: [] },
  { unit: "07", title: "نصوح اور سلیم کی گفتگو", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/07_7.html', handwrittenNotesImageUrls: [] },
  { unit: "08", title: "ملمع", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/08_9.html', handwrittenNotesImageUrls: [] },
  { unit: "09", title: "آرٹس کی تعلیم", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/09_29.html', handwrittenNotesImageUrls: [] },
  { unit: "10", title: "پانی", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/10_1.html', handwrittenNotesImageUrls: [] },

  // --- حصہ نظم (Poetry) ---
  { unit: "11", title: "حمد", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/11_25.html', handwrittenNotesImageUrls: [] },
  { unit: "12", title: "نعت", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/12_27.html', handwrittenNotesImageUrls: [] },
  { unit: "13", title: "برسات کی بہاریں", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/13_40.html', handwrittenNotesImageUrls: [] },
  { unit: "14", title: "پنچایت", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/14_90.html', handwrittenNotesImageUrls: [] },
  { unit: "15", title: "جغرافیہ", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/15_7.html', handwrittenNotesImageUrls: [] },
  { unit: "16", title: "کودک", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/16_29.html', handwrittenNotesImageUrls: [] },

  // --- حصہ غزل (Ghazal) ---
  { unit: "17", title: "مرزا غالب کی غزلیں", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/17_26.html', handwrittenNotesImageUrls: [] },
  { unit: "18", title: "میر تقی میر کی غزلیں", pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/18_5.html', handwrittenNotesImageUrls: [] },
];

const ChapterSelectionScreen = () => {
  const router = useRouter();

  const whatsAppGreen = '#075E54';

  const getUnitIconColor = (unit) => {
    const colors = [
      '#FF6347', '#4682B4', '#32CD32', '#FFD700', '#DA70D6', '#87CEEB', '#ADFF2F',
      '#FF4500', '#BA55D3', '#00FA9A', '#1E90FF', '#FF69B4', '#CD5C5C', '#6A5ACD',
      '#FF8C00', '#20B2AA', '#8B008B', '#6D2D7A',
    ];
    return colors[(parseInt(unit, 10) - 1) % colors.length];
  };

  const separatorColors = [
    '#E0E0E0', '#D3D3D3', '#C0C0C0', '#B0B0B0', '#A9A9A9'
  ];

  const navigateToChatbot = (chapterData) => {
    // MODIFIED: Pass the entire 'chapter' object for Urdu as well for consistency
    router.push({
      pathname: "/ChatbotScreen",
      params: { chapter: JSON.stringify(chapterData) },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle={"light-content"} backgroundColor={whatsAppGreen} />

      {/* Header */}
      <View className="flex-row items-center p-4 bg-[#075E54]">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold flex-1">
          Urdu Chapters
        </Text>
      </View>

      {/* Chapter List */}
      <ScrollView className="flex-1 p-4">
        <View className="bg-white rounded-lg shadow-md overflow-hidden">
          {chapters.map((chapter, index) => (
            <React.Fragment key={index}>
              <View className="p-4">
                {/* PDF Notes Button */}
                <TouchableOpacity
                  onPress={() => Linking.openURL(chapter.pdfUrl)}
                  className="flex-row items-center py-3 px-4 bg-white active:bg-gray-100"
                >
                  <View
                    className="w-12 h-12 rounded-full mr-4 items-center justify-center"
                    style={{ backgroundColor: getUnitIconColor(chapter.unit) }}
                  >
                    <Text className="text-white font-bold">{chapter.unit}</Text>
                  </View>
                  <Text className="text-lg font-medium text-gray-800 flex-1">
                    {chapter.title}
                  </Text>
                  <MaterialCommunityIcons name="file-document-outline" size={24} color="#666" />
                </TouchableOpacity>

                {/* NEW: Handwritten Notes Button for Urdu */}
                <TouchableOpacity
                  onPress={() =>
                    chapter.handwrittenNotesImageUrls && chapter.handwrittenNotesImageUrls.length > 0
                      ? router.push({
                          pathname: "/HandwrittenNotesScreen",
                          params: {
                            notesTitle: `${chapter.title} - Handwritten Notes`,
                            imageUriStrings: JSON.stringify(chapter.handwrittenNotesImageUrls),
                          },
                        })
                      : Alert.alert("No Notes", "Handwritten notes not available for this chapter yet.")
                  }
                  className="flex-row justify-center items-center py-3 px-4 bg-orange-100 active:bg-orange-200 mt-2 rounded-md"
                >
                  <MaterialCommunityIcons name="notebook-outline" size={20} color="#E65100" />
                  <Text className="ml-2 text-orange-800 font-semibold">Handwritten Notes</Text>
                </TouchableOpacity>

                {/* Chat with AI */}
                <TouchableOpacity
                  onPress={() => navigateToChatbot(chapter)}
                  className="flex-row justify-center items-center py-3 px-4 bg-gray-50 active:bg-gray-100 mt-2 rounded-md"
                >
                  <MaterialCommunityIcons name="robot" size={20} color="#333" className="mr-2" />
                  <Text className="text-md font-semibold text-gray-700 ml-2">Chat with AI</Text>
                </TouchableOpacity>
              </View>

              {/* Separating line AFTER each chapter, but not after the very last one */}
              {index < chapters.length - 1 && (
                <View
                  key={`separator-${chapter.unit}`}
                  className="h-1 w-full my-2"
                  style={{ backgroundColor: separatorColors[index % separatorColors.length] }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChapterSelectionScreen;