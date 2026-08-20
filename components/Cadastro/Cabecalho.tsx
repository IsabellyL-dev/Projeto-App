import { View, Text, StyleSheet } from 'react-native';

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>To-Do-List</Text>
      <Text style={styles.subtitulo}>Cadastro de Usuário</Text>
      <Text style={styles.subtitulo}>Preencha seus dados para continuar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24, alignItems: 'center' },
  titulo: { fontSize: 40, fontWeight: 'bold', color: '#ffafcc'},
  subtitulo: { fontSize: 16, color: '#030303', marginTop: 4 },
});