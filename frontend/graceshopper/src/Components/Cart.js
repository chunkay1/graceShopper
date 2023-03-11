import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { myProfile } from '../api/userRequests';
import { getUserCart, deleteItemFromCart } from '../api/cartRequests';
import { cartHealth } from '../api/testRequests';
import styles from '../styles/Cart.module.css'

const Cart = ({ token }) => {
  const [itemsInCart, setItemsInCart] = useState([]);

  useEffect(() => {
    const getCartItemsAsync = async () => {
      let cartItems = await getUserCart(token);
      console.log('use Effect is', cartItems.itemsInCart)
      setItemsInCart(cartItems.itemsInCart);
    }
    getCartItemsAsync();
  }, [token])

  //^^just a guess at what the end useEffect might look like - this will most likely change. 

  let itemsInTestCart = [
    {
      name: "Adventurer",
      category: "shoes",
      brand:"Addidas",
      size:"11",
      price: "128.99",
      image: "shoes2.png"
    },
    {
      name: "Dunhams",
      category: "shoes",
      brand:"Brooks",
      size:"7",
      price: "78.99",
      image: "shoes3.png"
    },
    {
      name: "ReLeather",
      category: "shoes",
      brand:"Adidas",
      size:"13",
      price: "135.99",
      image: "shoes4.png"
    },
    {
      name: "Trail Blazer",
      category: "shoes",
      brand:"Nike",
      size:"9.5",
      price: "89.99",
      image: "shoes5.png"
    }
  ]

  

  // const cartPrice = itemsInTestCart.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue, startingCartPrice
  // );
  let totalCartPrice = (itemsInCart) => {
    let cartPrice = 0;
    for (let i = 0; i < itemsInCart.length; ++i) {
      let individualPrice = Number(itemsInCart[i].price);
      // console.log(typeof(individualPrice));
      cartPrice += individualPrice
    }

    return cartPrice
  }

  return (
    <div>
      <h1>My Cart</h1>

      <button 
        onClick={(event) => {
          event.preventDefault();
          totalCartPrice(itemsInCart);
          console.log(itemsInTestCart.length);
        }}>
        Test
      </button>

      <button 
        onClick={async (event) => {
          event.preventDefault();
          //myProfile returns a #, which is the logged in users' ID#
          // let myID = await myProfile(token)
          // console.log('myId is,', myID);
          
          await getUserCart(token);
          await cartHealth()
        }}>
        Get Cart Testing
      </button>
            
      <div class="py-5 text-center">

        {/* <img class="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}

        <h2>Checkout</h2>

        <p class="lead">You're almost ready to get out into the great outdoors!</p>
        
      </div>

      <div class="row g-5">

        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Your cart</span>
            <span class="badge bg-primary rounded-pill">{(itemsInCart.length)}</span>
          </h4>

          <ul class="list-group mb-3">

            {
              itemsInCart.map(({brand, name, size, price, itemsId, id}) => {
                return(
                  <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 class="my-0">{brand}</h6>
                      <small class="text-muted">{name}, Size: {size}</small>
                    </div>
                    
                    <div className={styles.priceAndIcons}>
                      <span class="text-muted">{price}</span>
                      <small class="text-muted">
                        <i 
                          className={`bi bi-trash3 ${styles.deleteIcon}`}
                          onClick={async (e) => {
                            e.preventDefault();
                            // console.log('delete item!')
                            let cartId = await getUserCart(token)
                            console.log('full cart is', cartId)
                            console.log('cartId is', cartId.id)
                            console.log('itemId is', itemsId)
                            console.log('cart item Id is,', id)
                            console.log('arguements are', itemsId, cartId.id)
                            await deleteItemFromCart(itemsId, cartId.id, token )
                          }}></i></small>
                    </div>
                  </li>
                )
              })
            }


            {/* everything below this line */}

            {/* <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Product name</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$12</span>
            </li>

            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Second product</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$8</span>
            </li>

            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Third item</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$5</span>
            </li> */}

            {/* <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span class="text-success">−$5</span>
            </li> */}

            {/* and above this line should be kept until we're filling out cart items dynamically */}

            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>{totalCartPrice(itemsInCart).toFixed(2)}</strong>
            </li>

          </ul>

          {/* <form class="card p-2">

            <div class="input-group">
              <input type="text" class="form-control" placeholder="Promo code"/>
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>

          </form> */}

        </div>

        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Billing address</h4>

          <form class="needs-validation" novalidate="">

            <div class="row g-3">
              
              <div class="col-sm-6">
                <label for="firstName" class="form-label">First name</label>
                <input type="text" class="form-control" id="firstName" placeholder="" value="" required=""/>
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div class="col-sm-6">
                <label for="lastName" class="form-label">Last name</label>
                <input type="text" class="form-control" id="lastName" placeholder="" value="" required=""/>
                <div class="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              {/* <div class="col-12">
                <label for="username" class="form-label">Username</label>
                <div class="input-group has-validation">
                  <span class="input-group-text">@</span>
                  <input type="text" class="form-control" id="username" placeholder="Username" required=""/>
                <div class="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div> */}

              {/* <div class="col-12">
                <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com"/>
                <div class="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div> */}

              <div class="col-12">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required=""/>
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              {/* <div class="col-12">
                <label for="address2" class="form-label">Address 2 <span class="text-muted">(Optional)</span></label>
                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite"/>
              </div> */}

              {/* <div class="col-md-5">
                <label for="country" class="form-label">Country</label>
                <select class="form-select" id="country" required="">
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div> */}

              <div class="col-md-4">
                <label for="state" class="form-label">State</label>
                <select class="form-select" id="state" required="">
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div class="col-md-3">
                <label for="zip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="zip" placeholder="" required=""/>
                <div class="invalid-feedback">
                  Zip code required.
                </div>
              </div>

            </div>

            <hr class="my-4"/>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="same-address"/>
              <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
            </div>

            {/* <div class="form-check">
              <input type="checkbox" class="form-check-input" id="save-info"/>
              <label class="form-check-label" for="save-info">Save this information for next time</label>
            </div> */}

            <hr class="my-4"/>

            <h4 class="mb-3">Payment</h4>

            <div class="my-3">

              <div class="form-check">
                <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required=""/>
                <label class="form-check-label" for="credit">Credit card</label>
              </div>

              {/* <div class="form-check">
                <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required=""/>
                <label class="form-check-label" for="debit">Debit card</label>
              </div>

              <div class="form-check">
                <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required=""/>
                <label class="form-check-label" for="paypal">PayPal</label>
              </div> */}

            </div>

            <div class="row gy-3">

              <div class="col-md-6">
                <label for="cc-name" class="form-label">Name on card</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required=""/>
                <small class="text-muted">Full name as displayed on card</small>
                <div class="invalid-feedback">
                  Name on card is required
                </div>
              </div>

              <div class="col-md-6">
                <label for="cc-number" class="form-label">Credit card number</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required=""/>
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-expiration" class="form-label">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required=""/>
                <div class="invalid-feedback">
                  Expiration date required
                </div>
              </div>

              <div class="col-md-3">
                <label for="cc-cvv" class="form-label">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required=""/>
                <div class="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>

            <hr class="my-4"/>

            <Link to={'/order-confirmation'}>
              <button class="w-100 btn btn-primary btn-lg" type="submit">Submit Your Order</button>
            </Link>


          </form>

        </div>

      </div>
    
    </div>
  )
}

export default Cart;