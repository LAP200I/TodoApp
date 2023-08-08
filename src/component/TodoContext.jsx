// import { createContext, useState } from "react";

// export const TodoContext = createContext();

// export const TodoProvider = ({ children }) => {
//   const [items, setItems] = useState(() => {
//     const storedItems = JSON.parse(localStorage.getItem("items"));
//     return storedItems ? storedItems : [];
//   });
//   const [editItemId, setEditItemId] = useState(null);
//   const editField = useRef(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("all");

//   const handleToggleComplete = (id) => {
//     const updatedItems = items.map((item) => {
//       if (item.id === id) {
//         return {
//           ...item,
//           completed: !item.completed,
//         };
//       } else {
//         return item;
//       }
//     });
//     setItems(updatedItems);
//   };

//   const handleToggleCompleteAll = () => {
//     if (items.every((item) => item.completed)) {
//       const updatedItems = items.map((item) => {
//         return {
//           ...item,
//           completed: false,
//         };
//       });
//       setItems(updatedItems);
//     } else {
//       const updatedItems = items.map((item) => {
//         return {
//           ...item,
//           completed: true,
//         };
//       });
//       setItems(updatedItems);
//     }
//   };

//   const handleSearch = () => {
//     if (searchQuery === "") {
//       setSearchResults(items);
//     } else {
//       const filteredItems = items.filter((item) =>
//         item.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSearchResults(filteredItems);
//     }
//   };

//   const addItem = (newItem) => {
//     setItems((currentItems) => {
//       if (newItem.trim() === "") {
//         return currentItems;
//       }
//       const updatedItems = currentItems.map((item, index) => ({
//         ...item,
//         indexItem: index + 1,
//       }));
//       return [
//         ...updatedItems,
//         {
//           id: crypto.randomUUID(),
//           title: newItem,
//           indexItem: updatedItems.length + 1,
//           completed: false,
//         },
//       ];
//     });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       setItems((currentItems) => {
//         return currentItems.filter((item) => item.id !== id);
//       });
//       setItems((currentItems) => {
//         const updatedItems = currentItems.map((item, index) => ({
//           ...item,
//           indexItem: index + 1,
//         }));
//         return updatedItems;
//       });
//     }
//   };

//   const handleEdit = (id) => {
//     setEditItemId(id);
//   };

//   const handleEditSubmit = (e, id) => {
//     e.preventDefault();
//     const editedTitle = editField.current.value;
//     if (editedTitle === "") {
//       return;
//     }
//     setItems((currentItems) => {
//       return currentItems.map((item) => {
//         if (item.id === id) {
//           return {
//             ...item,
//             title: editedTitle,
//           };
//         } else {
//           return item;
//         }
//       });
//     });
//     setEditItemId(null);
//   };

//   const deleteAll = () => {
//     if (window.confirm("Are you sure you want to delete all item?")) {
//       setItems([]);
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("items", JSON.stringify(items));
//   }, [items]);

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem("items"));
//     if (storedItems) {
//       setItems(storedItems);
//     }
//   }, []);

//   return (
//     <TodoContext.Provider
//       value={{
//         items,
//         setItems,
//         editItemId,
//         setEditItemId,
//         editField,
//         searchQuery,
//         setSearchQuery,
//         filter,
//         setFilter,
//         handleToggleComplete,
//         handleToggleCompleteAll,
//         handleSearch,
//         addItem,
//         handleDelete,
//         handleEdit,
//         handleEditSubmit,
//         deleteAll,
//       }}
//     >
//       {children}
//     </TodoContext.Provider>
//   );
// };
