/*jshint esversion: 6 */
const notFoundMiddleWare = (req, res) => {
  return res.status(404).json({
    msg: 'The resource cannot be found'
  });
};


module.exports = notFoundMiddleWare;
