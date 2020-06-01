import React, { useCallback } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import classes from './style.module.css';

export default function CompletionScreen() {
  const { userData } = useSelector(state => state);
  const log = useCallback(() => {
    console.log(userData);
  }, [userData]);
  return (
    <section className="mainStyle">
      <section className={classes.contentBox}>
        <section className={classes.circle}>
          <AiOutlineCheck className={classes.icon} size={70} />
        </section>
        <section onClick={log} className={classes.link}>
          <span>Go to Dashboard</span>
        </section>
      </section>
    </section>
  );
}
