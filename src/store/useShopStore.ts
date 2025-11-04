import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid/non-secure';

export type ShopItem = {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
};

export type ShopList = {
  id: string;
  name: string;
  items: ShopItem[];
};

type ShopState = {
  lists: ShopList[];
  addList: () => void;
  removeList: (listId: string) => void;
  addItem: (listId: string, name: string, quantity: number) => void;
  toggleItem: (listId: string, itemId: string) => void;
  removeItem: (listId: string, itemId: string) => void;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      lists: [],
      addList: () =>
        set((state) => ({
          lists: [
            ...state.lists,
            { id: nanoid(), name: `List ${state.lists.length + 1}`, items: [] },
          ],
        })),
      removeList: (listId) => set((state) => ({ lists: state.lists.filter((l) => l.id !== listId) })),
      addItem: (listId, name, quantity) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? {
                  ...l,
                  items: [
                    ...l.items,
                    { id: nanoid(), name, quantity, checked: false },
                  ],
                }
              : l
          ),
        })),
      toggleItem: (listId, itemId) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? {
                  ...l,
                  items: l.items.map((it) =>
                    it.id === itemId ? { ...it, checked: !it.checked } : it
                  ),
                }
              : l
          ),
        })),
      removeItem: (listId, itemId) =>
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? { ...l, items: l.items.filter((it) => it.id !== itemId) }
              : l
          ),
        })),
    }),
    {
      name: 'shoplist-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ lists: state.lists }),
    }
  )
);


