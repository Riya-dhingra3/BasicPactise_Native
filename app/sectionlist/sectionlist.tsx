import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const App = () => (
  <View style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      renderSectionHeader={({ section }) => (
        <Text style={styles.header}>{section.title}</Text>
      )}
      renderSectionFooter={({ section }) => (
        <Text style={styles.footer}>End of {section.title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      ListHeaderComponent={() => <Text style={styles.listHeader}>Menu</Text>}
      ListFooterComponent={() => <Text style={styles.listFooter}>End of Menu</Text>}
      stickySectionHeadersEnabled
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  footer: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#eee',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  sectionSeparator: {
    height: 4,
    backgroundColor: '#000',
  },
  listHeader: {
    fontSize: 24,
    padding: 10,
    backgroundColor: '#f9c2ff',
  },
  listFooter: {
    fontSize: 24,
    padding: 10,
    backgroundColor: '#f9c2ff',
  },
});

export default App;
