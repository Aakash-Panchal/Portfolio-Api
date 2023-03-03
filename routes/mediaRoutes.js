const express = require("express");
const { upload } = require("../middleware/multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  AddMedia,
  getMedia,
  deleteMedia,
} = require("../controllers/mediaController");

const router = express.Router();

router.post(
  "/",
  verifyAdmin,
  upload.single("assets"),

  AddMedia
);
router.get("/", verifyAdmin, getMedia);
router.delete("/:id", verifyAdmin, deleteMedia);

module.exports = router;
