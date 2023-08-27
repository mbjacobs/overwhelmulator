"use client";

import { FormControl, FormLabel, TextField, Button } from "@mui/material";
import { Field } from "formik";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { energyItem } from "./EnergyList";

interface EnergyItemProps {
  index: number;
  handleRemove: () => void;
  isSubmitting: boolean;
  values: any;
  setFieldValue: () => void;
}

export const EnergyItem = (props: EnergyItemProps) => {
  const { index, handleRemove, isSubmitting, setFieldValue } = props;

  const [description, setDescription] = useState("");
  const [energy, setEnergy] = useState("");
  const [item, setItem] = useState(energyItem);

  // React.useEffect(() => {
  //   name && setFieldValue && setFieldValue(name, item);
  // }, [name, item, setFieldValue]);

  return (
    <>
      <Field
        fullWidth
        name={`energyList.${index}.description`}
        component={TextField}
        label="Description"
      />
      <Field
        fullWidth
        name={`energyList.${index}.energyLevel`}
        component={TextField}
        label="Energy Level"
      />
      <Button disabled={isSubmitting} onClick={handleRemove}>
        <CloseIcon />
      </Button>
    </>
  );
};
