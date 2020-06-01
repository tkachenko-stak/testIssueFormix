import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ConfidentialInformationForm from '../../screen/forms/ConfidentialInformationForm';
import CompletionScreen from '../../screen/CompletionScreen';
import ProgressLine from '../ProgressLine';
import classes from './initialComponent.module.css';
import LoginForm from '../../screen/forms/LoginForm';
import { SCREEN_NAMES } from '../../common/screenName';
import '../../screen/styles.css';

export default function InitialComponent() {
  const currentScreen = useSelector(state => state.currentScreen);
  const levelProgressLine = useSelector(state => state.levelProgressLine);
  const memoizedValue = useMemo(() => {
    if (currentScreen === SCREEN_NAMES.LOGIN_FORM) return <LoginForm />;
    if (currentScreen === SCREEN_NAMES.CONFIDENTIAL_FORM) return <ConfidentialInformationForm />;
    if (currentScreen === SCREEN_NAMES.COMPLETION_SCREEN) return <CompletionScreen />;
    return null;
  }, [currentScreen]);
  return (
    <section className={classes.container}>
      <header>
        <section className="titleBoxStyle">
          <h1 className="titleTextStyle">Signup</h1>
        </section>
      </header>
      <ProgressLine level={levelProgressLine} quantityStep={3} />
      {memoizedValue}
    </section>
  );
}
