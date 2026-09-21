import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

type Nota = {
  id: string;
  titulo: string;
  conteudo: string;
  criadaEm: string;
}

const STORAGE_KEY = '@notas';

export default function DetalhesNota() {
  const { id } = useLocalSearchParams();
  const [nota, setNota] = useState<Nota | null>(null);
  const router = useRouter();

  useEffect(() => {
    carregarNota();
  }, []);

  async function carregarNota() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados) {
        const notas: Nota[] = JSON.parse(dados);
        const encontrada = notas.find((n) => n.id === id);
        setNota(encontrada ?? null);
      }
    } catch (error) {
      console.log('Erro ao carregar nota:', error);
    }
  }

  if (!nota) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nota não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da nota</Text>
      <Text style={styles.campo}>Título: {nota.titulo}</Text>
      <Text style={styles.campo}>Conteúdo: {nota.conteudo}</Text>
      <Text style={styles.campo}>
        Criada em: {dayjs(nota.criadaEm).format('DD/MM/YYYY [às] HH:mm')}
      </Text>
      <Text style={styles.campo}>ID: {id}</Text>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.botaoVoltarTexto}>Voltar para as notas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#ffffff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  campo: { fontSize: 16, marginBottom: 8, backgroundColor: '#fff0f5', padding: 8, borderRadius: 4, borderWidth: 1, borderColor: '#ffc8dd' },
  botaoVoltar: {
    marginTop: 16,
    backgroundColor: '#cdb4db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  botaoVoltarTexto: { color: '#fff', fontWeight: 'bold' },
});