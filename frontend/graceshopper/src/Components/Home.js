import React from 'react';
import { getAllItems } from '../api/itemRequests';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import $ from 'jquery'
import useMeasure from 'react-use-measure'


const Home = () => {
  //prevents the first card from rendering before allItems are set
  const [carouselRender, setCarouselRender] = useState(false)
  //measures the width of the first card for the carousel animation to move the proper amount
  const [ref, { width }] = useMeasure()
  //tracks the position that's rendered in the carousel
  const [scrollPosition, setScrollPosition] = useState(0)

  //below will be used to set a smaller, random pool of items for the carousels
  const [carouselItems, setCarouselItems] = useState([])
  // const [randomHelper, setRandomizer] = useState(0)
  const [initiateRender, setInitiateRender] = useState(false)
  // const randomSet = [randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper(), randomHelper()]

  useEffect(() => {
    if (carouselItems.length) {
      setCarouselRender(true)
    }
  }, [initiateRender])

  useEffect(() => {

    async function helper() {
      await getAllItems().then((items) => {
        let numberHistory = []

        for (let i = 0; i < 8; ++i) {
          let curNum = Math.floor(Math.random() * (items.length - 1) + 1)

          if (!numberHistory.includes(curNum)) {
            numberHistory.push(curNum)
            const randomItem = items.filter(item => item.id === curNum)
            carouselItems.push(randomItem[0])
          }
        }
        setInitiateRender(true)
      })
    }
    helper()

  }, [])

  //carousel animation effects called when either end is clicked
  useEffect(() => {
    $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 600)
  }, [scrollPosition])

  return (
    <div className={styles.homeDiv}>
      <div className={styles.carouselBackground}>
      <div id="carouselExampleControlsAutoplay" className={`carousel slide ${styles.carouselOuter}`} data-bs-ride="carousel">
        <div className={`carousel-inner ${styles.carousel}`}>
          {
            carouselRender && carouselItems.length &&
            <>
              <div ref={ref} class="carousel-item active" className={`${styles.productCard} ${styles.firstCard}`}>
              <h4 className={styles.heading}>Top sellers near you</h4>
                <div className={styles.description}>
                  <span className={styles.cardValue}>
                    {console.log(carouselItems[0].brand)}
                    <span className={styles.brand}> {carouselItems[0].brand} </span>
                    <span className={styles.name}>{carouselItems[0].name}</span>
                    <span className={styles.price}>${carouselItems[0].price}</span>
                  </span>
                  {/* <p className={styles.cardValue}>{allItems[0].name}</p> */}
                  {/* <h3 className={styles.header}>Size: <p className={styles.cardValue}>{allItems[0].size}</p></h3> */}
                </div>
                <img src={carouselItems[0].image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
              </div>

            </>
          }
          {carouselRender &&
            carouselItems.map(({ id, image, name, price, size, category, brand }, index) => {
              if (index > 1) {
                return (
                  <div class='carousel-item'
                    className={styles.productCard}
                    key={index}>
                    <div className={styles.description}>
                      <span className={styles.cardValue}>
                        <span className={styles.brand}> {brand} </span>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.price}>${price}</span>
                      </span>
                      {/* <p className={styles.cardValue}>{allItems[0].name}</p> */}
                      {/* <h3 className={styles.header}>Size: <p className={styles.cardValue}>{allItems[0].size}</p></h3> */}
                    </div>
                    <img src={image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
                  </div>
                )
              }
            }
            )
          }
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={async () => {
          console.log('prev')
          if (scrollPosition === 0) {
            setScrollPosition(width)
          }
          else {
            setScrollPosition(scrollPosition - width)
          }

        }}>
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={async () => {
          console.log("next")
          if (scrollPosition === 0) {
            setScrollPosition(width)
          }
          else {
            setScrollPosition(scrollPosition + width)
          }
        }}>
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    </div>


  )
}

export default Home;


  // const carouselWidth = $(`.carousel_inner`.scrollWidth)

  // $('.carousel').carousel({
  //   interval: 100,
  //   ride: "false"
  // })

  //setCarousel1( allItems.filter (item => item.id === randomHelper[0] || randomHelper[1] || randomHelper[2]) )