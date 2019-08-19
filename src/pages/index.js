import React from 'react';
import styles from './index.css';

export default function () {

  var list = ['a', 1, true];

  console.log(list.includes(1,1));
  console.log(list.includes(1,2));
  console.log(list.includes(1,-4));

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
