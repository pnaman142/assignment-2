const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/contactControllers");
const validatetoken = require("../middleware/validateTokenHandler");

router.use(validatetoken);

router.route("/").get(getPosts);

router.route("/").post(createPost);

router.route("/:id").delete(deletePost);

router.route("/:id").put(updatePost);

module.exports = router;
