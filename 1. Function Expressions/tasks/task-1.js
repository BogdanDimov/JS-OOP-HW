/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum() {

	return function solve(numbers) {
		if (numbers.length === 0) {
			return null;
		}
		if (arguments === undefined) {
			throw "Parameter not passed"
		}
		if (numbers.some(x => isNaN(x))) {
			throw "Element not convertible to number"
		}

		return numbers.reduce((a, b) => (+a) + (+b), 0);

	};
}

module.exports = sum;