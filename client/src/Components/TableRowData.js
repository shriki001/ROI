import { useSelector } from "react-redux";
import { TableCell, TableRow, TextField } from "@mui/material";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function TableRowData({ labels, onFilter }) {
  const companyDataToShow = useSelector(({ roi }) => roi.companyDataToShow);
  return (
    <>
      <TableRow key={0} tabIndex={-1}>
        {labels.map((label, index) => (
          <TableCell
            align={"center"}
            key={index}
            style={{ backgroundColor: ![0, 1].includes(index) && "white" }}
          >
            {[0, 1].includes(index) && (
              <TextField
                onChange={(e) => onFilter(e, index)}
                id="outlined-basic"
                label={`filter by ${label}`}
                variant="outlined"
              />
            )}
          </TableCell>
        ))}
      </TableRow>
      {companyDataToShow &&
        companyDataToShow.map(
          ({ installs, country, revenue, cost, display_name }, index) => {
            return (
              <TableRow hover tabIndex={-1} key={`${display_name}_${country}`}>
                <TableCell align={"center"}>{display_name}</TableCell>
                <TableCell align={"center"}>{country}</TableCell>
                <TableCell
                  align={"center"}
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  {numberWithCommas(installs)}
                </TableCell>
                <TableCell
                  align={"center"}
                  style={{
                    backgroundColor: "white",
                  }}
                >{`${parseFloat(revenue / cost).toFixed(2)}%`}</TableCell>
                <TableCell
                  align={"center"}
                  style={{
                    backgroundColor: "white",
                  }}
                />
              </TableRow>
            );
          }
        )}
    </>
  );
}
