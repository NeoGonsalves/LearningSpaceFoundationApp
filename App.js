import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, View, Alert, TouchableOpacity, ScrollView, Linking } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
            resizeMode="contain"
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

function SettingsScreen() {
  return (
    <View style={styles.centered}>
      <Text>Settings!</Text>
    </View>
  );
}

function CoursesScreen() {
  return (
    <View style={styles.courses}>
    <YoutubePlayer
      height={300}
      play={true}
      videoId={'E5_ccmHk_TY?si=DVIyXsPDo2xmL1q2'}
    />
  </View>
  );
}

function ResourcesScreen() {
  return (
    <View style={styles.centered}>
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

  const handlePaymentPress = () => {
    Alert.alert(
      "You wish to be redirected to a Payment gateway:",
      null,
      [
        {
          text: 'Agree',
          onPress: () => Linking.openURL('https://learningspace.co.in/become-a-donor/')
        },
        { text: 'No' }
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

          <TouchableOpacity onPress={handlePaymentPress} style={styles.button}>
            <Text style={styles.buttonText}>Make a Difference</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="tan" />
    </SafeAreaView>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} style={styles.Hometab} />
      <Tab.Screen name="Courses" component={CoursesScreen} style={styles.coursetab} />
      <Tab.Screen name="Settings" component={SettingsScreen} style={styles.settingstab} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'tan',
          },
          headerStyle: {
            backgroundColor: 'tan',
          },
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={MyTabs}/>
        <Drawer.Screen name="About Us" component={AboutUsScreen} />
        <Drawer.Screen name="Resources" component={ResourcesScreen} />
        <Drawer.Screen name="Courses" component={CoursesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: 'tan',
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
  },
  coursestxt: {
    fontSize: 16,
    color: 'antiquewhite',
    marginBottom: 20,
    textAlign: 'center',
  },
  ResourcesScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tan',
    paddingTop: 10,
    margin: 20,
  },
  ResourcesScreentxt: {
    fontSize: 16,
    color: 'antiquewhite',
    marginBottom: 20,
    textAlign: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'tan',
  },
  scrollView: {
    marginHorizontal: 5,
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
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  touchableOpacity: {
    padding: 10,
  },
  button: {
    backgroundColor: 'wheat',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
