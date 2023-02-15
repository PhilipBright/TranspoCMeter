import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#772ea2"
      barStyle="light-content"/>
      <Text>Hi</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC6F9',
    
  },
});
