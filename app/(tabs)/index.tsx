import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
  criadaEm: string;
};

const STORAGE_KEY = '@tarefas';

export default function ListaDeAfazeres() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [texto, setTexto] = useState('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  useEffect(() => {
    salvarTarefas(tarefas);
  }, [tarefas]);

  async function carregarTarefas() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados) setTarefas(JSON.parse(dados));
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error);
    }
  }

  async function salvarTarefas(lista: Tarefa[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (error) {
      console.log('Erro ao salvar tarefas:', error);
    }
  }

  function adicionarTarefa() {
    if (texto.trim() === '') return;

    const novaTarefa = {
      id: uuid.v4(),
      titulo: texto,
      concluida: false,
      criadaEm: new Date().toISOString(),
    };

    setTarefas([novaTarefa, ...tarefas]);
    setTexto('');
  }

  function concluirTarefa(id: string) {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  }

  function excluirTarefa(id: string) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Tarefas</Text>
      <Link href="/cadastro" style={{ marginBottom: 16, color: '#cdb4db', fontWeight: '600' }}>
  Ir para Cadastro →
</Link>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity onPress={adicionarTarefa} style={styles.botaoAdicionar}>
          <Ionicons name="add-circle" size={36} color="#cdb4db" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tarefaItem}>
            <TouchableOpacity onPress={() => concluirTarefa(item.id)} style={styles.tarefaConteudo}>
              <Ionicons
                name={item.concluida ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={item.concluida ? '#cdb4db' : '#999'}
              />
              <View style={styles.tarefaTextos}>
                <Text style={[styles.tarefaTitulo, item.concluida && styles.tarefaConcluida]}>
                  {item.titulo}
                </Text>
                <Text style={styles.tarefaData}>
                  Criada em {dayjs(item.criadaEm).format('DD/MM/YYYY [às] HH:mm')}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => excluirTarefa(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#E53935" />
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ffc8dd', borderRadius: 8, padding: 10, marginRight: 8 },
  botaoAdicionar: { justifyContent: 'center'},
  tarefaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffc8dd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  tarefaConteudo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  tarefaTextos: { marginLeft: 10 },
  tarefaTitulo: { fontSize: 16 },
  tarefaConcluida: { textDecorationLine: 'line-through', color: '#999' },
  tarefaData: { fontSize: 12, color: '#777', marginTop: 2 },
});