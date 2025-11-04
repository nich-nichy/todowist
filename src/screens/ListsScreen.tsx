import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useShopStore } from '../store/useShopStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Lists'>;

export default function ListsScreen({ navigation }: Props) {
  const lists = useShopStore((s) => s.lists);
  const addList = useShopStore((s) => s.addList);

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(l) => l.id}
        contentContainerStyle={lists.length === 0 ? styles.emptyContainer : undefined}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('ListDetail', { listId: item.id })}
            style={styles.listItem}
          >
            <Text style={styles.listTitle}>{item.name}</Text>
            <Text style={styles.listSubtitle}>{item.items.length} items</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No lists yet. Create one to get started.</Text>}
      />

      <Pressable style={styles.fab} onPress={() => addList()}> 
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listItem: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  listTitle: { fontSize: 16, fontWeight: '600' },
  listSubtitle: { marginTop: 4, color: '#666' },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyText: { color: '#666' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 28, marginTop: -2 },
});


