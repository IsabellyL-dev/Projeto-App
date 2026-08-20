import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Nota = {
  id: string;
  titulo: string;
  conteudo: string;
  criadaEm: string;
};

const STORAGE_KEY = '@notas';

export default function BlocoDeNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    carregarNotas();
  }, []);

  useEffect(() => {
    salvarNotas(notas);
  }, [notas]);

  async function carregarNotas() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados) setNotas(JSON.parse(dados));
    } catch (error) {
      console.log('Erro ao carregar notas:', error);
    }
  }

  async function salvarNotas(lista: Nota[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (error) {
      console.log('Erro ao salvar notas:', error);
    }
  }

  function adicionarNota() {
    if (titulo.trim() === '' && conteudo.trim() === '') return;

    const novaNota: Nota = {
      id: uuid.v4().toString(),
      titulo: titulo.trim() === '' ? 'Sem título' : titulo,
      conteudo,
      criadaEm: new Date().toISOString(),
    };

    setNotas([novaNota, ...notas]);
    setTitulo('');
    setConteudo('');
  }

  function excluirNota(id: string) {
    setNotas(notas.filter(nota => nota.id !== id));
  }

  return (
    <View style={styles.container}>
      <Link href="/" style={styles.link}>← Voltar para Tarefas</Link>

      <Text style={styles.titulo}>Bloco de Notas</Text>

      <View style={styles.formNota}>
        <TextInput
          style={styles.inputTitulo}
          placeholder="Título da nota"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.inputConteudo}
          placeholder="Escreva sua anotação..."
          value={conteudo}
          onChangeText={setConteudo}
          multiline
        />
        <TouchableOpacity onPress={adicionarNota} style={styles.botaoAdicionar}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.textoBotaoAdicionar}>Salvar Nota</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.notaItem}>
            <View style={styles.notaCabecalho}>
              <Text style={styles.notaTitulo}>{item.titulo}</Text>
              <TouchableOpacity onPress={() => excluirNota(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#E53935" />
              </TouchableOpacity>
            </View>
            {item.conteudo !== '' && (
              <Text style={styles.notaConteudo}>{item.conteudo}</Text>
            )}
            <Text style={styles.notaData}>
              {dayjs(item.criadaEm).format('DD/MM/YYYY [às] HH:mm')}
            </Text>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  link: { color: '#cdb4db', fontWeight: '600', marginBottom: 12 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  formNota: { marginBottom: 20 },
  inputTitulo: {
    borderWidth: 1,
    borderColor: '#ffc8dd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputConteudo: {
    borderWidth: 1,
    borderColor: '#ffc8dd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  botaoAdicionar: {
    flexDirection: 'row',
    backgroundColor: '#cdb4db',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  textoBotaoAdicionar: { color: '#fff', fontWeight: 'bold' },
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