import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TicketListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.infoTitle}>Ticket Information</Text>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="person" size={20} color="#6200ea" style={styles.icon} />
            <Text style={styles.infoItem}><Text style={styles.label}>Person:</Text> John Doe</Text>
          </View>
          <Divider style={styles.divider} />
          
          <View style={styles.infoRow}>
            <FontAwesome5 name="building" size={18} color="#6200ea" style={styles.icon} />
            <Text style={styles.infoItem}><Text style={styles.label}>Department:</Text> HR</Text>
          </View>
          <Divider style={styles.divider} />
          
          <View style={styles.infoRow}>
            <MaterialIcons name="restaurant-menu" size={20} color="#6200ea" style={styles.icon} />
            <Text style={styles.infoItem}><Text style={styles.label}>Menu:</Text> Beef, Egg</Text>
          </View>
          <Divider style={styles.divider} />
          
          <View style={styles.infoRow}>
            <MaterialIcons name="qr-code-scanner" size={20} color="#6200ea" style={styles.icon} />
            <Text style={styles.infoItem}><Text style={styles.label}>QR Scanned:</Text> Yes</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.listContainer}>
        <Button
          icon={() => <MaterialIcons name="add" size={24} color="white" />}
          mode="contained"
          style={styles.fullWidthButton}
          labelStyle={styles.buttonLabel}
          onPress={() => router.push('/ticket/create-ticket')}
        >
          Create Ticket
        </Button>

        <Button
          icon={() => <MaterialIcons name="qr-code-scanner" size={24} color="white" />}
          mode="contained"
          style={[styles.fullWidthButton, styles.scanButton]}
          contentStyle={{ justifyContent: 'flex-start', paddingLeft: 102 }}
          labelStyle={styles.buttonLabel}
          onPress={() => router.push('/ticket/scan-qr')}
        >
          Scan QR
        </Button>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  infoCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 4, // Add elevation for shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    paddingVertical: 12, 
  },
  icon: {
    marginRight: 8,
  },
  infoItem: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#6200ea',
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  fullWidthButton: {
    marginBottom: 16,
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    justifyContent: 'center',
    borderRadius: 8,
    width: '100%',
    elevation: 3, 
  },
  scanButton: {
    backgroundColor: '#03dac5', 
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
