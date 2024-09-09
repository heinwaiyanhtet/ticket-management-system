import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScanQr() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  // const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) 
{
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function handleBarcodeScanned({ data } : any) {

    setScanned(true);

    if (data.includes("Mahar_lunch"))
      {
      try {

        // await delay(10000);

        router.replace('/');
        await AsyncStorage.setItem('scannedStatus', "true"); 

        // Example API call when "Mahar_lunch" is detected
        // const response = await axios.post('https://your-api-endpoint.com/mahar-lunch', {
        //   scannedData: data,
        // });
        
        // // Assuming a successful API call returns a status of 200
        // if (response.status === 200) {
        //   Alert.alert("Success", "Redirecting...", [
        //     {
        //       text: "OK",
        //       onPress: () => {
        //         navigation.navigate('/'); // Navigating to the index.tsx screen
        //       },
        //     },
        //   ]);
        // }


      } catch (error) {
        
        console.error(error);
        // await delay(10000);
        
        // Alert.alert("API Error", "Failed to process Mahar_lunch");

      }
    } 
    else {

      Alert.alert("Invalid qr");
      await delay(10000);

    }

    // Reset scanned state to allow further scanning
    setScanned(false);


  }
const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <CameraView 
          style={styles.camera} 
          facing={facing}
          // onBarcodeScanned={({ data }) => {
          //   if (!scanned) {
          //     setScanned(true);
          //     console.log(data);
          //   }
          // }}

          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}

        >
          <View style={styles.overlay}>
            <View style={styles.topOverlay} />
            <View style={styles.middleOverlay}>
              <View style={styles.sideOverlay} />
              <View style={styles.scannerFrame} />
              <View style={styles.sideOverlay} />
            </View>
            <View style={styles.bottomOverlay} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </SafeAreaView>
  );
}

const overlayColor = 'rgba(0, 0, 0, 0.5)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },
  middleOverlay: {
    flexDirection: 'row',
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },
  
});
