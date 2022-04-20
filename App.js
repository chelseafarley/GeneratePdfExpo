// The following need to be installed
// expo install expo-print
// expo install expo-sharing

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function App() {
  let [name, setName] = useState("");

  const html = `
    <html>
      <body>
        <h1>Hi ${name}</h1>
        <p style="color: red;">Hello. Bonjour. Hola.</p>
      </body>
    </html>
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <TextInput value={name} placeholder="Name" style={styles.textInput} onChangeText={(value) => setName(value)} />
      <Button title="Generate PDF" onPress={generatePdf} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: "stretch",
    padding: 8,
    margin: 8
  }
});
