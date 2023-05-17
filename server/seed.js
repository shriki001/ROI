const { MongoClient } = require("mongodb");
const fs = require("fs");
const dbURI = "mongodb://mongo:27017";
console.log(`connect to ${dbURI}`);
(async (_) => {
  const client = new MongoClient(dbURI);
  const db = client.db("ROI");
  const customersCount = await db.collection("Customers").countDocuments();
  if (customersCount === 0) {
    console.log(`seed companies.json`);
    const companiesFile = fs.readFileSync("./mongoData/companies.json");
    const companies = JSON.parse(companiesFile);
    await db.collection("Customers").insertMany(companies);
  }
  const countriesCount = await db.collection("Countries").countDocuments();
  if (countriesCount === 0) {
    console.log(`seed countries.json`);
    const countriesFile = fs.readFileSync(
      "./mongoData/performance/countries.json"
    );
    const countries = JSON.parse(countriesFile);
    await db.collection("Countries").insertMany(countries);
  }
  const companyCount = await db.collection("CompaniesData").countDocuments();
  if (companyCount === 0) {
    fs.readdirSync("./mongoData/performance/countries/").forEach(
      async (file) => {
        const company = file.split(".json")[0];
        const companyID = company.split("_")[1];
        const companyFile = fs.readFileSync(
          `./mongoData/performance/countries/${file}`
        );
        const companyDataToShow = JSON.parse(companyFile);
        companyDataToShow.forEach((company) => (company.company_id = companyID));
        console.log(`seed ${file}`);
        await db.collection("CompaniesData").insertMany(companyDataToShow);
      }
    );
  }
  console.log("done seed");
  process.exit(0);
})();
