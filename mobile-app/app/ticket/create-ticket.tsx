import { SafeAreaView } from 'react-native-safe-area-context';
import * as React from 'react';
import { List, Card, Text, RadioButton, Button } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CreateTicket() {
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<Record<string, string | null>>({
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
  });

  React.useEffect(() => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = daysOfWeek[new Date().getDay()];
    setExpanded(today);
  }, []);

  const handlePress = (day: string) => {
    setExpanded(expanded === day ? null : day);
  };

  const handleSelection = (day: string, item: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [day]: item,
    }));
  };

  const renderListItem = (day: string, item: string) => {
    const isSelected = selectedItems[day] === item;

    return (
      <List.Item
        title={item}
        style={styles.listItem}
        onPress={() => handleSelection(day, item)}
        right={() => (
          <RadioButton
            value={item}
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => handleSelection(day, item)}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Card style={styles.weekMenuCard}>
          <Card.Content>
            <Text style={styles.weekMenuTitle}>Choose Your Meals</Text>
          </Card.Content>
        </Card>

        <View style={styles.accordionContainer}>
          <List.Section title="Meals for the Week" titleStyle={styles.accordionTitle}>

            <List.Accordion
                title="Monday"
                left={props => <MaterialCommunityIcons {...props} name="food-drumstick" size={24} color="#6200ea" />}
                expanded={expanded === 'Monday'}
                onPress={() => handlePress('Monday')}
                style={styles.accordion}>
                {renderListItem('Monday', 'Beef')}
                {renderListItem('Monday', 'Egg')}
            </List.Accordion>

            <List.Accordion
                title="Tuesday"
                left={props => <MaterialCommunityIcons {...props} name="food-apple" size={24} color="#6200ea" />}
                expanded={expanded === 'Tuesday'}
                onPress={() => handlePress('Tuesday')}
                style={styles.accordion}>
                {renderListItem('Tuesday', 'Beef')}
                {renderListItem('Tuesday', 'Egg')}
            </List.Accordion>

            <List.Accordion
                title="Wednesday"
                left={props => <MaterialCommunityIcons {...props} name="food" size={24} color="#6200ea" />}
                expanded={expanded === 'Wednesday'}
                onPress={() => handlePress('Wednesday')}
                style={styles.accordion}>
                {renderListItem('Wednesday', 'Beef')}
                {renderListItem('Wednesday', 'Egg')}
            </List.Accordion>

            <List.Accordion
                title="Thursday"
                left={props => <MaterialCommunityIcons {...props} name="food-steak" size={24} color="#6200ea" />}
                expanded={expanded === 'Thursday'}
                onPress={() => handlePress('Thursday')}
                style={styles.accordion}>
                {renderListItem('Thursday', 'Beef')}
                {renderListItem('Thursday', 'Egg')}
            </List.Accordion>

            <List.Accordion
                title="Friday"
                left={props => <MaterialCommunityIcons {...props} name="food-fork-drink" size={24} color="#6200ea" />}
                expanded={expanded === 'Friday'}
                onPress={() => handlePress('Friday')}
                style={styles.accordion}>
                {renderListItem('Friday', 'Beef')}
                {renderListItem('Friday', 'Egg')}
            </List.Accordion>

            <List.Accordion
                title="Saturday"
                left={props => <MaterialCommunityIcons {...props} name="food-turkey" size={24} color="#6200ea" />}
                expanded={expanded === 'Saturday'}
                onPress={() => handlePress('Saturday')}
                style={styles.accordion}>
                {renderListItem('Saturday', 'Beef')}
                {renderListItem('Saturday', 'Egg')}
            </List.Accordion>

          </List.Section>

          <Button
            mode="contained"
            onPress={() => console.log('Selected Items:', selectedItems)}
            style={styles.chooseMenuButton}
          >
            Choose Menu
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 16,
    flexGrow: 1,
  },
  weekMenuCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  weekMenuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  accordionContainer: {
    flex: 1,
  },
  accordionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  accordion: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  listItem: {
    backgroundColor: '#f5f5f5',
    paddingLeft: 16,
  },
  chooseMenuButton: {
    marginTop: 16,
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 8,
  },
});
