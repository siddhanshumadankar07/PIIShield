/**
 * Validates a numeric string using the Luhn checksum algorithm.
 * Note: Format/Luhn validation checks mathematical validity only,
 * not whether a card number belongs to a real account.
 */
export function isValidLuhn(input: string): boolean {
  const digits = input.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) {
    return false
  }

  let sum = 0
  let shouldDouble = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i])
    if (Number.isNaN(digit)) {
      return false
    }
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

