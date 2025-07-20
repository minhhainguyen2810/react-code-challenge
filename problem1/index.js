/**
 * Calculates the sum of numbers from 1 to n using recursion.
 * @param {*} n
 * @returns {number} The sum of numbers from 1 to n.
 */
var sum_to_n_a = function (n) {
  if (n === 0) return 0;
  return n + sum_to_n_a(n - 1);
};

/**
 * Calculates the sum of numbers from 1 to n using iteration.
 * @param {*} n
 * @returns {number} The sum of numbers from 1 to n.
 */
var sum_to_n_b = function (n) {
  if (n === 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/**
 * Calculates the sum of numbers from 1 to n using the formula
 * @param {*} n
 * @returns {number} The sum of numbers from 1 to n.
 */
var sum_to_n_c = function (n) {
  if (n === 0) return 0;
  return (n * (n + 1)) / 2;
};
