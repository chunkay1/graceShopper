import styles from '../styles/Products.module.css'
import React from 'react';

function SingleProduct({setSingleProduct, itemProps, setItemProps, token, addToCart, getProductById}) {
    const {image, category, id, name, price, size, brand, description} = itemProps;
    return(

        <>
            <h1>Woot woot</h1>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    setSingleProduct(false);
                }}
            >
                No State
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    console.log(itemProps)
                }}
            >
                Props
            </button>

            <div key={id}>
        
                <div 
                    class={`card ${styles.productCard}`} 
                    style={{
                        width: "30rem",
                        backgroundColor: "#B7E4C7"
                    }}>
        
                    <img src={image} class="card-img-top" alt="..."/>
                                            
                    <div class="card-body">
                        <h5 class="card-title">Brand</h5>
                            <p class="card-text">{brand}</p>
                        <h5 class="card-title">Name</h5>
                            <p class="card-text">{name}</p>
                        <h5 class="card-title">size</h5>
                            <p class="card-text">{size}</p>
                        <h5 class="card-title">Category</h5>
                            <p class="card-text">{category}</p>
                        <h5 class="card-title">Description</h5>
                            <p class="card-text">{description}</p>
                        <h5 class="card-title">Price</h5>
                            <p class="card-text">${price}</p>
                                                
                        <div className={styles.buttonDiv}> 
                            <button
                                className={styles.cartButton}
                                onClick={async (event) => {
                                    event.preventDefault();
                                    console.log('added to cart');
                                    const props = await getProductById(id);
                                    let test = await addToCart(props);
                                    console.log(test);
                                    // getCartItemProps(brand, category, id, name, price, size, image).then((result) => {
                                    //     console.log(result)
                                    //     addToCart(result);
                                    // }).catch((err) => {
                                    //     console.log(err)
                                    // });
                                }}>
                                Add to Cart!
                            </button>
                            <button
                                className={styles.cartButton}
                                onClick={async (e) => {
                                    // console.log('brand is,', brand);
                                    // console.log('name is,', name);
                                    // console.log('price is,', price);
                                    const props = await getProductById(id);
                                    setItemProps(props)
                                    console.log(itemProps)
                                    setSingleProduct(false);
                                }}>
                                Return to Products
                            </button>
                        </div>
                    </div>
        
                </div>
        
            </div>
        
        </>

    )
}

export default SingleProduct;