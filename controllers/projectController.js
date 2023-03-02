const Projects = require("../models/projectModel");
const cloudninary = require("../middleware/cloudinary");

const AddProject = async (req, res) => {
  try {
    //Get Project Title from body
    var {
      projectTitle,
      projectCategory,
      projectDescription,
      projectStartDate,
      projectEndDate,
      projectReview,
      projectLink,
      url,
    } = req.body;

    //Check if project already exist
    const checkProject = await Projects.findOne({ projectTitle });
    if (checkProject)
      return res
        .status(409)
        .json({ Error: "Project already exist", status: false });

    //Upload Project Images
    const uploader = async (path) =>
      await cloudninary.uploads(path, "Project Images");

    let ProjectImages = [];
    const { path, filename } = req.files.thumbnail[0];
    const projectThumbnailurl = await uploader(path);
    const projectThumbnail = { url: projectThumbnailurl.url, img: filename };
    const images = req.files.ProjectImages;

    for (const file of images) {
      const { filename } = file;
      const filePath = await uploader(path);
      ProjectImages.push({ url: filePath.url, img: filename });
    }

    // Replace space from with _ in url
    if (url) {
      url = url.replace(/ /g, "_");
    }

    // Get Project Details from body
    const projects = new Projects({
      projectTitle: projectTitle,
      projectCategory: projectCategory,
      projectDescription: projectDescription,
      projectStartDate: projectStartDate,
      projectEndDate: projectEndDate,
      projectReview: projectReview,
      projectLink: projectLink,
      ProjectImages: ProjectImages,
      ProjectThumbnail: projectThumbnail,
      url: url,
    });

    console.log(projects);

    // Send Project Details in Database
    // await projects.save();
    res.status(201).send("Project Added");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const GetAllProjects = async (req, res) => {
  try {
    //Get all projects from database
    const project = await Projects.find();
    res.status(200).send(project);
  } catch (error) {
    res.send(error);
  }
};

const GetSingleProjects = async (req, res) => {
  try {
    //Get Single project from database
    const url = req.params.url;
    const singleProject = await Projects.findOne({ url: url });

    res.status(200).send(singleProject);
  } catch (error) {
    res.send(error);
  }
};

const EditProject = async (req, res) => {
  try {
    //Edit Project by id
    const id = req.params.id;
    const editProject = await Projects.findByIdAndUpdate(id);

    res.status(200).send("Project Edited");
  } catch (error) {
    res.send("Error While Editing Project");
  }
};

const DeleteProject = async (req, res) => {
  try {
    //Delete Project by id
    const id = req.params.id;
    const project = await Projects.findByIdAndDelete(id);

    res.send(`Project ${project.projectTitle} has been deleted.`);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  AddProject,
  GetAllProjects,
  GetSingleProjects,
  EditProject,
  DeleteProject,
};
