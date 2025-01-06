const express = require("express");
const router = express.Router();
const {
  createRoboGenius,
  getAllRoboGenius,
} = require("../Controller/roboGeniusController");

router.post('/addRoboGenius', createRoboGenius);
router.get('/getallRoboGenius', getAllRoboGenius);



module.exports = router;