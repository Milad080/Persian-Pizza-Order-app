// utilities/helpers.js
import { englishToPersianNumbers } from "./numbers";

export function persianDigit(value) {
  const formatted = new Intl.NumberFormat("fa-IR").format(value);
  return englishToPersianNumbers(formatted);
}
export function formatCurrency(value) {
  const valueInToman = value * 20 * 1000;
  return new Intl.NumberFormat("fa-IR").format(valueInToman) + " تومان";
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
