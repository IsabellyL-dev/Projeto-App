
import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
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

  function handleCadastro() {
    console.log({ nome, email, telefone, dataNascimento, cpf, senha, confirmarSenha });
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
     scroll: { flex: 1, backgroundColor: '#fff' },
  container: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40},
  form: { width: '100%' },
});