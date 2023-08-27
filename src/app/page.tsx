import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { EnergyList } from "@/components/EnergyList";
import Typography from "@mui/material/Typography";

export default function HomePage() {
  return (
    <Box>
      <Alert severity="info">
        <AlertTitle>Hello 👋</AlertTitle>
        Overwhemulator is an energy calculator. Add an event and rate the amount
        of energy that event gave in pluses (+) or took in minuses (-). Click
        CALCULATE to reveal whether you have an energy deficit — if you do, this
        means you're overwhelmed!
      </Alert>
      <Grid container sx={{ marginTop: "3%" }}>
        <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
          Given these recent events...
        </Typography>
        <EnergyList></EnergyList>
      </Grid>
    </Box>
  );
}
