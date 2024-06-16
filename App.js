import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, View, Alert, TouchableOpacity, ScrollView, Linking } from 'react-native';

const Drawer = createDrawerNavigator();

function AboutUsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>About Us Screen</Text>
    </View>
  );
}

function OurWorkScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Our Work Screen</Text>
    </View>
  );
}

function ResourcesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Resources Screen</Text>
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
          text: 'Absolutly',
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
        { text: 'Agree' }, // onPress: () => Linking.openURL('') 
        { text: 'No' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleDonatePress}
            style={styles.touchableOpacity}
          >
            <Image
              fadeDuration={3000}
              source={require('./App/assets/Learning-Space-Logo-for-WebSite-Yellow.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.text}>
            Learning Space Foundation is a registered public charitable trust striving to advance children’s and women’s rights for safety, education and health, 
            thus creating a lasting impact in the lives of vulnerable children, women and their communities.

            Our major focus area is prevention of Child Sexual Abuse (CSA). We provide personal safety education to children and 
            empower adults to prevent, recognize, and react responsibly to child sexual abuse through awareness, 
            education, and stigma reduction.

            Our other areas of work include menstrual hygiene management, supporting education and raising awareness on 
            mental health & safety of women. We conduct various awareness sessions, provide support with infrastructure and 
            basic needs to the less privileged.
          </Text>
          
          <TouchableOpacity
            onPress={handlePaymentPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Make a Difference</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator style={styles.Home} initialRouteName="Home">
        <Drawer.Screen name="Home"   component={HomeScreen} />
        <Drawer.Screen name="About Us" component={AboutUsScreen} />
        <Drawer.Screen name="Resources" component={ResourcesScreen} />
        <Drawer.Screen name="Our Work"  component={OurWorkScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    color: 'antiquewhite',
    marginBottom: 20,
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
  Home:{
    color:'tan'
  }
});