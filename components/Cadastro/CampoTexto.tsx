import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export default function CampoTexto(props: TextInputProps) {
  return <TextInput style={styles.input} placeholderTextColor="#999" {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ffc8dd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
  },
});