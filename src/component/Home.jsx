import { useRef, useEffect, useState } from "react";
import API_CONSTANTS from "./API_CONSTANTS";
import axios from "axios";
import Header from "./Header/Header";
import Form from "./Form/Form";
import List from "./List/List";
import Footer from "./Footer/Footer";

export default function Home() {
  // const [items, setItems] = useState(() => {
  //   const storedItems = JSON.parse(localStorage.getItem("items"));
  //   return storedItems ? storedItems : [];
  // });
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const editField = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(items);
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const URL = API_CONSTANTS.BASE_URL;

  //fetch

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URL);
      setItems(response.data);
    };
    fetchData();
  }, []);

  //add item v1
  // const addItem = (newItem) => {
  //   setItems((currentItems) => {
  //     if (newItem.trim() === "") {
  //       return currentItems;
  //     }
  //     //update index of item in array
  //     const updatedItems = currentItems.map((item, index) => ({
  //       ...item,
  //       indexItem: index + 1,
  //     }));
  //     return [
  //       ...updatedItems,
  //       {
  //         id: crypto.randomUUID(),
  //         title: newItem,
  //         indexItem: updatedItems.length + 1,
  //         completed: false,
  //       },
  //     ];
  //   });
  // };

  const addItem = (newItem) => {
    // axios
    //   .post(URL, {
    //     id: crypto.randomUUID(),
    //     // indexItem: items.length + 1,
    //     title: newItem,
    //     completed: false,
    //   })
    //   .then((response) => {
    //     // Update the items state with the new item
    //     setItems((currentItems) => [...currentItems, response.data]);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const postItem = async () => {
      try {
        const response = await axios.post(URL, {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
        });
        setItems((currentItems) => [...currentItems, response.data]);
      } catch (error) {
        console.error(error);
      }
    };
    postItem();
  };

  // const handleDelete = (id) => {
  //   //delete item
  //   if (window.confirm("Are you sure you want to delete this item?")) {
  //     setItems((currentItems) => {
  //       return currentItems.filter((item) => item.id !== id);
  //     });
  //     //update index of item in array
  //     setItems((currentItems) => {
  //       const updatedItems = currentItems.map((item, index) => ({
  //         ...item,
  //         indexItem: index + 1,
  //       }));
  //       return updatedItems;
  //     });
  //   }
  // };

  const handleDelete = (id) => {
    // Make a DELETE request to the API to delete the item
    // axios.delete(`${URL}/${id}`).then(() => {
    //   //confirm delete
    //   if (window.confirm("Are you sure you want to delete this item?")) {
    //     // Update the items state by filtering out the deleted item
    //     setItems((currentItems) => {
    //       return currentItems.filter((item) => item.id !== id);
    //     });
    //   }
    // });
    const deleteItem = async () => {
      try {
        await axios.delete(`${URL}/${id}`);
        //confirm delete
        // Update the items state by filtering out the deleted item,
        setItems((currentItems) => {
          return currentItems.filter((item) => item.id !== id);
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem();
    }
  };
  // const deleteAll = () => {
  //   if (window.confirm("Are you sure you want to delete all item?")) {
  //     localStorage.removeItem("items");
  //     setItems([]);
  //   }
  // };
  const deleteAll = () => {
    // Make a DELETE request to the API to delete all items
    // axios
    //   .delete(URL)
    //   .then(() => {
    //     // Update the items state by filtering out the deleted item
    //     if (window.confirm("Are you sure you want to delete all item?")) {
    //       setItems([]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const deleteAllItem = async () => {
      try {
        await axios.delete(URL);
        // Update the items state by filtering out the deleted item
        setItems([]);
      } catch (error) {
        console.error(error);
      }
    };
    if (window.confirm("Are you sure you want to delete all item?")) {
      deleteAllItem();
    }
  };
  //edit v1
  // const handleEdit = (id) => {
  //   setEditItemId(id);
  // };
  // const handleEditSubmit = (e, id) => {
  //   e.preventDefault();
  //   const editedTitle = editField.current.value;
  //   if (editedTitle === "") {
  //     return;
  //   }
  //   console.log(editedTitle);

  //   setItems((currentItems) => {
  //     return currentItems.map((item) => {
  //       if (item.id === id) {
  //         return {
  //           ...item,
  //           title: editedTitle,
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //   });
  //   setEditItemId(null);
  // };

  //delete all items

  const handleEdit = (id) => {
    setEditItemId(id);
  };
  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    const editedTitle = editField.current.value;
    if (editedTitle === "") {
      return;
    }
    // Make a request to the API to update the title of the item
    // axios
    //   .put(`${URL}/${id}`, {
    //     title: editedTitle,
    //   })
    //   .then(() => {
    //     // Update the items state with the edited item
    //     setItems((currentItems) => {
    //       return currentItems.map((item) => {
    //         return item.id === id ? { ...item, title: editedTitle } : item;
    //       });
    //     });
    //     setEditItemId(null);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const editItem = async () => {
      try {
        await axios.put(`${URL}/${id}`, {
          title: editedTitle,
        });
        // Update the items state with the edited item
        setItems((currentItems) => {
          return currentItems.map((item) => {
            return item.id === id ? { ...item, title: editedTitle } : item;
          });
        });
        setEditItemId(null);
      } catch (error) {
        console.error(error);
      }
    };
    editItem();
  };

  useEffect(() => {
    switch (filter) {
      case "completed":
        setFilteredItems(items.filter((item) => item.completed));
        break;
      case "pending":
        setFilteredItems(items.filter((item) => !item.completed));
        break;
      default:
        setFilteredItems(items);
        break;
    }
  }, [items, filter]);

  //toggle completed v1
  // const handleToggleComplete = (id) => {
  //   const updatedItems = items.map((item) => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         completed: !item.completed,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setItems(updatedItems);
  // };
  const handleToggleComplete = (id) => {
    // Find the item with the matching ID
    const item = items.find((item) => item.id === id);
    // Make a request to the API to update the completed status of the item
    // axios.put(`${URL}/${id}`, {
    //   completed: !item.completed,
    // });
    // // Update the items state with the updated item
    // setItems((currentItems) => {
    //   return currentItems.map((item) => {
    //     return item.id === id ? { ...item, completed: !item.completed } : item;
    //   });
    // });
    const toggleComplete = async () => {
      try {
        await axios.put(`${URL}/${id}`, {
          completed: !item.completed,
        });
        // Update the items state with the updated item
        setItems((currentItems) => {
          return currentItems.map((item) => {
            return item.id === id
              ? { ...item, completed: !item.completed }
              : item;
          });
        });
      } catch (error) {
        console.error(error);
      }
    };
    toggleComplete();
  };

  //toggle completed all v1
  // const handleToggleCompleteAll = () => {
  //   if (items.every((item) => item.completed)) {
  //     const updatedItems = items.map((item) => {
  //       return {
  //         ...item,
  //         completed: false,
  //       };
  //     });
  //     setItems(updatedItems);
  //   } else {
  //     const updatedItems = items.map((item) => {
  //       return {
  //         ...item,
  //         completed: true,
  //       };
  //     });
  //     setItems(updatedItems);
  //   }
  // };
  const handleToggleCompleteAll = async () => {
    try {
      const completed = items.every((item) => item.completed);
      const updatedItems = items.map((item) => ({
        ...item,
        completed: !completed,
      }));
      await axios.put(URL, updatedItems);
      setItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  //search item
  const handleSearch = () => {
    if (searchQuery === "") {
      setSearchResults(items);
    } else {
      const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredItems);
    }
  };
  /**update the searchResults state variable whenever
   * the items state variable changes  */
  useEffect(() => {
    //update the searchResults state variable
    if (searchQuery === "") {
      setSearchResults(items);
    } else {
      const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredItems);
    }
  }, [items, searchQuery]);

  //save the items state variable to localStorage
  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  // //load the items state variable from localStorage
  // useEffect(() => {
  //   const storedItems = JSON.parse(localStorage.getItem("items"));
  //   if (storedItems) {
  //     setItems(storedItems);
  //   }
  // }, []);

  return (
    <section className="container">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <hr />
      <Form addItem={addItem} handleSearch={handleSearch} setItems={setItems} />
      {searchQuery === "" ? (
        <List
          // items={items}
          items={filteredItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleEditSubmit={handleEditSubmit}
          editItemId={editItemId}
          editField={editField}
          handleToggleComplete={handleToggleComplete}
        />
      ) : searchResults.length > 0 ? (
        <List
          items={searchResults}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleEditSubmit={handleEditSubmit}
          editItemId={editItemId}
          editField={editField}
          handleToggleComplete={handleToggleComplete}
        />
      ) : (
        <ul className="list">
          {" "}
          <p>No items found</p>
        </ul>
      )}
      <hr />
      <Footer
        deleteAll={deleteAll}
        items={items}
        handleToggleCompleteAll={handleToggleCompleteAll}
        setFilter={setFilter}
      />
      <p>Double click to edit text!</p>
      <hr />
    </section>
  );
}
