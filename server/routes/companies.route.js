const { Router } = require("express");
const CompaniesController = require("../controllers/companies.controller");
const router = Router();

router.get("/", CompaniesController.GetCompanies);

module.exports = router;
