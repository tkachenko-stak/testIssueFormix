import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import Select from 'react-select';
import ButtonGroupComponent from '../../../components/ButtonGroupComponent';
import BirthDataField from '../../../components/BirthDataField';
import { setLevelProgressLine, setScreen, setValueUserData } from '../../../store/redusers/StateApp';
import classes from './style.module.css';

const options = [
  { value: '', label: '' },
  { value: 'friends', label: 'Friends' },
  { value: 'family', label: 'Family' },
  { value: 'university', label: 'University' },
];
const namesButton = ['MALE', 'FEMALE', 'UNSPECIFIED'];
const validation = object().shape({
  gender: string()
    .required(),
  place: string()
    .required(),
});

export default function ConfidentialInformationForm() {
  const dispatch = useDispatch();
  const { levelProgressLine } = useSelector(state => state);

  const transitionLogic = useCallback(() => {
    dispatch(setLevelProgressLine(levelProgressLine + 1));
    dispatch(setScreen('CompletionScreen'));
  }, [dispatch, levelProgressLine]);

  const reverse = useCallback(() => {
    dispatch(setLevelProgressLine(levelProgressLine - 1));
    dispatch(setScreen('LoginInformationScreen'));
  }, [dispatch, levelProgressLine]);

  const setValue = useCallback(obj => {
    dispatch(setValueUserData(obj));
  }, [dispatch]);

  const onSubmit = useCallback(obj => {
    transitionLogic();
    setValue(obj);
  }, [setValue, transitionLogic]);

  return (
    <main className="mainStyle">
      <Formik
        initialValues={{ birthday: { day: '', month: '', year: '' }, gender: 'UNSPECIFIED', place: '' }}
        onSubmit={onSubmit}
        validationSchema={validation}
      >
        {({
          values, handleSubmit, errors, setFieldValue,
        }) => (
          <Form className={classes.styleForm} onSubmit={handleSubmit}>
            <span className={classes.title}>DATE OF BIRTH</span>
            <BirthDataField name="birthday" />
            <span className={classes.title}>GENDER</span>
            <ButtonGroupComponent namesButton={namesButton} name="gender" />
            <span className={classes.title}>WHERE DID YOU HEAR ABOUT IS?</span>
            <Select
              className={classes.select}
              name="place"
              value={values.place}
              options={options}
              onChange={opt => setFieldValue('place', opt)}
            />
            <p className="errorMessage">{errors.place}</p>
            <section className="footerStyle someButton">
              <span onClick={reverse} className="button">
                Back
              </span>
              <button type="submit" className="button">Next</button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}
