import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditClient'>;

const EditClientScreen = ({ route, navigation }: Props) => {
  const { client } = route.params;
  const [nome, setNome] = useState(client.nome);
  const [cpf, setCpf] = useState(client.cpf);
  const [cnh, setCnh] = useState(client.cnh);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(client.nome);
    setCpf(client.cpf);
    setCnh(client.cnh);
  }, [client]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`http://127.0.0.1:8000/clientes/${client.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, cnh }),
      });
      navigation.navigate('ClientList');
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>
      
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      
      <Text style={styles.label}>CPF</Text>
      <TextInput
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>CNH</Text>
      <TextInput
        value={cnh}
        onChangeText={setCnh}
        style={styles.input}
        keyboardType="numeric"
      />
      
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <View style={styles.buttons}>
          <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
          <Button title="Cancelar" onPress={() => navigation.navigate('ClientList')} color="#6c757d" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  buttons: {
    marginTop: 16,
    gap: 8,
  },
});

export default EditClientScreen;