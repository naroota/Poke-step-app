import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function App() {
  const [steps, setSteps] = useState(0);
  const [pokemon, setPokemon] = useState('Magikarp');

  useEffect(() => {
    const subscription = Pedometer.watchStepCount(result => {
      setSteps(result.steps);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (steps >= 2000) {
      setPokemon('Gyarados');
    } else {
      setPokemon('Magikarp');
    }
  }, [steps]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon: {pokemon}</Text>
      <Text style={styles.steps}>Steps: {steps}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, marginBottom: 20 },
  steps: { fontSize: 22 }
});
