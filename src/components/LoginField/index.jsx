import React, { useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import classes from '../../screen/forms/LoginForm/style.module.css';

export default function LoginField({ name, title, type }) {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const handelChange = useCallback(({ target: { value } }) => {
    setValue(value);
  }, [setValue]);

  return (
    <div className={classes.formItemStyle}>
      <TextField
        className={classes.TextField}
        label={title}
        name={name}
        type={type}
        value={field.value}
        onChange={handelChange}
        error={!!meta.error}
        helperText={meta.error}
      />
    </div>
  );
}
