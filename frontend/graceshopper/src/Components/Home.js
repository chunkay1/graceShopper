import React from 'react';
import { getAllItems } from '../api/itemRequests';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import $ from 'jquery'
import useMeasure from 'react-use-measure'


const Home = () => {
  const [allItems, setAllItems] = useState([])
  //prevents the first card from rendering before allItems are set
  const [carouselRender, setCarouselRender] = useState(false)
  //measures the width of the first card for the carousel animation to move the proper amount
  const [ref, { width }] = useMeasure()
  //tracks the position that's rendered in the carousel
  const [scrollPosition, setScrollPosition] = useState(0)

  //below will be used to set a smaller, random pool of items for the carousels
  const [carousel1, setCarousel1] = useState([])
  const [carousel2, setCarousel2] = useState([])
  const [randomizer, setRandomizer] = useState(0)
  const [randomize, setRandomize] = useState(false)

  useEffect(() => {
    setCarousel1([randomHelper(), randomHelper(), randomHelper()])
  }, [])
  function randomHelper() {
    return Math.floor(Math.random() * (allItems.length - 1) + 1)
  }

  useEffect(() => {
    getAllItems().then((items) => {
      setAllItems(items)
      setCarouselRender(true)
    })
  }, [])

  //carousel animation effects called when either end is clicked
  useEffect(() => {
    $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 600)
  }, [scrollPosition])

  return (
    <div className={styles.homeDiv}>
      <div id="carouselExampleControlsAutoplay" className={`carousel slide ${styles.carouselOuter}`} data-bs-ride="carousel">
        <div className={`carousel-inner ${styles.carousel}`}>
          {
            carouselRender &&
            <>
              <div ref={ref} class="carousel-item active" className={`${styles.productCard} ${styles.firstCard}`}>
                <div className={styles.description}>
                  <span className={styles.cardValue}>{allItems[0].brand}&nbsp;&nbsp;{allItems[0].name}&nbsp;&nbsp;<span className={styles.price}>${allItems[0].price}</span></span>
                  {/* <p className={styles.cardValue}>{allItems[0].name}</p> */}
                  {/* <h3 className={styles.header}>Size: <p className={styles.cardValue}>{allItems[0].size}</p></h3> */}
                </div>
                <img src={allItems[0].image} alt={'shoes png'} width={"100%"} className={`d-block w-100 ${styles.image}`}></img>
              </div>

            </>
          }
          {
            allItems.map(({ id, image, name, price, size, category, brand }, index) => {
              if (id > 1) {
                return (
                  <div class='carousel-item'
                    className={styles.productCard}
                    key={id}>
                    <div className={styles.description}>
                    <span className={styles.cardValue}>{brand}&nbsp;&nbsp;{name}&nbsp;&nbsp;<span className={styles.cardValue}>${price}</span></span>
                  {/* <p className={styles.cardValue}>{name}</p> */}
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


  )
}

export default Home;


  // const carouselWidth = $(`.carousel_inner`.scrollWidth)

  // $('.carousel').carousel({
  //   interval: 100,
  //   ride: "false"
  // })

  //setCarousel1( allItems.filter (item => item.id === randomizer[0] || randomizer[1] || randomizer[2]) )