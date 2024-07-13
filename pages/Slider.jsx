import { useState, useEffect } from 'react'
// import styles from './Slider.module.css'

import React from 'react'

function Slider() {
  const [currentSlide, setCurrentSlide] = useState({})
  const [sliderContent, setSliderContent] = useState([])

  const slide = (page) => {
    setCurrentSlide(sliderContent[page])
  }

  // const slideRight = () => {
  //   if (!!sliderContent[currentSlide.id - 1]) {
  //     setCurrentSlide(currentSlide.id - 1)
  //   } else {
  //     setCurrentSlide(sliderContent[sliderContent.length - 1].id)
  //   }
  // }

  const prevSlidePhoto = () => {
    if (!!sliderContent[currentSlide.id - 1]) {
      return sliderContent[currentSlide.id - 1].photo
    } else {
      return sliderContent[sliderContent.length - 1].photo
    }
  }

  const nextSlidePhoto = () => {
    if (!!sliderContent[currentSlide.id + 1]) {
      return sliderContent[currentSlide.id + 1].photo
    } else {
      return sliderContent[0].photo
    }
  }

  useEffect(() => {
    fetch('http://localhost:3000/sliderContent')
      .then((response) => response.json())
      .then((value) => {
        setCurrentSlide(value[1])
        setSliderContent(value)
      })
  }, [])

  if (sliderContent.length === 0 || !currentSlide.title) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center bg-white overflow-x-hidden">
      <header className="flex justify-between container mt-28 mx-16 mb-9">
        <h1 className="text-3xl font-ev font-bold">
          Есть всё, что бы наполнить жизнь счастьем
        </h1>
        <nav className="flex w-[112px] justify-between">
          <button
            className="w-[50px] h-[50px] flex justify-center items-center border border-grey rounded-full hover:bg-blue"
            onClick={() => {
              if (!!sliderContent[currentSlide.id - 1]) {
                slide(currentSlide.id - 1)
              } else {
                slide(sliderContent[sliderContent.length - 1].id)
              }
            }}
          >
            <img src="/UI/arrow.svg" alt="arrow_left" className="h-[14px]" />
          </button>

          <button
            className="w-[50px] h-[50px] flex justify-center items-center border border-grey rounded-full hover:bg-blue"
            onClick={() => {
              if (!!sliderContent[currentSlide.id + 1]) {
                slide(currentSlide.id + 1)
              } else {
                slide(sliderContent[0].id)
              }
            }}
          >
            <img
              src="/UI/arrow.svg"
              alt="arrow_right"
              className="h-[14px] scale-x-[-1]"
            />
          </button>
        </nav>
      </header>

      <main className="flex items-baseline w-[127vw]">
        <div className="w-3/12 h-[470px] bottom-[50px] rounded-xl container relative overflow-hidden bg-milk -skew-y-2">
          <img
            src={prevSlidePhoto()}
            alt="photo"
            className="absolute object-cover inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30"
          />
        </div>

        <article className="w-5/12 rounded-xl bg-milk">
          <div className="container h-[500px] rounded-xl container relative overflow-hidden bg-milk mb-9">
            <img
              src={currentSlide.photo}
              alt="photo"
              className="absolute object-cover inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full "
            />
          </div>
          <h2 className="text-lg font-ev font-bold ml-6 mr-24 mb-3">
            {currentSlide.title}
          </h2>
          <p className="text-2xxs font-ev font-medium ml-6 mr-24 mb-10">
            {currentSlide.description}
          </p>
        </article>

        <div className="w-3/12 h-[470px] bottom-[50px] rounded-xl container relative overflow-hidden bg-milk skew-y-2">
          <img
            src={nextSlidePhoto()}
            alt="photo"
            className="absolute object-cover inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 "
          />
        </div>
      </main>
    </div>
  )
}

// return (
//   // <div className={styles.container}>
//   <div className="container mx-auto p-4">
//     <header className={styles.sliderHeader}>
//       <h1 className={styles.headerTitle}>
//         "Есть всё, что бы наполнить жизнь счастьем"
//       </h1>
//       <nav className={styles.navButtons}></nav>
//     </header>
//     <article className={styles.content}>
//       <img src={currentSlide.photo} alt="photo" className={styles.photo} />
//       {/* <img src={currentSlide.photo} alt="photo" className={styles.photo} /> */}
//       <h2 className={styles.title}>{currentSlide.title}</h2>
//       <p className={styles.description}>{currentSlide.description}</p>
//     </article>
//   </div>
// )

export default Slider
