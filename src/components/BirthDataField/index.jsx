import React, { useCallback } from 'react';
import { useField } from 'formik';
import moment from 'moment';
import classes from './style.module.css';

const fieldBirthPlaceholder = ['DD', 'MM', 'YYYY'];
const nameFields = ['day', 'month', 'year'];
const minYear = 18;

const checkYear = value => {
  const firstDate = moment();
  const secondDate = moment(value, 'DD-MM-YYYY');
  const yearDiff = firstDate.diff(secondDate, 'year');
  return minYear < yearDiff;
};

export default function BirthDataField({ name }) {
  const validate = useCallback(values => {
    const data = `${values.day}-${values.month}-${values.year}`;
    const validData = moment(data, 'DD-MM-YYYY').isValid();
    const year = checkYear(data);
    if (
      values.day.length < 2
            || values.month.length < 2
            || values.year.length < 4
    ) {
      return 'Fill in the empty fields';
    }
    if (!validData) {
      return 'Date is not valid';
    }
    if (!year) {
      return 'You are too young';
    }
    return false;
  }, []);

  const [field, meta, helpers] = useField({ name, validate });
  const { setValue, setTouched } = helpers;

  const checkLength = useCallback((value, nameField) => {
    if (nameField === 'year') {
      return String(value).length < 5;
    }
    return String(value).length < 3;
  }, []);

  const setNewValue = useCallback((value, nameField) => {
    setValue({ ...(field.value || {}), [nameField]: value.toString() });
  }, [field.value, setValue]);

  const handelChange = useCallback(({ target: { value, name: nameField } }) => {
    setTouched(true);
    if (checkLength(value, nameField)) setNewValue(value, nameField);
  }, [checkLength, setNewValue, setTouched]);

  return (
    <>
      <div>
        {nameFields.map((item, key) => (
          <input
            name={item}
            key={key}
            type="text"
            onChange={handelChange}
            className={classes.customInput}
            value={field.value[item]}
            placeholder={fieldBirthPlaceholder[key]}
          />
        ))}
      </div>
      <div className="errorMessage">{meta.touched && meta.error}</div>
    </>
  );
}
