const PortfolioItem = require('../models/PortfolioItem');

exports.addProject = async (req, res) => {
  try {
    const { title, description, link, imageUrl } = req.body;
    const project = new PortfolioItem({
      user: req.user.id,
      title,
      description,
      link,
      imageUrl,
    });
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to add project' });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await PortfolioItem.find({ user: req.user.id });
  res.json(projects);
};

exports.deleteProject = async (req, res) => {
  await PortfolioItem.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Project deleted' });
};
