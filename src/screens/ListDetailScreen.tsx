import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useShopStore } from '../store/useShopStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ListDetail'>;

export default function ListDetailScreen({ route, navigation }: Props) {
  const { listId } = route.params;
  const list = useShopStore((s) => s.lists.find((l) => l.id === listId));
  const toggleItem = useShopStore((s) => s.toggleItem);
  const removeItem = useShopStore((s) => s.removeItem);

  useLayoutEffect(() => {
    navigation.setOptions({ title: list?.name ?? 'List' });
  }, [navigation, list?.name]);

  if (!list) {
    return (
      <View style={styles.center}> 
        <Text>List not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list.items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={list.items.length === 0 ? styles.center : undefined}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Pressable onPress={() => toggleItem(listId, item.id)} style={styles.checkbox}>
              <Text style={styles.checkboxText}>{item.checked ? '✓' : ''}</Text>
            </Pressable>
            <Text style={[styles.itemText, item.checked && styles.itemChecked]}>{item.name}</Text>
            <Text style={styles.qty}>×{item.quantity}</Text>
            <Pressable onPress={() => removeItem(listId, item.id)} style={styles.removeBtn}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#666' }}>No items. Add some.</Text>}
      />
      <Pressable style={styles.fab} onPress={() => navigation.navigate('AddItem', { listId })}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxText: { fontSize: 16 },
  itemText: { flex: 1, fontSize: 16 },
  itemChecked: { textDecorationLine: 'line-through', color: '#9ca3af' },
  qty: { marginRight: 12, color: '#374151' },
  removeBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  removeText: { color: '#ef4444' },
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


