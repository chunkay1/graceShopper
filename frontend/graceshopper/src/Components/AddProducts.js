import React, {useState} from "react";
import { BASEURL } from "../constants/constants";

// import { addProducts } from "../api/itemRequests";

const AddProducts = ({ token,products,setProducts }) => {

  const [addname, setAddName] = useState([]);
  const [addcategory,setAddCategory] = useState([]);
  const [addprice, setAddPrice] = useState([]);
  const [addbrand,setAddBrand] = useState([]);
  const [adddescription, setAddDescription] = useState([]);
  const [addsize,setAddSize] = useState([]);

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
                      addname,
                      addcategory,
                      addbrand,
                      addsize,
                      addprice,
                      adddescription
                        
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

                setAddName('');
                setAddDescription('');
                setAddPrice('');
                setAddSize('');
                setAddBrand('')
                setAddCategory('')

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
      value= {addname}
      onChange={(e) => setAddName(e.target.value)}
      ></input>

      <input
        placeholder="brand"
        value={addbrand}
        onChange={(e) => setAddBrand(e.target.value)}
      ></input>

      <input
        placeholder="category"
        value={addcategory}
        onChange={(e) => setAddCategory(e.target.value)}
      ></input>

      <input
        placeholder="size"
        value={addsize}
        onChange={(e) => setAddSize(e.target.value)}
      ></input>

      <input
        placeholder="price"
        value={addprice}
        onChange={(e) => setAddPrice(e.target.value)}
      ></input>

      <input
        placeholder="description"
        value={adddescription}
        onChange={(e) => setAddDescription(e.target.value)}
      ></input>

      <button>Submit</button>
    </form>
    </>
  );
};

export default AddProducts;
