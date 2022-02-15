const slowFunction = (n) => {
  let result = 0;
	for (var i = n * 1e6; i >= 0; i -= 1) {
		result += Math.atan(i) * Math.tan(i)
	}
  return result
}

module.exports.slowFunction = slowFunction;
