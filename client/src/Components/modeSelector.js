import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab } from "@mui/material";
import { ChangeMode } from "../store/actions/modeAction";
import { SetTopCompaniesData } from "../store/actions/companyAction";

export default function ModeSelector() {
  const dispatch = useDispatch();
  const mode = useSelector(({ mode }) => mode.mode);
  const companyDataToShow = useSelector(({ roi }) => roi.companyDataToShow);
  function handleChange(_, index) {
    let topCompaniesData = [];
    switch (index) {
      case 0:
        topCompaniesData = companyDataToShow
          .sort((a, b) => b.installs - a.installs)
          .slice(0, 5);
        dispatch(SetTopCompaniesData(topCompaniesData));
        break;
      case 1:
        topCompaniesData = companyDataToShow
          .sort((a, b) => {
            const roi_a = a.revenue / a.cost,
              roi_b = b.revenue / b.cost;
            return roi_b - roi_a;
          })
          .slice(0, 5);
        dispatch(SetTopCompaniesData(topCompaniesData));
        break;
      default:
        break;
    }
    dispatch(ChangeMode(index));
  }

  return (
    <Tabs value={mode} onChange={handleChange}>
      <Tab label="Installs" style={{ textTransform: "capitalize" }} />
      <Tab label="ROI" style={{ textTransform: "capitalize" }} />
    </Tabs>
  );
}
