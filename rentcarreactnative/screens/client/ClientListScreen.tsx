import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigation/DrawerNavigator';
import { Ionicons } from '@expo/vector-icons';

type Props = DrawerScreenProps<DrawerParamList, 'ClientList'>;

type Client = {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
};

const ClientListScreen = ({ navigation }: Props) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função para formatar CPF
  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Buscar clientes da API
  const fetchClients = async () => {
    try {
      const response = await fetch('http://192.168.1.100:8000/api/clientes/');
      const data = await response.json();
      
      if (response.ok) {
        setClients(data);
      } else {
        throw new Error(data.detail || 'Erro ao carregar clientes');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de clientes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Atualizar lista quando a tela ganhar foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchClients();
    });

    return unsubscribe;
  }, [navigation]);

  // Excluir cliente
  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este cliente?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const response = await fetch(
                `http://192.168.1.100:8000/api/clientes/${id}/`,
                {
                  method: 'DELETE',
                }
              );

              if (response.ok) {
                fetchClients(); // Recarrega a lista após exclusão
                Alert.alert('Sucesso', 'Cliente excluído com sucesso');
              } else {
                throw new Error('Erro ao excluir cliente');
              }
            } catch (error) {
              console.error('Erro:', error);
              Alert.alert('Erro', 'Não foi possível excluir o cliente');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Renderizar cada item da lista
  const renderItem = ({ item }: { item: Client }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditClient', { client: item })}
          >
            <Ionicons name="pencil" size={20} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash" size={20} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>CPF: </Text>
          {formatCPF(item.cpf)}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>CNH: </Text>
          {item.cnh}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Clientes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateClient')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loading} />
      ) : (
        <FlatList
          data={clients}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchClients();
              }}
              colors={['#3498db']}
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum cliente cadastrado</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#27ae60',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  loading: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default ClientListScreen;