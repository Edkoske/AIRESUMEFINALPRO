const axios = require('axios');
const Resume = require('../models/Resume');

exports.generateResume = async (req, res) => {
  try {
    const { summary, experience, skills, targetRole, template } = req.body;

    const prompt = `Create a professional resume JSON for a ${targetRole} using this summary: ${summary}.
Experience: ${experience}. Skills: ${skills}.
Return structured JSON with sections: header, summary, experience[], education[], skills[].`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content); // ensure valid JSON output

    const resume = new Resume({
      user: req.user.id,
      title: `${targetRole} Resume`,
      data: parsed,
      template,
    });

    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ msg: 'AI generation failed' });
  }
};

exports.getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user.id });
  res.json(resumes);
};

exports.deleteResume = async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Resume deleted' });
};
