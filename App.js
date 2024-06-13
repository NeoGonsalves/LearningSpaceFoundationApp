import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, View, Alert, TouchableOpacity, ScrollView, Linking } from 'react-native';

export default function App() {
  const handleDonatePress = () => {
    Alert.alert(
      
      "Do You Wish to know more about learning space foundation Through a Youtube video",
      null,
      
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL('https://www.youtube.com/watch?v=pHekp0tRrDA&pp=ygUibGVhcm5pbmcgc3BhY2UgZm91bmRhdGlvbiBoeWRyYWJhZA%3D%3D')
        },
        { text: 'Exit' }
      ]
    );
  };

  const handlePaymentPress = () => {
    Alert.alert(
      "You wish to be redirected to a Payment gateway:",
      null,
      [
        { text: 'Agree',},// onPress: () => Linking.openURL('') 
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
              fadeDuration={5000}
              source={require("./assets/Learning-Space-Logo-for-WebSite-Yellow.png")}
              style={styles.image}
              resizeMode="contain" // You can change this to "cover", "stretch", etc.
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
            <Text style={styles.buttonText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'dodgerblue',
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
    color: 'black',
    marginBottom: 20,
    padding: 10, // Add padding to the text component
  },
  image: {
    width: 300, // Set the width of the image
    height: 200, // Set the height of the image
    marginBottom: 20, // Add margin to separate the image from other elements
  },
  touchableOpacity: {
    padding: 10, // Add padding to the TouchableOpacity component
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black', // Set the text color
    fontSize: 16,
  },
});