const router = require("express").Router();
const {
  models: { Puppy },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const puppies = await Puppy.findAll();
    res.json(puppies);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const puppy = await Puppy.findByPk(req.params.id);
    res.json(puppy);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Puppy.destroy({
      where: {
        id: req.params.id,
      }
    })
  } catch (err) {
    next(err);
  }
})
