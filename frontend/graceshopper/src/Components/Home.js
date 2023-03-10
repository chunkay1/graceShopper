import React from 'react';
import { getAllItems } from '../api/itemRequests';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'


const Home = () => {
  const [allItems, setAllItems] = useState([])
  const [randomizer, setRandomizer] = useState(0)
  const [randomize, setRandomize] = useState(false)
  const [carouselRender, setCarouselRender] = useState(false)
  const [carousel1, setCarousel1] = useState([])

  useEffect(() => {

    getAllItems().then((items) => {
      setAllItems(items)
      setCarouselRender(true)
    })
    // async function helper() {
    //   setAllItems(await getAllItems()).then(() => {
    //     setCarouselRender(true)
    //   })
    // }
    // helper()
  }, [])


  useEffect(() => {
    setCarousel1([randomHelper(), randomHelper(), randomHelper()])
  }, [])

  function randomHelper() {
    return Math.floor(Math.random() * (allItems.length - 1) + 1)
  }

  //setCarousel1( allItems.filter (item => item.id === randomizer[0] || randomizer[1] || randomizer[2]) )

  return (
    <div className={styles.homeDiv}>
      {/* <img src={'abstractMountain.jpg'} alt = 'abstract mountain' width={"100%"}></img> */}
      <div id="carouselExampleAutoplaying" className={`carousel slide ${styles.carousel}`} data-bs-ride="carousel">
        <div className={`carousel-inner ${styles.carousel}`}>
          {/* <img src="..." class="d-block w-100" alt="..." /> */}
          {carouselRender &&
            <>
              <div class="carousel-item active" className={styles.productCard}>
                <img src={allItems[0].image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
                <div className={styles.description}>
                  <p className={styles.cardValue}>{allItems[0].brand}</p>
                  <p className={styles.cardValue}>{allItems[0].name}</p>
                  <h3 className={styles.header}>Price: <p className={styles.cardValue}>{allItems[0].price}</p></h3>
                  <h3 className={styles.header}>Size: <p className={styles.cardValue}>{allItems[0].size}</p></h3>
                </div>
              </div>
              {/* <div class="carousel-item active" className={styles.productCard}>
                <img src={allItems[1].image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
                <div className={styles.description}>
                  <p className={styles.cardValue}>{allItems[1].brand}</p>
                  <p className={styles.cardValue}>{allItems[1].name}</p>
                  <h3 className={styles.header}>Price: <p className={styles.cardValue}>{allItems[1].price}</p></h3>
                  <h3 className={styles.header}>Size: <p className={styles.cardValue}>{allItems[1].size}</p></h3>
                </div>
              </div> */}
            </>
          }
          {
            allItems.map(({ id, image, name, price, size, category, brand }) => {
              return (
                <div class="carousel-item"
                  className={styles.productCard}
                  key={id}>
                  <img src={image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
                  <div className={styles.description}>
                    <p className={styles.cardValue}>{brand}</p>
                    <p className={styles.cardValue}>{name}</p>
                    <h3 className={styles.header}>Price: <p className={styles.cardValue}>{price}</p></h3>
                    <h3 className={styles.header}>Size: <p className={styles.cardValue}>{size}</p></h3>
                  </div>
                </div>
              )
            }
            )
          }

          {/* <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div> */}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

  )
}

export default Home;