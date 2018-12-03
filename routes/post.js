const express = require('express');
const postRouter = express.Router();

postRouter.get('/', (req, res, next) => {
  res.json({dadada: "dadada"});
});

module.exports = postRouter;