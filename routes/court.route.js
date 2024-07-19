const express = require("express");
const {
  createCourt,
  getCourts,
  getCourt,
  updateCourt,
  deleteCourt,
  rentCourt,
  unrentCourt,
} = require("../controllers/court.controller");
const router = express.Router();

router.post("/", createCourt);
router.get("/", getCourts);
router.get("/:id", getCourt);
router.put("/:id", updateCourt);
router.delete("/:id", deleteCourt);
router.put("/:id/rent", rentCourt);
router.put("/:id/unrent", unrentCourt);

module.exports = router;
