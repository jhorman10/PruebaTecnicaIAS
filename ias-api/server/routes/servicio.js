const express = require("express");
const router = express.Router();

router.get("/servicio", (req, res) => {
//   let id = req.params.id;
  let body = req.body;
  console.log(body);
  res.json({ body, id });
});

module.exports = router;
