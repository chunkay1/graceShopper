import React from "react";

import { addProducts } from "../api/itemRequests";

const AddProducts = ({ token, itemProps, setItemProps }) => {


  return (
    <form
      id="add-product"
      onSubmit={async (e) => {

        e.preventDefault();

        try {
          const addItem = await addProducts();

          setItemProps(addItem);
        } catch (error) {
          console.log(error);
        }
        setItemProps("");
      }}>
      <input
        placeholder="brand"
        value={setItemProps.brand}
        onChange={(e) => setItemProps.brand(e.target.value)}
      ></input>

      <input
        placeholder="category"
        value={setItemProps.category}
        onChange={(e) => setItemProps.category(e.target.value)}
      ></input>

      <input
        placeholder="name"
        value={setItemProps.name}
        onChange={(e) => setItemProps.name(e.target.value)}
      ></input>

      <input
        placeholder="price"
        value={setItemProps.price}
        onChange={(e) => setItemProps.price(e.target.value)}
      ></input>

      <input
        placeholder="size"
        value={setItemProps.size}
        onChange={(e) => setItemProps(e.target.value)}
      ></input>

      <button>Submit</button>
    </form>
  );
};

export default AddProducts;
