/*jshint esversion: 6 */
const serverErrorMiddleware = (err, req, res, next) => {
	return res.status(500).json({
	   msg: 'Some error has occurred. Please try another request or later'
	});
};

module.exports = serverErrorMiddleware;
