import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Button = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  text: { color: 'white', fontWeight: 'bold' },
});
