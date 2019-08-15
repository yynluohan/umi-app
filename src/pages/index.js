import React from 'react';
import styles from './index.css';

export default function () {


  const obj = {
    a:undefined,
    b:'123',
    c:'456'
  }

  function filter(data) {
    let obj = {};
    if (Object.keys(data).length > 0) {
      for (let key in data) {
        if (data[key] != undefined) {
          obj[key] = data[key]
        }
      }
    }
    return obj
  }

  console.log('11111 ',filter(obj))

  return (
    <div>
      <div className={styles.style}>
        <span></span>
      </div>

      {/*<div className={styles.solarsys}>
        <div className={styles.sun}>太阳</div>

        <div className={styles.mercuryOrbit}></div>

        <div className={styles.mercury}></div>

        <div className={styles.venusOrbit}></div>

        <div className={styles.venus}></div>

        <div className={styles.earthOrbit}></div>

        <div className={styles.earth}></div>

        <div className={styles.marsOrbit}></div>

        <div className={styles.mars}></div>

        <div className={styles.jupiterOrbit}></div>

        <div className={styles.jupiter}></div>

        <div className={styles.saturnOrbit}></div>

        <div className={styles.saturn}></div>

        <div className={styles.uranusOrbit}></div>

        <div className={styles.uranus}></div>

        <div className={styles.neptuneOrbit}></div>

        <div className={styles.neptune}></div>
      </div>*/}
    </div>
  );
}
