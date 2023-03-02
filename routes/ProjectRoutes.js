const express = require("express");
const { upload } = require("../middleware/multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  AddProject,
  EditProject,
  DeleteProject,
  GetAllProjects,
  GetSingleProjects,
} = require("../controllers/projectController");

const router = express.Router();

router.post(
  "/",
  verifyAdmin,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "ProjectImages",
      maxCount: 5,
    },
  ]),

  AddProject
);
router.get("/", GetAllProjects);
router.get("/:url", GetSingleProjects);
router.patch("/:id", verifyAdmin, EditProject);
router.delete("/:id", verifyAdmin, DeleteProject);

module.exports = router;
