import React, { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css'
import { getAllItems, getProductsByCategory, getProductById } from '../api/itemRequests';
import { addToCart } from '../api/cartRequests';
import { setTargetValue } from '../constants/constants';
import SingleProduct from './SingleProduct';
// import AddProducts from "./AddProducts";

// import { STORAGE_KEY } from '../constants/constants';

// const jwt = require('jsonwebtoken')


const Products = ({ token, itemProps, setItemProps, singleProduct, setSingleProduct, category, setCategory }) => {
  const [products, setProducts] = useState([]);
  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    const getAllProductsAsync = async () => {
      let allProducts = await getAllItems();
      setProducts(allProducts);
      // console.log('products are', products)
    }
    getAllProductsAsync();
  }, [])

  useEffect(() => {
    const getProductsByCategoryAsync = async () => {
      let allProducts = await getAllItems();
      if (category) {
        let categoryItems = allProducts.filter(product => product.category === category)
        setProducts(categoryItems);
        console.log(categoryItems)
      }
      else {
        setProducts(allProducts)
      }

    }
    getProductsByCategoryAsync();
  }, [category])

  useEffect(() => {
    setCategory(selectValue)
  }, [selectValue])

  // let getCategoryItems = async (category) => {
  //     await getProductsByCategory(category);
  // }

  let getItemProps = (brand, category, id, name, price, size, inventory) => {
    console.log('props are', brand, category, id, name, price, size)
    setItemProps(
      {
        brand: brand,
        category: category,
        id: id,
        name: name,
        price: price,
        size: size,
        inventory: inventory,
      }
    )
    return itemProps
  }


  return (
    <div>

      <select onChange={(e) => {
        setSelectValue(e.target.value)
      }} className={`form-select form-select-sm ${styles.selector}`} aria-label=".form-select-sm example">
        <option selected value="">Browse by category</option>
        <option value="Shoes">Shoes</option>
        <option value="Tents">Tents</option>
        <option value="Clothing">Outdoor Clothing</option>
        <option value="Firepits and Grills">Firepits and Grills</option>
        <option value="Skis">Skis and Gear</option>
        <option value="Snowboards">Snowboards and Gear</option>
        <option value="">All Products</option>
      </select>

      {
        singleProduct

          ?

          <SingleProduct
            setSingleProduct={setSingleProduct}
            setItemProps={setItemProps}
            itemProps={itemProps}
            token={token}
            addToCart={addToCart}
            getProductById={getProductById}
          />

          :
          <div className={styles.container}>

            {
              products.map(({ brand, category, id, name, price, size, image, inventory }) => {
                return (
                  <div key={id}>

                    <div
                      className={`card ${styles.productCard}`}
                      style={{
                        width: "18rem",
                        backgroundColor: "#B7E4C7"
                      }}
                      // this is where you click the div and it takes you to the single product view
                      onClick={async (e) => {
                        // console.log('brand is,', brand);
                        // console.log('name is,', name);
                        // console.log('price is,', price);
                        const props = await getProductById(id);
                        setItemProps(props)
                        console.log(itemProps)
                        setSingleProduct(true);

                      }}>

                      <img src={image} class="card-img-top" alt="..." />

                      <div class="card-body">
                        {/* <h5 class="card-title">Brand</h5>
                          <p class="card-text">{brand}</p> */}
                        <p class="card-text">{name}</p>
                        {/* <h5 class="card-title">size</h5>
                          <p class="card-text">{size}</p> */}
                        {/* <h5 class="card-title">Category</h5>
                          <p class="card-text">{category}</p> */}
                        <p class="card-text">${price}</p>
                        <h5 className={`card-title ${styles.stock}`}>In-stock 
                          <p class="card-text">{inventory}</p>
                        </h5>
                        
                        {/* <h5 class="card-title">Id</h5>
                          <p class="card-text">{id}</p> */}

                        {/* <div className={styles.buttonDiv}>
                          <button
                            className={styles.cartButton}
                            onClick={async (event) => {
                            event.preventDefault();

                                  console.log('added to cart')
                                  let test = await addToCart(getItemcategory, id, name, price, inventory))
                                  console.log(test);
                                  // this prevents from going to siview after clicking add to cart
                                  const props = await getProductById(id);
                                  setItemProps(props)
                                  console.log(itemProps)
                                  setSingleProduct(false);


                                  // const { [id] : userId } = jwt.verify(token)
                                  console.log("this is the id", id, token", token)
                                  const something = await addToCart(id, token)
                                  console.log("this is something", something)
                                  // let test = await addToCart(brand, category, id, name, image))


                                  // getCartItemProps(brand, categorprice, size, image).then((result) => {
                                  //     console.log(result)
                                  //     addToCart(result);
                                  // }).catch((err) => {
                                  //     console.log(err)
                                  // });
                              }}>
                              Add to Cart!
                          </button>
                       </div> */}
                      </div>

                    </div>

                  </div>

                )

              })
            }
          </div>
      }


      {/* {
                    products.map(({brand, category, id, name, price, size, image}) => {
                        return (
                            <div 
                                className={styles.productCard} 
                                key={id}>
                                    <img src = {image} alt = {'shoes png'} width = {"100%"} className = {styles.image}></img>
                                    <div className={styles.description}>
                                      <h3 className={styles.header}>Brand: <p className={styles.cardValue}>{brand}</p></h3>
                                      <h3 className={styles.header}>Category: <p className={styles.cardValue}>{category}</p></h3>
                                      <h3 className={styles.header}>Id: <p className={styles.cardValue}>{id}</p></h3>
                                      <h3 className={styles.header}>Name: <p className={styles.cardValue}>{name}</p></h3>
                                      <h3 className={styles.header}>Price: <p className={styles.cardValue}>{price}</p></h3>
                                      <h3 className={styles.header}>Size: <p className={styles.cardValue}>{size}</p></h3>
                                    </div>

                                    {
                                        (!token)

                                        ?

                                        null
                                        :

                                        <div className={styles.cartbutton}> 
                                            <button
                                                onClick={console.log('Added To Cart!')}>
                                                Add to Cart!
                                            </button>
                                        </div>

                                    }
                            </div>
                        )
                    })
                } */}

    </div>

  )
}

export default Products;