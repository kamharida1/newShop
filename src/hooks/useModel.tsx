import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Auth } from "aws-amplify";

const useModel = (model) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        const items = await DataStore.query(model);
        if (isMounted) {
          setItems(items);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchItems();

    // Subscribe to new items and updates
    const subscription = DataStore.observe(model).subscribe(() => {
      if (isMounted) {
        fetchItems();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [model]);

  const createItem = async (item) => {
    try {
      await DataStore.save(new model(item));
    } catch (error) {
      setError(error);
    }
  };

  const readItem = async (itemId) => {
    try {
      const item = await DataStore.query(model, itemId);
      return item;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const itemToDelete = await DataStore.query(model, itemId);
      await DataStore.delete(itemToDelete);
    } catch (error) {
      setError(error);
    }
  };

  const updateItem = async (itemId, updatedItem) => {
    try {
      const itemToUpdate = await DataStore.query(model, itemId);
      await DataStore.save(
        model.copyOf(itemToUpdate, (updated) => {
          Object.assign(updated, updatedItem);
        })
      );
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    items,
    createItem,
    readItem,
    deleteItem,
    updateItem,
  };
};

export default useModel;
