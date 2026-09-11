import { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native';
import Cabecalho from '../components/Cadastro/Cabecalho';
import DadosPessoaisForm from '../components/Cadastro/DadosPessoaisForm';
import DadosAcessoForm from '../components/Cadastro/DadosAcessoForm';
import BotaoCadastrar from '../components/Cadastro/BotaoCadastrar';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [campoAtivo, setCampoAtivo] = useState(false);
  const [mensagem, setMensagem] = useState('');

  function handleCadastro() {
    console.log({ nome, email, telefone, dataNascimento, cpf, senha, confirmarSenha });
    setMensagem('Cadastro realizado');
  }

  function handleLongPress() {
    console.log('Pressão prolongada');
  }

  function handleFocus() {
    setCampoAtivo(true);
  }

  function handleBlur() {
    setCampoAtivo(false);
  }

  function handleSubmit() {
    console.log('Campo enviado');
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Cabecalho />
      <View style={styles.form}>
        <DadosPessoaisForm
          nome={nome} setNome={setNome}
          telefone={telefone} setTelefone={setTelefone}
          dataNascimento={dataNascimento} setDataNascimento={setDataNascimento}
          cpf={cpf} setCpf={setCpf}
        />
        <DadosAcessoForm
          email={email} setEmail={setEmail}
          senha={senha} setSenha={setSenha}
          confirmarSenha={confirmarSenha} setConfirmarSenha={setConfirmarSenha}
        />

        <BotaoCadastrar onPress={handleCadastro} />
        {mensagem !== '' && (
          <View style={styles.popup}>
            <Text style={styles.popupTexto}>{mensagem}</Text>
          </View>
        )}

        <Pressable onPress={handleCadastro} onLongPress={handleLongPress}>
        
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fff' },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  form: { width: '100%' },
  popup: {
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  popupTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});