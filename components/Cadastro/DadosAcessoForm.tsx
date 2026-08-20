import { View, Text, StyleSheet } from 'react-native';
import CampoTexto from './CampoTexto';

type Props = {
  senha: string;
  setSenha: (v: string) => void;
  confirmarSenha: string;
  setConfirmarSenha: (v: string) => void;
  email:string;
  setEmail: (v: string) => void;
};

export default function DadosAcessoForm({ email, setEmail, senha, setSenha, confirmarSenha, setConfirmarSenha }: Props) {
  return (
    <View style={styles.secao}>
      <Text style={styles.tituloSecao}>Dados de Acesso</Text>
       <CampoTexto placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <CampoTexto placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <CampoTexto placeholder="Confirmar senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { marginBottom: 20 },
  tituloSecao: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
});