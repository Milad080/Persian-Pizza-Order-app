// utilities/numbers.js
export function convertToPersianNumbers(text) {
  if (!text) return text;

  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return text.toString().replace(/\d/g, (digit) => persianNumbers[digit]);
}

// یا نسخه پیشرفته‌تر:
export function englishToPersianNumbers(text) {
  if (!text) return text;

  const numbersMap = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };

  return text.toString().replace(/[0-9]/g, (match) => numbersMap[match]);
}
