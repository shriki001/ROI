import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography, Grid, Paper } from "@mui/material";
import { GetData } from "../store/actions/companyAction";
import Chart from "./Chart";
import TableDataContainer from "./TableDataContainer";
import ModeSelector from "./modeSelector";

export default function Home() {
  const dispatch = useDispatch();
  useEffect((_) => {
    dispatch(GetData());
  });

  return (
    <>
      <Paper
        style={{
          backgroundColor: "#007FFF",
          height: 40,
          padding: "20px 25px 10px",
          color: "white",
          fontSize: "xx-large",
        }}
      >
        <Typography
          variant="body"
          style={{
            textAlign: "left",
            margin: "10px 0",
          }}
        >
          Data Repots
        </Typography>
      </Paper>
      <Grid
        container
        spacing={2}
        style={{
          marginTop: 0,
          padding: 20,
        }}
      >
        <ModeSelector />
        <Grid item xs={12} style={{ backgroundColor: "white" }}>
          <div
            style={{
              maxHeight: 500,
              textAlign: "-webkit-center",
            }}
          >
            <Chart mode={0} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableDataContainer />
        </Grid>
      </Grid>
    </>
  );
}
