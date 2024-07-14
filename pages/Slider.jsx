import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Slider = () => {
  const [sliderContent, setSliderContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(undefined);
  const [direction, setDirection] = useState(0);

  const slide = (index, dir) => {
    // direction = 1;
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(index);
    }, 100);
  };

  // prettier-ignore
  const prevIndex = () => (currentIndex > 0 ? currentIndex - 1 : sliderContent.length - 1);
  // prettier-ignore
  const nextIndex = () => (currentIndex < sliderContent.length - 1 ? currentIndex + 1 : 0);

  const contentAnimation = {
    hidden: ({ x, y }) => ({
      x,
      y,
      opacity: 0,
    }),
    visible: ({ delay }) => ({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: delay * 0.2 },
    }),
  };

  useEffect(() => {
    fetch('http://localhost:3000/sliderContent')
      .then((response) => response.json())
      .then((value) => {
        setSliderContent([...value]);
        setCurrentIndex(0);
      });
  }, []);

  if (sliderContent.length === 0 || currentIndex === undefined) {
    return <span>Данные с сервера не получены</span>;
  }

  return (
    <div className="flex flex-col items-center bg-milk sm:bg-white overflow-hidden">
      <motion.header
        className="flex sm:justify-between items-center w-full mt-6 sm:px-16 mb-6 sm:mb-9
        2xl:mt-28 lg:mt-12"
        // Анимация framer motion
        custom={{ x: 0, y: -40, delay: 2 }}
        initial="hidden"
        whileInView="visible"
        variants={contentAnimation}
      >
        <h1 className="text-xl sm:text-3xl text-center sm:text-left font-ev font-bold ">
          Есть всё, что бы наполнить жизнь счастьем
        </h1>
        <nav className="w-[112px] justify-between hidden sm:flex">
          <button
            type="button"
            className="w-[50px] h-[50px] flex justify-center items-center border border-grey rounded-full transition hover:bg-blue"
            onClick={() => {
              slide(prevIndex(), -1);
            }}
          >
            <Image
              src="/UI/arrow.svg"
              alt="arrow_left"
              width={10}
              height={10}
            />
          </button>

          <button
            type="button"
            className="w-[50px] h-[50px] ml-[12px] flex justify-center items-center border border-grey rounded-full transition hover:bg-blue"
            onClick={() => {
              slide(nextIndex(), 1);
            }}
          >
            <Image
              src="/UI/arrow.svg"
              alt="arrow_right"
              width={10}
              height={10}
              className="scale-x-[-1]"
            />
          </button>
        </nav>
      </motion.header>

      <motion.main
        className="flex items-baseline sm:w-[127vw]"
        custom={{ x: 0, y: -40, delay: 3 }}
        initial="hidden"
        whileInView="visible"
        variants={contentAnimation}
      >
        {/* Левая картинка */}
        <AnimatePresence mode="wait">
          <motion.div
            className=" bottom-[50px] rounded-xl container relative overflow-hidden bg-milk cursor-pointer
          w-3/12 2xl:h-[470px] xl:h-[400px] sm:h-[270px] hidden sm:block"
            onClick={() => {
              slide(prevIndex(), -1);
            }}
            // Анимация Animate Presence
            initial={{
              opacity: 0,
              x: direction === 1 ? 30 : -30,
              skewY: -2,
            }}
            key={prevIndex()}
            animate={{ opacity: 1, x: 0, skewY: -2 }}
            exit={{
              opacity: 0,
              x: direction === 1 ? -100 : 100,
            }}
            transition={{ duration: direction === 1 ? 0.2 : 0.6 }}
          >
            <Image
              src={sliderContent[prevIndex()].photo}
              alt="modern apartment complex"
              layout="fill"
              objectFit="cover"
              className="opacity-30 hover:opacity-60 transition"
            />
          </motion.div>
        </AnimatePresence>

        {/* Центральный слайд */}

        <motion.article className="sm:w-5/12 w-full sm:rounded-xl bg-milk">
          <AnimatePresence mode="wait">
            <motion.div
              // Анимация Animate Presence
              initial={{
                opacity: 0,
                x: direction === 1 ? 30 : -30,
              }}
              key={currentIndex}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: direction === 1 ? -100 : 100,
              }}
              transition={{ delay: 0, duration: 0.4 }}
              className="w-full h-[220px] sm:rounded-xl sm:container relative overflow-hidden bg-milk mb-9
          2xl:h-[500px] xl:h-[430px] sm:h-[300px]"
            >
              <button
                type="button"
                className="w-[75px] h-full absolute flex sm:hidden justify-center items-center hover:bg-grey hover:opacity-90 z-10"
                onClick={() => {
                  slide(prevIndex(), -1);
                }}
              >
                <Image
                  src="/UI/arrow.svg"
                  alt="arrow_left"
                  width={15}
                  height={10}
                />
              </button>

              <Image
                src={sliderContent[currentIndex].photo}
                alt="modern apartment complex"
                layout="fill"
                objectFit="cover"
              />

              <button
                type="button"
                className="w-[75px] h-full absolute flex sm:hidden justify-center items-center hover:bg-grey hover:opacity-90 z-10 right-0"
                onClick={() => {
                  slide(nextIndex(), 1);
                }}
              >
                <Image
                  src="/UI/arrow.svg"
                  alt="arrow_left"
                  width={15}
                  height={10}
                  className="scale-x-[-1]"
                />
              </button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              // Анимация Animate Presence
              initial={{
                opacity: 0,
                y: -20,
              }}
              key={sliderContent[currentIndex].title}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-ev font-bold mx-6 sm:ml-6 sm:mr-24 mb-3">
                {sliderContent[currentIndex].title}
              </h2>

              <p className="text-2xxs leading-normal font-ev font-medium mx-6 sm:ml-6 sm:mr-24 mb-10">
                {sliderContent[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.article>

        {/* Правая картинка */}
        <AnimatePresence mode="wait">
          <motion.div
            className=" bottom-[50px] rounded-xl container relative overflow-hidden bg-milk cursor-pointer
          w-3/12 2xl:h-[470px] xl:h-[400px] sm:h-[270px] hidden sm:block"
            onClick={() => {
              slide(nextIndex(), 1);
            }}
            // Анимация Animate Presence
            initial={{
              opacity: 0,
              x: direction === 1 ? 30 : -30,
              skewY: 2,
            }}
            key={prevIndex()}
            animate={{ opacity: 1, x: 0, skewY: 2 }}
            exit={{
              opacity: 0,
              x: direction === 1 ? -100 : 100,
            }}
            transition={{ duration: direction === 1 ? 0.6 : 0.2 }}
          >
            <Image
              src={sliderContent[nextIndex()].photo}
              alt="modern apartment complex"
              layout="fill"
              objectFit="cover"
              className="opacity-30 hover:opacity-60 transition"
            />
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Slider;
