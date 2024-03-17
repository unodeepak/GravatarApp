const schema = require("./validationSchema");

function isEmail(text) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  return emailRegex.test(text);
}

exports.getImageBody = (req, res, next) => {
  try {
    const { error } = schema.getImageSchema.validate(req.query);

    if (error) {
      return res
        .status(400)
        .json({ msg: error?.details?.[0].message, success: false });
    }

    req.query.name = req.query?.name?.trim()?.toLowerCase();
    req.query.isEmail = isEmail(req.query.name);

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getTextBody = (req, res, next) => {
  try {
    const { error } = schema.getTextSchema.validate(req.query);

    if (error) {
      return res
        .status(400)
        .json({ msg: error?.details?.[0].message, success: false });
    }

    req.query.sentence = req.query?.sentence?.trim();

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};