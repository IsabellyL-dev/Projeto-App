import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

type NotaCardProps = {
  titulo: string;
  conteudo: string;
  criadaEm: string;
  onExcluir: () => void;
  modoCompacto: boolean;
};

export function NotaCard({ titulo, conteudo, criadaEm, onExcluir, modoCompacto }: NotaCardProps) {
  return (
    <View style={styles.notaItem}>
      <View style={styles.notaCabecalho}>
        <Text style={styles.notaTitulo}>{titulo}</Text>
        <TouchableOpacity onPress={onExcluir}>
          <Ionicons name="trash-outline" size={20} color="#E53935" />
        </TouchableOpacity>
      </View>
      {!modoCompacto && conteudo !== '' && (
        <Text style={styles.notaConteudo}>{conteudo}</Text>
      )}
      {!modoCompacto && (
        <Text style={styles.notaData}>
          {dayjs(criadaEm).format('DD/MM/YYYY [às] HH:mm')}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notaItem: {
    backgroundColor: '#fff0f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffc8dd',
  },
  notaCabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notaTitulo: { fontSize: 16, fontWeight: 'bold' },
  notaConteudo: { fontSize: 14, color: '#555', marginTop: 4 },
  notaData: { fontSize: 11, color: '#999', marginTop: 6 },
});