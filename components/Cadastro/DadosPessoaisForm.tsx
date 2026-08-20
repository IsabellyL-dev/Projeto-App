import { View, Text, StyleSheet } from 'react-native';
import CampoTexto from './CampoTexto';

type Props = {
  nome: string;
  setNome: (v: string) => void;
  telefone: string;
  setTelefone: (v: string) => void;
  dataNascimento: string;
  setDataNascimento: (v: string) => void;
  cpf: string;
  setCpf: (v: string) => void;
};

export default function DadosPessoaisForm({
  nome, setNome,
  telefone, setTelefone,
  dataNascimento, setDataNascimento,
  cpf, setCpf,
}: Props) {
  return (
    <View style={styles.secao}>
      <Text style={styles.tituloSecao}>Dados Pessoais</Text>
      <CampoTexto placeholder="Nome completo" value={nome} onChangeText={setNome} />
      <CampoTexto placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <CampoTexto placeholder="Data de nascimento (DD/MM/AAAA)" value={dataNascimento} onChangeText={setDataNascimento} keyboardType="numeric" />
      {/* <CampoTexto placeholder="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { marginBottom: 20 },
  tituloSecao: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
});