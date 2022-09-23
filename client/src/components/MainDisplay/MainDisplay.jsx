import React from 'react'
import styles from "./MainDisplay.module.css"
import ImageSlider from './Slider/ImageSlider'

const MainDisplay = () => {
    return (
        <main>
            <div style={{height: "64px"}}/>
            <div className={styles.mainBox}>
                <div className={styles.leftBox}>
                    <div>
                        <h1 className={styles.font}>Shop with Comfort</h1>
                        <div className={styles.smallBox}></div>
                        <p className={styles.mainP}>The best shoes you wish to buy online <br/>It's the matter of a couple clicks</p>
                    </div>
                </div>
                <div className={styles.rightBox}>
                    <ImageSlider />
                </div>
            </div>
        </main>
    )
}

export default MainDisplay