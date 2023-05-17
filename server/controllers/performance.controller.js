module.exports.GetCountries = async (req, res) => {
  const Countries = global.db.collection("Countries");
  const countries = await Countries.find(
    {},
    { projection: { _id: 0 } }
  ).toArray();
  return res.send(countries);
};

module.exports.GetCompanyById = async (req, res) => {
  const { company_id } = req.params;
  if (!isFinite(company_id)) return res.sendStatus(400);
  const CompaniesData = global.db.collection("CompaniesData");
  const companiesData = await CompaniesData.find(
    { company_id },
    { projection: { _id: 0 } }
  ).toArray();
  if (!companiesData.length) return res.sendStatus(404);
  return res.send(companiesData);
};
