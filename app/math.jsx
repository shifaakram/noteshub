// app/math.jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert, // Import Alert for "No Notes" message
} from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Chapter Data
const chapters = [
  { unit: '01', title: 'Real And Complex Numbers', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-1-real-and-complex-numbers_27.html', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: '02', title: 'Logarithms', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: '03', title: 'Algebraic Expressions And Formulas', pdfUrl: 'https://arxiv.org/pdf/2207.12702', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: '04', title: 'Factorization', pdfUrl: 'https://www.africau.edu/images/default/sample.pdf', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: '05', title: 'Algebraic Manipulation', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', handwrittenNotesImageUrls: [] }, // Added empty array
  { unit: '06', title: 'Linear Equation And Inequalities', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-6-linear-equations-and.html', handwrittenNotesImageUrls: [] },
  { unit: '07', title: 'Linear Graphs And Their Application', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-7-linear-graphs-and-their.html', handwrittenNotesImageUrls: [] },
  { unit: '08', title: 'Introduction To Coordinate Geometry', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-8-introduction-to-coordinate.html', handwrittenNotesImageUrls: [] },
  { unit: '09', title: 'Introduction To Trignometry', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-9-introduction-to-trigonometry.html', handwrittenNotesImageUrls: [] },
  { unit: '10', title: 'Congruent Traingles', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-10-congruent-triangles.html', handwrittenNotesImageUrls: [] },
  { unit: '11', title: 'Parallelograms And Triangles', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-11-parallelograms-and-triangles.html', handwrittenNotesImageUrls: [] },
  { unit: '12', title: 'Line Bisectors And Angle Bisectors', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-12-line-bisectors-and-angle.html', handwrittenNotesImageUrls: [] },
  { unit: '13', title: 'Sides And Angles Of A Triangle', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-13-sides-and-angles-of-triangle.html', handwrittenNotesImageUrls: [] },
  { unit: '14', title: 'Ratio And Proportion', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-14-ratio-and-proportion.html', handwrittenNotesImageUrls: [] },
  { unit: '15', title: 'Pythagoras Theorem', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-15-pythagoras-theorem.html', handwrittenNotesImageUrls: [] },
  { unit: '16', title: 'Theorems Related With Area', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-16-theorems-related-with-area.html', handwrittenNotesImageUrls: [] },
  { unit: '17', title: 'Practical Geometry', pdfUrl: 'https://iqbaljahanakademy.blogspot.com/2021/09/unit-17-practical-geometry.html', handwrittenNotesImageUrls: [] },
];

const ChapterSelectionScreen = () => {
  const router = useRouter();

  const whatsAppGreen = '#075E54';

  const getUnitIconColor = (unit) => {
    const colors = [
      '#FF6347', '#4682B4', '#32CD32', '#FFD700', '#DA70D6', '#87CEEB', '#ADFF2F',
      '#FF4500', '#BA55D3', '#00FA9A', '#1E90FF', '#FF69B4', '#CD5C5C', '#6A5ACD',
      '#FF8C00', '#20B2AA', '#8B008B',
    ];
    // Use the unit number to select a color, adjust index if needed
    return colors[(parseInt(unit, 10) - 1) % colors.length];
  };

  const separatorColors = [
    '#E0E0E0', '#D3D3D3', '#C0C0C0', '#B0B0B0', '#A9A9A9'
  ];

  const navigateToChatbot = (chapterTitle) => {
    // You might want to pass the full chapter object here too for more context
    router.push({
      pathname: "/ChatbotScreen",
      params: { title: chapterTitle }, // Passing just title for math, consider full chapter if needed
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
          Mathematics Chapters
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
                  <Text className="text-base text-gray-800 font-medium flex-1">
                    {chapter.title}
                  </Text>
                  <MaterialCommunityIcons name="file-document-outline" size={24} color="#666" />
                </TouchableOpacity>

                {/* NEW: Handwritten Notes Button for Math */}
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
                  className="flex-row justify-center items-center py-3 px-4 bg-orange-100 active:bg-orange-200 mt-2 rounded-md" // Added styling for distinction
                >
                  <MaterialCommunityIcons name="notebook-outline" size={20} color="#E65100" />
                  <Text className="ml-2 text-orange-800 font-semibold">Handwritten Notes</Text>
                </TouchableOpacity>

                {/* Chat with AI */}
                <TouchableOpacity
                  onPress={() => navigateToChatbot(chapter.title)}
                  className="flex-row justify-center items-center py-3 px-4 bg-gray-50 active:bg-gray-100 mt-2 rounded-md" // Added styling for distinction
                >
                  <MaterialCommunityIcons name="robot" size={20} color="#333" />
                  <Text className="ml-2 text-gray-700 font-semibold">Chat with AI</Text>
                </TouchableOpacity>
              </View>

              {/* Separator */}
              {index < chapters.length - 1 && (
                <View
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