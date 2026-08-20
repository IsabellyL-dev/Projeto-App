import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function BotaoCadastrar({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed, hovered }) => [
        styles.botao,
        hovered && styles.botaoHover,
        pressed && styles.botaoPressionado,
      ]}
    >
      <Text style={styles.textoBotao}>Cadastrar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#cdb4db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoHover: {
    backgroundColor: '#b088c4', 
  },
  botaoPressionado: {
    backgroundColor: '#9a6fb0', 
  },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});