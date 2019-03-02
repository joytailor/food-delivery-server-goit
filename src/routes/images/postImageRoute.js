const multer = require("multer");
const fs = require("fs");
const path = require("path");
const util = require("util");

const allProducts = path.join(
  __dirname,
  "../../",
  "db/products/",
  "all-products.json"
);

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const IMAGE_FOLDER = path.join(__dirname, "../../", "db/products/images");

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, IMAGE_FOLDER);
  },

  filename: (req, file, next) => {
    next(null, file.originalname);
  }
});

const upload = multer({ storage });

const appendImgToProduct = (id, path) => {
  let obj = {};
  let json = JSON.stringify(obj);

  return readFileAsync(allProducts, "utf-8")
    .then(data => {
      debugger;
      obj = JSON.parse(data);

      productsArr = obj.filter(product => product.id === +id);
      productsArr.forEach(product => (product.image = path));

      obj.map(
        product =>
          productsArr.find(productItem => product.id === productItem.id) ||
          product
      );

      json = JSON.stringify(obj);

      writeFileAsync(allProducts, json, "utf-8");
    })
    .catch(err => {
      console.log(err);
    });
};

const saveImage = (req, res) => {
  const fileObj = req.file;
  const productId = req.body.productId;

  const imagePath = path.join(IMAGE_FOLDER, fileObj.originalname);

  if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath);
  }

  const sendResponse = () => {
    res.set("Content-Type", "application/json");
    res.json({ status: `image was added to ${productId} product` });
  };

  const sendError = () => {
    res.status(400);
    res.json({ status: "error" });
  };

  appendImgToProduct(productId, imagePath)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = () => [upload.single("file"), saveImage];