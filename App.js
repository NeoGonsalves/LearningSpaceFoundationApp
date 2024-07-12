import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, View, Alert, TouchableOpacity, ScrollView, Linking, FlatList, TextInput } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import QuizScreen from './QuizScreen';
import CircleBackground from './background'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const sampleCourses = [
  { name: 'Course 1', screen: 'Course1' },
  { name: 'Course 2', screen: 'Course2' },
  { name: 'Course 3', screen: 'Course3' },
  { name: 'Course 4', screen: 'Course4' },
];

function Course1Screen() {
  return (
    <View style={styles.container}>
      <CircleBackground>
      <Video
        source={{ uri: 'https://drive.google.com/uc?id=1DqYfYKfvWVG09LP3ekoWYZaUX8qY7ipk&export=download' }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
      </CircleBackground>
    </View>
  );
}

function Course2Screen({ navigation }) {
  return (
    <View style={styles.ResourcesScreen}>
      <Video
        useNativeControls
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.navigate('QuizScreen')} style={styles.quizButton}>
        <Text style={styles.quizButtonText}>Go to Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

function Course3Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <QuizScreen/>
    </SafeAreaView>
  );
}

function Course4Screen() {
  return (
    <View style={styles.ResourcesScreen}>
      <Text>Course 4 Content</Text>
    </View>
  );
}

function DonateScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./App/assets/QRDonation.png')}
          resizeMode='contain'
          style={styles.image}
        />
        <Image
          source={require('./App/assets/DonateDetails.png')}
          resizeMode='contain'
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
}
function AboutUsScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.AboutUsScreen}>
          <Image style={styles.image}
            resizeMode="contain"
            fadeDuration={3000}
            source={require('./App/assets/ourworkimg.jpg')}
          />
          <Text style={styles.titles}>HOW WE STARTED</Text>
          <Text style={styles.AboutUsScreentxt}>
            Learning Space started in 2014 as a charitable organization by conviction. The founder being an engineer, academia and trainer with 20+ years of experience in the IT industry in the US and India and IIIT-H, our journey started as the training cum implementation partner for a 2-year Science, Technology, Engineering and Mathematics (STEM) project for 16 Rainbow Homes in the twin cities of Hyderabad and Secunderabad. This project aimed at improving learning abilities of ~1300 children taking shelter in these orphanages using technology aided teaching and learning.

            Later, we handled training and implementation of another STEM project for about 12,000 less privileged students studying at 88 government primary, upper-primary and high schools of Nampally and Khairatabad Mandals in Hyderabad. We also worked with some other NGOs such as Move the Wheel Foundation, Association for Promoting Social Action (APSA) and Suma Niketan in the field of education.
          </Text>
          <Text style={styles.titles}>HOW FOCUS SHIFTED TO PREVENTION OF CSA.</Text>
          <Image style={styles.image}
            fadeDuration={3000}
            source={require('./App/assets/ourwork2.jpg')}
          />
          <Text style={styles.AboutUsScreentxt}>
            During that period, a child sexual abuse crisis came to light which made us wonder why services were only available after a child was abused. Also, there is a lot stigma around this issue which makes the survivors suffer in silence and which makes the perpetrators take advantage of this stigma and silence. Our founder asked herself a question: “what can I do to prevent abuse and keep children safe?” She mobilized a few volunteers to create an initiative around educating children about personal safety. In Dec 2018, Learning Space Foundation was registered as a public charitable trust. We then mobilized more like-minded people and started working with students from various schools for one year, until pandemic occurred. There was no access to children due to the lockdowns and schools having online classes etc. The Child helpline in India received many calls from children and it triggered a lot of conversations around safety of children who are trapped at homes along with their abusers. That is when we realized the need to find other ways to stop child sexual abuse. Also, as abuse is a power dynamic where more powerful person forces themselves upon a less powerful person, children being less powerful, educating them to protect themselves is really not enough. As adults are legally and morally responsible for the health and safety of the children, burden of prevention and protection is the responsibility of adults. So, we refined our mission to include adult education, we started our flagship training, ‘Sreyobhilaashi.’ We aim to empower adults and organizations to bring best practices in child safety in their own communities.

            While were working with schools, another incident came to light. Chotu (name changed to protect privacy) is an intelligent youth, but unaware of the child marriage act and POCSO, married a minor girl against elders’ wish and landed in jail. Most of them being first generation learners, they have little knowledge about law and how their actions and decisions can destroy their dignity and future. So, we realized the need to create awareness among adolescents about laws related to them.

            We envision a world where child sexual abuse does not exist and children live with dignity. We believe prevention is possible if we all come together. We dream of the day that adults have formed prevention-oriented communities where children’s rights to a safe childhood are protected.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CoursesScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const newData = sampleCourses.filter(course => {
        const courseData = course.name.toUpperCase();
        const textData = text.toUpperCase();
        return courseData.indexOf(textData) > -1;
      });
      setFilteredCourses(newData);
    } else {
      setFilteredCourses(sampleCourses);
    }
  };

  const handleCoursePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Find..."
          value={query}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredCourses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCoursePress(item.screen)}>
              <Text style={styles.courseItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

function ResourcesScreen() {
  return (
    <View style={styles.ResourcesScreen}>
      <Text>Resource Screen</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const handleDonatePress = () => {
    Alert.alert(
      "Want to explore more about the Learning Space Foundation?",
      null,
      [
        {
          text: 'Absolutely',
          onPress: () => Linking.openURL('https://www.youtube.com/watch?v=pHekp0tRrDA&pp=ygUibGVhcm5pbmcgc3BhY2UgZm91bmRhdGlvbiBoeWRyYWJhZA%3D%3D')
        },
        { text: 'No, thanks.' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleDonatePress} style={styles.touchableOpacity}>
            <Image
              fadeDuration={3000}
              source={require('./App/assets/Learning-Space-Logo-for-WebSite-Yellow.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.text}>
            Learning Space Foundation is a registered public charitable trust striving to advance children’s and women’s rights for safety, education and health, thus creating a lasting impact in the lives of vulnerable children, women and their communities.

            Our major focus area is prevention of Child Sexual Abuse (CSA). We provide personal safety education to children and empower adults to prevent, recognize, and react responsibly to child sexual abuse through awareness, education, and stigma reduction.

            Our other areas of work include menstrual hygiene management, supporting education and raising awareness on mental health & safety of women. We conduct various awareness sessions, provide support with infrastructure and basic needs to the less privileged.
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('DonateScreen')} style={styles.donateButton}>
            <Text style={styles.donateButtonText}>Make A Diffrence</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="tan" />
    </SafeAreaView>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function CoursesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="Course1" component={Course1Screen} />
      <Stack.Screen name="Course2" component={Course2Screen} />
      <Stack.Screen name="Course3" component={Course3Screen} />
      <Stack.Screen name="Course4" component={Course4Screen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        style={styles.Home}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Courses" component={CoursesStack} />
        <Drawer.Screen name="DonateScreen" component={DonateScreen} />
        <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen} />
        <Drawer.Screen name="ResourcesScreen" component={ResourcesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tan',
    paddingVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'tan',
  },
  scrollView: {
    marginHorizontal: 5,
  },
  Home:{
    color:'tan'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'antiquewhite',
    marginBottom: 10,
    textAlign: 'center',
  },
  touchableOpacity: {
    padding: 10,
  },
  donateButton: {
    backgroundColor: 'wheat',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  donateButtonText: {
    color: 'black',
    fontSize: 16,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'tan',
  },
  searchBar: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'wheat',
  },
  courseItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
  },
  AboutUsScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tan',
    paddingTop: 0,
    margin: 0,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    paddingTop: 20,
    paddingBottom: 20,
  },
  AboutUsScreentxt: {
    fontSize: 16,
    color: 'antiquewhite',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Playwrite',
  },
  ResourcesScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tan',
    paddingTop: 10,
    margin: 20,
  },
  video: {
    width: '100%',
    height: 200,
  },
});

export default App;