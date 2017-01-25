/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes() {

	return function solve(rangeStart, rangeEnd) {
		if (rangeStart === undefined || rangeEnd === undefined) {
			throw "Range params missing"
		}

		if (isNaN(rangeStart) || isNaN(rangeEnd)) {
			throw "Range params not convertible to number"
		}

		let start = +rangeStart,
			end = +rangeEnd,
			primes = [];

		for (var num = start; num <= end; num += 1) {
			if (isPrime(num)) {
				primes.push(num);
			}
		}

		return primes;
	}

	function isPrime(n) {
		if (n < 2) return false;
		for (var i = 2; i <= Math.floor(Math.sqrt(n)); i += 1) {
			if (n % i === 0) {
				return false;
			}
		}
		return true;
	}
}

module.exports = findPrimes;