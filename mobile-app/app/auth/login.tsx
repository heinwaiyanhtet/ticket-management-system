import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleLogin = () => {
    console.log({ employeeId, department, birthday });
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
              label="Employee ID"
              value={employeeId}
              onChangeText={setEmployeeId}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="account" />} 
            />

            <TextInput
              label="Department"
              value={department}
              onChangeText={setDepartment}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="office-building" />} 
            />

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
