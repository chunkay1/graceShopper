import React, {useState} from "react";
import { BASEURL } from "../constants/constants";

// import { addProducts } from "../api/itemRequests";

const AddProducts = ({ token,products,setProducts }) => {

  const [name, setName] = useState([]);
  const [category,setCategory] = useState([]);
  const [price, setPrice] = useState([]);
  const [brand,setBrand] = useState([]);
  const [description, setDescription] = useState([]);
  const [size,setSize] = useState([]);

  return (
    <>
    <form
      id="add-product"
      onSubmit={async (e) => {

        e.preventDefault();

        try {
                  const response = await fetch(`${BASEURL}/items`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      name,
                      category,
                      brand,
                      size,
                      price,
                      description
                        
                  }),

                });
          
                  const json = await response.json();
                  console.log(json);
                  const responseProduct = json;
                  setProducts([responseProduct,...products]);
                  console.log(responseProduct)
          
              }catch (error) {
                  console.log(error);
                }

                setName('');
                setDescription('');
                setPrice('');
                setSize('');
                setBrand('')
                setCategory('')

              }}>
        {/* try {
          const addItem = await addProducts();

          setItemProps(addItem);
        } catch (error) {
          console.log(error);
        }
        setItemProps("");
       */}
      <input
      placeholder="name"
      value= {name}
      onChange={(e) => setName(e.target.value)}
      ></input>

      <input
        placeholder="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      ></input>

      <input
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>

      <input
        placeholder="size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      ></input>

      <input
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>

      <input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>

      <button>Submit</button>
    </form>
    </>
  );
};

export default AddProducts;
