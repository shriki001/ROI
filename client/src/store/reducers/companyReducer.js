const initState = {
  companyDataToShow: [],
  companyData: [],
  topCompaniesData: [],
};

const companyReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        companyData: action.companyDataToShow,
        companyDataToShow: action.companyDataToShow,
        companise: action.companise,
        topCompaniesData: action.topCompaniesData,
      };
    case "SET_TOP_COMPANIES": {
      return {
        ...state,
        topCompaniesData: action.topCompaniesData,
      };
    }
    case "SET_COMPANIES_DATA": {
      return {
        ...state,
        companyDataToShow: action.companyDataToShow,
      };
    }
    default:
      return state;
  }
};
export default companyReducer;
