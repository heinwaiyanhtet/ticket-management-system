import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState(''); // Added state for name
  const [department, setDepartment] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleLogin = async () => {
      try{
          // Storing the user data including name
          await AsyncStorage.setItem('employeeId', employeeId);
          await AsyncStorage.setItem('name', name); // Save name
          await AsyncStorage.setItem('department', department);
          await AsyncStorage.setItem('birthday', birthday); 

          Alert.alert('Success', 'Employee information saved successfully!');

          router.push('/');
      }catch(error){
          console.error('Error saving data:', error);
      }
  };

  return (
    <LinearGradient
      colors={['#6200ea', '#03dac6']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Employee Login</Text>

            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="account" />} 
            />

            
            <TextInput
              label="Employee ID"
              value={employeeId}
              onChangeText={setEmployeeId}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="account" />} 
            />

            {/* Added Name Input */}
          

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Department</Text>
              <Picker
                selectedValue={department}
                onValueChange={(itemValue) => setDepartment(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Department" value="" />
                <Picker.Item label="HR" value="HR" />
                <Picker.Item label="Finance" value="Finance" />
                <Picker.Item label="IT" value="IT" />
                <Picker.Item label="Marketing" value="Marketing" />
                <Picker.Item label="Sales" value="Sales" />
              </Picker>
            </View>

            <TextInput
              label="Birthday"
              value={birthday}
              onChangeText={setBirthday}
              style={styles.input}
              mode="outlined"
              placeholder="YYYY-MM-DD"
              left={<TextInput.Icon icon="calendar" />} 
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              labelStyle={styles.buttonLabel}
            >
              Login
            </Button>
          </Card.Content>
        </Card>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    backgroundColor: '#ffffffcc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
    borderColor: '#6200ea',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  pickerLabel: {
    paddingLeft: 10,
    paddingTop: 10,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  loginButton: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6200ea',
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
