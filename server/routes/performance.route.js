const { Router } = require("express");
const PerformanceController = require("../controllers/performance.controller");

const router = Router();

router.get("/countries", PerformanceController.GetCountries)
router.get("/countries/company/:company_id", PerformanceController.GetCompanyById)

module.exports = router;
