const axios = require("axios");
const crypto = require("crypto");
const { removeStopwords, swe } = require("stopword");
var thesaurus = require("thesaurus");
var md5 = require("md5");

const extractDomain = (url) => {
  /* Remove protocol and www if present */
  let domain = url.replace(/(^\w+:|^)\/\/(www\.)?/, "");

  /* Remove path and query string */
  domain = domain.replace(/\/.*$/, "");

  return domain;
};
/**
 *
 * @description - This function take the query params as email or website url
 * @returns It return the `url` of image
 */
exports.getImage = async (req, res) => {
  try {
    const { name, isEmail } = req.query;
    let url;
    let domain;

    /* For email you can use unofaltu@gmail.com */

    if (isEmail) {
      const hash = md5(name);
      url = `https://gravatar.com/avatar/${hash}`;
    } else {
      domain = extractDomain(name);
      url = `https://logo.clearbit.com/${domain}`;
    }

    try {
      await axios.get(url);
      return res.status(200).json({ url, success: true });
    } catch (err) {
      /* Here, i am checking the if domain name not found then return the similar some domain name similar to domain */
      if (!isEmail) {
        const name = domain?.split(".")[0];

        url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`;
        let data = await axios.get(url);
        data = data?.data;

        if (data?.length === 0) {
          return res
            .status(400)
            .json({ msg: "Given name is incorrect", success: false });
        }
        return res
          .status(200)
          .json({ msg: "You can search these things", data, success: true });
      }

      return res
        .status(400)
        .json({ msg: "Given name is incorrect", success: false });
    }
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

/**
 *
 * @description This function take the query params as sentence and convert the words with its synonyms and reduce the words
 * @returns It is return the new sentence which is generated
 */
exports.getSpinnerText = async (req, res) => {
  try {
    const { sentence } = req.query;
    const wordArr = sentence.split(" ");

    /* We are finding the random index of synonyms and implement them */
    for (let i = 0; i < wordArr.length; i++) {
      if (wordArr[i]?.length > 2) {
        let synonyms = thesaurus.find(wordArr[i]);
        let len = synonyms?.length;

        /* If the any synonyms not fount then we are not updated them */
        if (len > 0) {
          let ind = Math.floor(Math.random() * len);
          wordArr[i] = synonyms[ind % len];
        }
      }
    }

    const data = removeStopwords(wordArr);
    return res.status(200).json({ data: data.join(" "), success: true });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};
