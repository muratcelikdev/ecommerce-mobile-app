import { useContext, useCallback, createContext } from 'react';
import { useImmer } from 'use-immer';

interface BasketContextProps {
  children: React.ReactNode;
}

export interface BasketItem {
  id: number;
  quantity: number;
}

type BasketItems = Array<BasketItem>;

export interface BasketContextModel {
  items: BasketItems;
  addToBasket: (id: number) => void;
  popFromBasket: (id: number) => void;
  removeFromBasket: (id: number) => void;
}

const BasketContext = createContext({} as BasketContextModel);

const INITIAL_ITEMS: BasketItems = [];

const BasketContextProvider = ({ children }: BasketContextProps) => {
  const [items, setItems] = useImmer<BasketItems>(INITIAL_ITEMS);

  const addToBasket = useCallback(
    (id: number) => {
      const index = items.map((item) => item.id).indexOf(id);

      if (index >= 0) {
        setItems((draftState) => {
          draftState[index].quantity += 1;
        });
      } else {
        setItems((draftState) => {
          draftState.push({ id, quantity: 1 });
        });
      }
    },
    [items]
  );

  const popFromBasket = useCallback(
    (id: number) => {
      const index = items.map((item) => item.id).indexOf(id);

      setItems((draftState) => {
        if (draftState[index].quantity > 0) {
          draftState[index].quantity -= 1;
        } else {
          draftState.splice(index, 1);
        }
      });
    },
    [items]
  );

  const removeFromBasket = useCallback(
    (id: number) => {
      const index = items.map((item) => item.id).indexOf(id);

      setItems((draftState) => {
        draftState.splice(index, 1);
      });
    },
    [items]
  );

  return (
    <BasketContext.Provider value={{ items, addToBasket, popFromBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);

export default BasketContextProvider;
