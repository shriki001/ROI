module.exports.GetCompanies = async (_, res) => {
  const Customers = global.db.collection("Customers");
  const customers = await Customers.find(
    {},
    { projection: { _id: 0, display_name: 1, id: 1 } }
  ).toArray();
  return res.send(customers);
};
