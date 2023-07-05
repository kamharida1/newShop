import { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";

export function useDataStore(model, initialData) {
  const [data, setData] = useState(initialData);

  async function create(item) {
    const newItem = await DataStore.save(new model(item));
    setData([...data, newItem]);
  }

  async function read() {
    const items = await DataStore.query(model);
    setData(items);
  }

  async function update(item) {
    const updatedItem = await DataStore.save(item);
    setData(data.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
  }

  async function remove(id) {
    await DataStore.delete(model, id);
    setData(data.filter((i) => i.id !== id));
  }

  useEffect(() => {
    read();
  }, []);

  return { data, create, read, update, remove };
}

// import { useDataStore } from "./useDataStore";
// import { Todo } from "./models";

// function TodoList() {
//   const { data, create, update, remove } = useDataStore(Todo, []);

//   function handleCreate() {
//     create({ name: "New Todo" });
//   }

//   function handleUpdate(todo) {
//     update(todo);
//   }

//   function handleRemove(id) {
//     remove(id);
//   }

//   return (
//     <div>
//       <button onClick={handleCreate}>Add Todo</button>
//       {data.map((todo) => (
//         <div key={todo.id}>
//           <input
//             type="checkbox"
//             checked={todo.completed}
//             onChange={() =>
//               handleUpdate({ ...todo, completed: !todo.completed })
//             }
//           />
//           <input
//             type="text"
//             value={todo.name}
//             onChange={(e) => handleUpdate({ ...todo, name: e.target.value })}
//           />
//           <button onClick={() => handleRemove(todo.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

