const express = require("express");
const router = express.Router();

router.post("/servicio", (req, res) => {
  let body = req.body;
  res.json({ body });
});

module.exports = router;
