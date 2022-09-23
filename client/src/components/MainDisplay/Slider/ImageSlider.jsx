import React, { useState } from 'react'
import { SliderData } from './SliderData'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa"
import styles from "./Slider.module.css"

const ImageSlider = () => {
    const [current, setCurrent] = useState(0)
    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    return (
        <section className={styles.slider}>
            <FaArrowAltCircleLeft className={styles.leftArrow} onClick={prevSlide}/>
            <FaArrowAltCircleRight className={styles.rightArrow} onClick={nextSlide}/>
            {
                SliderData.map((slide, i) => (
                    <div key={i} className={i === current ? styles.slideActive : styles.slide }>
                        {
                            i === current && (
                            <img src={slide.image} alt="shoe" className={styles.image}/>)
                        }
                    </div>
                ))
            }
        </section>
    )
}

export default ImageSlider