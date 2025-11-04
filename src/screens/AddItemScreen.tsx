import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useShopStore } from '../store/useShopStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AddItem'>;

export default function AddItemScreen({ route, navigation }: Props) {
  const { listId } = route.params;
  const addItem = useShopStore((s) => s.addItem);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
                                                                                                
  const canSave = name.trim().length > 0 && Number(quantity) > 0;                                     

  const onSave = () => {
    if (!canSave) return;
    addItem(listId, name.trim(), Number(quantity));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g., Milk"
        style={styles.input}
        autoFocus
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        placeholder="1"
        keyboardType="number-pad"
        style={styles.input}
      />
      <Pressable onPress={onSave} style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]} disabled={!canSave}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  label: { marginTop: 12, marginBottom: 6, color: '#374151' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnDisabled: { backgroundColor: '#9ca3af' },
  saveText: { color: '#fff', fontWeight: '600' },
});


