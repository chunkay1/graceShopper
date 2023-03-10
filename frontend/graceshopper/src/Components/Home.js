import React from 'react';
import { getAllItems } from '../api/itemRequests';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import $ from 'jquery'
import useMeasure from 'react-use-measure'


const Home = () => {
  const [allItems, setAllItems] = useState([])
  const [randomizer, setRandomizer] = useState(0)
  const [randomize, setRandomize] = useState(false)
  const [carouselRender, setCarouselRender] = useState(false)
  const [carousel1, setCarousel1] = useState([])
  const [ moveCarousel, setMoveCarousel ] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    getAllItems().then((items) => {
      setAllItems(items)
      setCarouselRender(true)
    })
  }, [])

  useEffect(() => {
    setCarousel1([randomHelper(), randomHelper(), randomHelper()])
  }, [])
  function randomHelper() {
    return Math.floor(Math.random() * (allItems.length - 1) + 1)
  }


  // const carouselWidth = $(`.carousel_inner`.scrollWidth)
  // const cardWidth = $('.carousel-item').width()
  // const cardWidth = $(`${styles.productCard}`).width()
  // const cardWidth = $(`${styles.productCard}`)

  const [ref, { width }] = useMeasure()
  console.log("ref width", width)
  
  
  // useEffect (() => {
  //   $('.carousel-control-next').on('click', function () {
  //     console.log('next')
  //     setScrollPosition(scrollPosition + width)
  //     console.log(scrollPosition)
  //     $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 400)
  //   })
  //   $('.carousel-control-prev').on('click', function () {
  //     console.log('prev')
  //     setScrollPosition(scrollPosition - width)
  //     console.log(scrollPosition)
  //     $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 400)
  //   })
  // }, [carouselRender])
  

  // $('.carousel').carousel({
  //   interval: 100,
  //   ride: "false"
  // })


  //setCarousel1( allItems.filter (item => item.id === randomizer[0] || randomizer[1] || randomizer[2]) )

  return (
    <div className={styles.homeDiv}>
      {/* <img src={'abstractMountain.jpg'} alt = 'abstract mountain' width={"100%"}></img> */}
      <div id="carouselExampleControlsAutoplay" className={`carousel slide ${styles.carouselOuter}`} data-bs-ride="carousel">
        <div className={`carousel-inner ${styles.carousel}`}>
          {/* <img src="..." class="d-block w-100" alt="..." /> */}
          {carouselRender &&
            <>
              <div ref={ref} class="carousel-item active" className={styles.productCard}>
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
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={() => {
          console.log('prev')
            setScrollPosition(scrollPosition - width)
            console.log(scrollPosition)
            $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 600)
        }}>
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={() => {
            setScrollPosition(scrollPosition + width)
            console.log(scrollPosition)
            $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 600)
          }}>
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>


  )
}

export default Home;