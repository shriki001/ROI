import axios from "axios";

export const GetData = (_) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/companies`);
    const companise = res.data;
    const promises = companise.map((company) =>
      axios.get(
        `/api/performance/countries/company/${company.id}`
      )
    );
    const allData = await Promise.all(promises);
    let companyDataToShow = [];
    allData.forEach(({ data }) => {
      const { display_name } = companise.find(
        (company) => company.id === Number(data[0].company_id)
      );
      data.forEach((d) => (d.display_name = display_name));
      companyDataToShow.push(data);
    });
    companyDataToShow = companyDataToShow.flat();
    const topCompaniesData = companyDataToShow
      .sort((a, b) => b.installs - a.installs)
      .slice(0, 5);
    dispatch({ type: "GET_DATA", companise, companyDataToShow, topCompaniesData });
  } catch (e) {
    /* no data to show right now*/
  }
};

export const SetTopCompaniesData = (topCompaniesData) => async (dispatch) =>
  dispatch({ type: "SET_TOP_COMPANIES", topCompaniesData });

export const SetCompaniesData = (companyDataToShow) => async (dispatch) =>
  dispatch({ type: "SET_COMPANIES_DATA", companyDataToShow });
