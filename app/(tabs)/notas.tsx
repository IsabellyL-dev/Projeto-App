import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import uuid from 'react-native-uuid';
import { NotaCard } from '../../components/Notas/CardNotas';

type Nota = {
  id: string;
  titulo: string;
  conteudo: string;
  criadaEm: string;
}

const STORAGE_KEY = '@notas';

export default function BlocoDeNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [modoCompacto, setModoCompacto] = useState(false);
  const router = useRouter();

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

// Navegação programática (useRouter): usada dentro da função abrirDetalhes.
// A navegação acontece como consequência da lógica do código, disparada
// pelo onPress do TouchableOpacity "Abrir via useRouter".
 function abrirDetalhes(id: string) {
  router.push({
    pathname: '/detalhes/[id]',
    params: { id },
  });
}

  return (
    <View style={styles.container}>
      <Link href="/" style={styles.link}>← Voltar para Tarefas</Link>

      <Text style={styles.titulo}>Bloco de Notas</Text>

      <View style={styles.switchContainer}>
        <Text>Ocultar Conteúdo das Notas</Text>
        <Switch
          value={modoCompacto}
          onValueChange={setModoCompacto}
          trackColor={{ false: '#ffc8dd', true: '#cdb4db' }}
          thumbColor={modoCompacto ? '#cdb4db' : '#fff'}
          ios_backgroundColor="#ffc8dd"
        />
      </View>

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
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {/* Navegação declarativa (Link): o próprio componente já sabe
            para onde navegar via href, sem precisar de uma função */}
           <Link
            href={{
                pathname: '/detalhes/[id]',
                params: { id: item.id },
            }}
            asChild
            >
            <TouchableOpacity>
                <NotaCard
                titulo={item.titulo}
                conteudo={item.conteudo}
                criadaEm={item.criadaEm}
                onExcluir={() => excluirNota(item.id)}
                modoCompacto={modoCompacto}
                />
            </TouchableOpacity>
            </Link>
              {/* Navegação programática (useRouter): interação (toque) dispara
              a função abrirDetalhes, que chama router.push */}
            <TouchableOpacity onPress={() => abrirDetalhes(item.id)}>
              <Text style={styles.link}>Ver Detalhes</Text>
            </TouchableOpacity>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
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
});