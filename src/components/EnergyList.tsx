"use client";

import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Alert,
  InputBase,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { TextField } from "formik-mui";
// import { EnergyItem } from "./EnergyItem";

import CloseIcon from "@mui/icons-material/Close";
import AddEnergyIcon from "@mui/icons-material/AddBox";
import SubtractEnergyIcon from "@mui/icons-material/IndeterminateCheckBox";

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

    // console.log("my values", values);
    return new Promise((res) => setTimeout(res, 1000));
  };

  const addEnergy = (values: any, index: number) => {
    return (values.energyList[index].energyLevel += "+");
  };

  const subtractEnergy = (values: any, index: number) => {
    return (values.energyList[index].energyLevel += "-");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          values,
          isSubmitting,
          setFieldValue,
          submitForm,
          handleChange,
        }) => (
          <Form autoComplete="off">
            <FieldArray name="energyList">
              {({ remove, push }: any) => (
                <>
                  {values.energyList.length > 0 &&
                    values.energyList.map((_, index) => (
                      <Box
                        key={`energy-list-item-${index}`}
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
                        <Paper
                          sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: 600,
                            marginRight: "2%",
                            flexGrow: 1,
                          }}>
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder={"Amount of Energy"}
                            inputProps={{ "aria-label": "enter energy" }}
                            fullWidth
                            name={`energyList.${index}.energyLevel`}
                            value={values.energyList[index].energyLevel}
                            onChange={handleChange}
                          />
                          <IconButton
                            onClick={() => {
                              setFieldValue(
                                `energyList.${index}.energyLevel`,
                                subtractEnergy(values, index)
                              );
                            }}
                            sx={{ p: "10px" }}
                            aria-label="subtract-energy">
                            <SubtractEnergyIcon />
                          </IconButton>
                          <Divider
                            sx={{ height: 28, m: 0.5 }}
                            orientation="vertical"
                          />
                          <IconButton
                            onClick={() => {
                              setFieldValue(
                                `energyList.${index}.energyLevel`,
                                addEnergy(values, index)
                              );
                            }}
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="add-energy">
                            <AddEnergyIcon />
                          </IconButton>
                        </Paper>
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
                    onClick={() =>
                      push({
                        description: "",
                        energyLevel: "",
                      })
                    }>
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
                isSubmitting && (
                  <CircularProgress size="0.9rem" sx={{ color: "white" }} />
                )
              }
              sx={{ marginLeft: "2%" }}>
              {isSubmitting ? "Calculating" : "Calculate"}
            </Button>
            {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
      {shouldRenderTotal && (
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
      )}
    </Box>
  );
};
