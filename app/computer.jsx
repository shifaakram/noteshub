import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,

} from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {  height } = Dimensions.get('window');

// All seven chapters with titles and URLs
const chapters = [
  {
    unit: "01",
    title: "Fundamentals of Computer",
    blogUrl: 'https://red-karlen-55.tiiny.site/',
    //blogUrl: 'https://drive.google.com/file/d/1Hil6t6BPG-JRchuxG8OTOryLMt9rWQyX/view?usp=drive_link',
    // UPDATED: Use the provided URLs for Chapter 1
    handwrittenImageUrls: [
        'https://i.ibb.co/GQNMBSzb/Computer-1.jpg',
  'https://i.ibb.co/S7WRx4LC/Computer-2.jpg',
  'https://i.ibb.co/Fj9Wx2h/Computer-3.jpg',
  'https://i.ibb.co/xKkRNZWk/Computer-4.jpg',
  'https://i.ibb.co/C3fcm6bz/Computer-5.jpg',
  'https://i.ibb.co/d4ByC9WB/Computer-6.jpg',
  'https://i.ibb.co/39yh0LC9/Computer-7.jpg',
  'https://i.ibb.co/yKssygR/Computer-8.jpg',
  'https://i.ibb.co/wrRm5xZZ/Computer-9.jpg',
  'https://i.ibb.co/23cD55bH/Computer-10.jpg',
  'https://i.ibb.co/vf2SMW1/Computer-11.jpg',
  'https://i.ibb.co/nsnB96BN/Computer-12.jpg',
  'https://i.ibb.co/rKKY4tBC/Computer-13.jpg',
  'https://i.ibb.co/57rD4Fg/Computer-14.jpg',
  'https://i.ibb.co/6cL084Wr/Computer-15.jpg',
  'https://i.ibb.co/gLKBdW80/Computer-16.jpg',
  'https://i.ibb.co/50R8cKz/Computer-17.jpg',
  'https://i.ibb.co/CcXJtjc/Computer-18.jpg',
  'https://i.ibb.co/jvmjhFvB/Computer-19.jpg',
  'https://i.ibb.co/BVK5hz4g/Computer-20.jpg',
  'https://i.ibb.co/G3CXsPyW/Computer-21.jpg',
  'https://i.ibb.co/Q30HCQS3/Computer-22.jpg',
  'https://i.ibb.co/JJgVd6f/Computer-23.jpg',
  'https://i.ibb.co/Y7SDC4M1/Computer-24.jpg',
  'https://i.ibb.co/JRFTmhQ7/Computer-25.jpg',
  'https://i.ibb.co/WNQ5yfzj/Computer-26.jpg',
  'https://i.ibb.co/5hh5063X/Computer-27.jpg',
  'https://i.ibb.co/5WqyCYq6/Computer-28.jpg',
  'https://i.ibb.co/BVkvfBxm/Computer-29.jpg',
  'https://i.ibb.co/FLgbFNcN/Computer-30.jpg',
  'https://i.ibb.co/NMfq1Hc/Computer-31.jpg',
  'https://i.ibb.co/ksDLNNqB/Computer-32.jpg',
  'https://i.ibb.co/F4KNB30W/Computer-33.jpg',
  'https://i.ibb.co/fY1wFs4N/Computer-34.jpg',
  'https://i.ibb.co/Z6T9N82v/Computer-35.jpg',
  'https://i.ibb.co/r2VCfk58/Computer-36.jpg',
  'https://i.ibb.co/wZdRPg8t/Computer-37.jpg',
  'https://i.ibb.co/ymhvRkGv/Computer-38.jpg',
  'https://i.ibb.co/7tCC9tB1/Computer-39.jpg',
  'https://i.ibb.co/ymf12r9W/Computer-40.jpg',
  'https://i.ibb.co/DHjvvpzj/Computer-41.jpg',
  'https://i.ibb.co/LdwY75YD/Computer-42.jpg',
  'https://i.ibb.co/nqJjbJs6/Computer-43.jpg',
  'https://i.ibb.co/tMPGSLPV/Computer-44.jpg',
  'https://i.ibb.co/wFJ85Lsp/Computer-45.jpg',
  'https://i.ibb.co/wZZYNNy6/Computer-46.jpg',
  'https://i.ibb.co/SD1KVwHW/Computer-47.jpg',
  'https://i.ibb.co/vvV9RZqQ/Computer-48.jpg',
  'https://i.ibb.co/678D4Sxh/Computer-49.jpg',
  'https://i.ibb.co/pBHZBcgH/Computer-50.jpg',
  'https://i.ibb.co/9mn8yqr4/Computer-51.jpg',
  'https://i.ibb.co/VpqVn59b/Computer-52.jpg',
  'https://i.ibb.co/b5wdmgGN/Computer-53.jpg',
  'https://i.ibb.co/wN83bgYz/Computer-54.jpg',
  'https://i.ibb.co/RTgR6xPz/Computer-55.jpg',
  'https://i.ibb.co/3Y0m0kWR/Computer-56.jpg',
  'https://i.ibb.co/mF4Y5Dnd/Computer-57.jpg',
  'https://i.ibb.co/XxR1tFvR/Computer-58.jpg',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=2kg8s6P2A94&list=PL_e0sEDFz-CsD9mB76f8PvJqNvKG_brjy',
  },
  {
    unit: "02",
    title: "Fundamentals of Operating System",
    blogUrl: 'https://drive.google.com/file/d/1MAl2VDC_WIe1CHVmCYmgYjcJp7y4gchv/view?usp=drive_link',
    // Add handwrittenImageUrls for this chapter too
    handwrittenImageUrls: [
      'https://i.ibb.co/JyQ1p5q/os-notes-page1.jpg', // Placeholder for page 1
      'https://i.ibb.co/JqY7ZqX/os-notes-page2.jpg', // Placeholder for page 2
      // Add more image URLs as needed
    ],
    videoUrl: 'https://youtu.be/57ANhNZq38E?list=PL_e0sEDFz-CuhowEmtIE7v1CXwJ-_IPz9',
  },
  {
    unit: "03",
    title: "Office Automation",
    blogUrl: 'https://drive.google.com/file/d/1vIymqLzdO0xguWob6emZeprRUppa1LRX/view?usp=drive_link',
    handwrittenImageUrls: [ /* Add image URLs here */ ],
    videoUrl: 'https://youtu.be/guazjo0vpvI?list=PL_e0sEDFz-Cuk-3DX48unKpeVkuO5xVOP',
  },
  {
    unit: "04",
    title: "Data Communication and Computer Networks",
    blogUrl: 'https://drive.google.com/file/d/1LN4f8vzJiFxDEzNkiepxoJfAtXLCuPDj/view?usp=drive_link', // Example, replace with actual
    handwrittenImageUrls: [ /* Add image URLs here */ ],
    videoUrl: 'https://www.youtube.com/watch?v=1bYbvnktuZo&list=PL_e0sEDFz-CuN4Xu1MXf7mlIMYOYIKp1n',
  },
  {
    unit: "05",
    title: "Computer Security and Ethics",
    blogUrl: 'https://www.youtube.com/watch?v=Pxu_UTlB8HY&list=PL_e0sEDFz-CuNZSDbJfJzZI1eRPmMg_qz', // Example, replace with actual
    handwrittenImageUrls: [ /* Add image URLs here */ ],
    videoUrl: 'https://youtu.be/2kg8s6P2A94?list=PL_e0sEDFz-CsD9mB76f8PvJqNvKG_brjy',
  },
  {
    unit: "06",
    title: "Web Development",
    blogUrl: 'https://drive.google.com/file/d/1-bKEBZZUOThsF7NH7BdH4jSZt0jQPOot/view?usp=drive_link', // Example, replace with actual
    handwrittenImageUrls: [ /* Add image URLs here */ ],
    videoUrl: 'https://www.youtube.com/watch?v=HBriedacjAQ&list=PL_e0sEDFz-CsvUE2JnHl5x0IleZjpU4zr',
  },
  {
    unit: "07",
    title: "Introduction to Database System",
    blogUrl: 'https://drive.google.com/file/d/1teR6nlfqo69AmLCsAzvofy6tJgIEUONY/view?usp=drive_link', // Example, replace with actual
    handwrittenImageUrls: [ /* Add image URLs here */ ],
    videoUrl: 'https://www.youtube.com/watch?v=5Vup5Od6I_A&list=PL_e0sEDFz-Ct4vKKhkD1KjqaeDcHgRq86',
  },
];


const whatsAppGreen = '#075E54';

const ComputerScreen = () => {
  const router = useRouter();

  const handleChapterPress = (chapter) => {
    // Pass the entire chapter object, including new handwrittenImageUrls
    router.push({
      pathname: '/ChapterDetailScreen',
      params: { chapter: JSON.stringify(chapter) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />
      {/* Header */}
      
      
 <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
         <Text style={styles.headerTitle}>Computer Science</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.chapterList}>
          {chapters.map((chapter) => (
            <View key={chapter.unit} style={styles.chapterCard}>
              <TouchableOpacity
                style={styles.chapterTouchable}
                onPress={() => handleChapterPress(chapter)}
                activeOpacity={0.8}
              >
                <View style={styles.chapterIconContainer}>
                  <MaterialCommunityIcons name="book-open-variant" size={30} color={whatsAppGreen} />
                </View>
                <View style={styles.chapterTextContent}>
                  <Text style={styles.chapterUnit}>Unit {chapter.unit}</Text>
                  <Text style={styles.chapterTitle}>{chapter.title}</Text>
                </View>
                <MaterialCommunityIcons name="arrow-right" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whatsAppGreen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: whatsAppGreen,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  backButton: { marginRight: 16 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', flex: 1 },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 16,
    minHeight: height - 80, // header height
  },
  chapterList: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  chapterCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
    width: '100%',
  },
  chapterTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  chapterIconContainer: {
    marginRight: 16,
    // Add a circular background for the icon if desired
  },
  chapterTextContent: {
    flex: 1,
    marginRight: 16,
  },
  chapterUnit: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default ComputerScreen;