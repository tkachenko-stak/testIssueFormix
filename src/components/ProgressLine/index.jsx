import React from 'react';
import classes from './style.module.css';

export default function ProgressLine({ level, quantityStep }) {
  const lineWidth = (level / quantityStep) * 100;
  return (
    <section className={classes.boxProgress}>
      <span className={classes.itemProgress} style={{ width: `${lineWidth}%` }} />
    </section>
  );
}
