import React from 'react';
import { useField } from 'formik';
import { Button, ButtonGroup } from '@material-ui/core';
import classes from './style.module.css';

export default function ButtonGroupComponent({ namesButton, name }) {
  const [field, , helpers] = useField({ name });
  const { setValue } = helpers;
  return (
    <ButtonGroup className={classes.buttonGroup}>
      {namesButton.map((item, key) => (
        <Button
          key={key}
          name={name}
          value={item}
          className={classes.buttonGroupItem}
          variant="contained"
          onClick={() => setValue(item)}
          color={field.value === item ? 'primary' : 'default'}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
}
