// Generate a random integer between two bounds
export function generateRandomNumber(upper, lower) {
  const range = upper - lower
  return Math.trunc((Math.random() * range) + lower)
}
