"use client";

import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-mui";
// import { EnergyItem } from "./EnergyItem";

import CloseIcon from "@mui/icons-material/Close";

const MULTIPLIER = 100;

type LevelType = "+" | "-";
type EnergyLevel = LevelType[];

interface EnergyItemProps {
  description: string;
  energyLevel: EnergyLevel;
}

export const energyItem = {
  description: "",
  energyLevel: "",
};

const initialValues = {
  energyList: [energyItem],
};

export const EnergyList = () => {
  const [totalEnergy, setTotalEnergy] = useState<number | undefined>(undefined);
  const [shouldRenderTotal, setShouldRenderTotal] = useState<boolean>(false);

  useEffect(() => {
    if (totalEnergy !== undefined) {
      setShouldRenderTotal(true);
    }
  }, [totalEnergy]);

  const calculateEnergy = (energyLevel: EnergyLevel) => {
    let total = 0;
    energyLevel.forEach((i: LevelType) => {
      if (i === "+") {
        total += MULTIPLIER;
      } else if (i === "-") {
        total -= MULTIPLIER;
      }
    });

    return total;
  };

  const handleSubmit = async (values: any) => {
    let total = 0;

    values.energyList.forEach((item: EnergyItemProps) => {
      total += calculateEnergy([...item.energyLevel]);
    });

    setTotalEnergy(total);

    console.log("my values", values);
    return new Promise((res) => setTimeout(res, 1000));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting, setFieldValue, submitForm }) => (
          <Form autoComplete="off">
            <FieldArray name="energyList">
              {({ remove, push }: any) => (
                <>
                  {values.energyList.length > 0 &&
                    values.energyList.map((_, index) => (
                      <Box
                        sx={{
                          display: "flex",
                          maxWidth: "100%",
                          marginTop: "1%",
                          marginBottom: "1%",
                        }}>
                        <Field
                          fullWidth
                          name={`energyList.${index}.description`}
                          component={TextField}
                          label="Description"
                          sx={{
                            marginRight: "2%",
                            flexGrow: 2,
                          }}
                        />
                        <Field
                          fullWidth
                          name={`energyList.${index}.energyLevel`}
                          component={TextField}
                          label="Amount of Energy"
                          sx={{
                            marginRight: "2%",
                            flexGrow: 1,
                          }}
                        />
                        <Button
                          disabled={isSubmitting}
                          onClick={() => remove(index)}>
                          <CloseIcon />
                        </Button>
                      </Box>
                    ))}
                  <Divider
                    sx={{ marginTop: "2%", marginBottom: "2%" }}></Divider>
                  <Button
                    disabled={isSubmitting}
                    onClick={() => push(energyItem)}>
                    Add Item
                  </Button>
                </>
              )}
            </FieldArray>
            <Button
              type="submit"
              onClick={submitForm}
              color="primary"
              variant="contained"
              startIcon={
                isSubmitting ? (
                  <CircularProgress size="0.9rem" sx={{ color: "white" }} />
                ) : undefined
              }
              sx={{ marginLeft: "2%" }}>
              {isSubmitting ? "Calculating" : "Calculate"}
            </Button>
            {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
      {shouldRenderTotal ? (
        <Box sx={{ marginTop: "2%" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            ...your energy level is <strong>{totalEnergy}</strong>.
          </Typography>
          {totalEnergy && totalEnergy < 0 ? (
            <Alert sx={{ marginTop: "1%" }} severity="error">
              You are overwhelmed!
            </Alert>
          ) : undefined}
        </Box>
      ) : undefined}
    </Box>
  );
};
