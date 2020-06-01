import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { string, object, ref } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setLevelProgressLine, setScreen, setValueUserData } from '../../../store/redusers/StateApp';
import LoginField from '../../../components/LoginField';
import classes from './style.module.css';


const validation = object().shape({
  email: string()
    .email('Invalid email address')
    .required(),
  password: string()
    .min(6, 'Enter at least 6 characters')
    .required(),
  confirmPassword: string()
    .min(6, 'Enter at least 6 characters')
    .oneOf([ref('password'), null], 'Passwords must match')
    .required(),
});

const fields = [{
  name: 'email',
  type: 'email',
  title: 'Email',
}, {
  name: 'password',
  type: 'password',
  title: 'Password',
}, {
  name: 'confirmPassword',
  type: 'password',
  title: 'ConfirmPassword',
}];

export default function LoginForm() {
  const { levelProgressLine, userData } = useSelector(state => state);
  const dispatch = useDispatch();

  const transitionLogic = useCallback(() => {
    dispatch(setLevelProgressLine(levelProgressLine + 1));
    dispatch(setScreen('ConfidentialInformationForm'));
  }, [dispatch, levelProgressLine]);

  const setValue = useCallback(obj => {
    dispatch(setValueUserData(obj));
  }, [dispatch]);

  const handleSubmit = useCallback(obj => {
    transitionLogic();
    setValue(obj);
  }, [setValue, transitionLogic]);

  const initialData = {
    email: userData.email || '',
    password: userData.password || '',
    confirmPassword: userData.confirmPassword || '',
  };

  return (
    <main className="mainStyle">
      <Formik
        initialValues={initialData}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        <Form className="formStyle">
          <div className={classes.styleBoxForm}>
            {fields.map(item => (
              <LoginField name={item.name} type={item.type} title={item.title} />
            ))}
          </div>
          <section className="footerStyle oneButton">
            <button type="submit" className="button">Next</button>
          </section>
        </Form>
      </Formik>
    </main>
  );
}
