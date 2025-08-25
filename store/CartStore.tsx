import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

interface Product {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: ImageSourcePropType;
}

interface CartStore {
  removeFromCart: (productId: string | number) => void;
  addToCart: (product: Product, quantity: number) => void;
  UpdateQuantity: (productId: string | number, quantity: number) => void;
  getTotalPrice: () => void;
  clearCart: () => void;
  items: Product[];
}

const UseCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: quantity }],
        };
      }
    });
  },
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },
  UpdateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => {
    set(() => ({
      items: [],
    }));
  },
  getTotalPrice() {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));

export default UseCartStore;
