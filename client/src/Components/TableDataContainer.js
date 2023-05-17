import {
  TableSortLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  SetCompaniesData,
  SetTopCompaniesData,
} from "../store/actions/companyAction";
import TableRowData from "./TableRowData";
import { useState } from "react";

export default function TableDataContainer() {
  const labels = ["Company", "Country", "Installes", "ROI", "Industry ROI"];
  const [direction, setDirection] = useState("desc");
  const dispatch = useDispatch();
  const [companyDataToShow, companyData] = useSelector(({ roi }) => [
    roi.companyDataToShow,
    roi.companyData,
  ]);

  function onFilter(event, index) {
    const { value } = event.target;
    const companyDataToShow = companyData.filter((data) => {
      switch (labels[index]) {
        case "Country":
          return (
            data.country
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase()) ?? data
          );
        case "Company":
          return (
            data.display_name
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase()) ?? data
          );
        default:
          return data;
      }
    });
    const topCompaniesData = companyDataToShow
      .sort((a, b) => b.installs - a.installs)
      .slice(0, 5);
    dispatch(SetCompaniesData(companyDataToShow));
    dispatch(SetTopCompaniesData(topCompaniesData));
  }

  function setCompanyDirection() {
    companyDataToShow.sort((a, b) =>
      direction === "asc"
        ? a.display_name.localeCompare(b.display_name)
        : b.display_name.localeCompare(a.display_name)
    );
    setDirection(direction === "asc" ? "desc" : "asc");
  }

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {labels.map((lable, index) => (
              <TableCell
                key={index}
                align={"center"}
                style={{
                  minWidth: 100,
                  verticalAlign: "baseline",
                  backgroundColor: [0, 1].includes(index) && "lightgrey",
                }}
              >
                {lable}
                {index === 0 && (
                  <TableSortLabel
                    active
                    direction={direction}
                    onClick={setCompanyDirection}
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRowData onFilter={onFilter} labels={labels} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
