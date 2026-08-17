import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const pacotes = [
  { nome: '@expo/vector-icons', icone: 'apps-outline' as const },
  { nome: 'react-native-uuid', icone: 'finger-print-outline' as const },
  { nome: 'dayjs', icone: 'calendar-outline' as const },
  { nome: '@react-native-async-storage/async-storage', icone: 'save-outline' as const },
  { nome: 'react-native-reanimated', icone: 'sparkles-outline' as const },
];

export default function Tecnologias() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tecnologias utilizadas</Text>
      {pacotes.map((pacote) => (
        <View key={pacote.nome} style={styles.item}>
          <Ionicons name={pacote.icone} size={22} color="#cdb4db" />
          <Text style={styles.itemTexto}>{pacote.nome}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemTexto: { marginLeft: 10, fontSize: 15 },
});