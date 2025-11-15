// services/translationAPI.js
const pizzaDictionary = {
  // اسامی پیتزاها
  Margherita: "مارگاریتا",
  Capricciosa: "کاپریچوزا",
  Romana: "رومانا",
  "Prosciutto e Rucola": "پروشیوتو اروکولا",
  Diavola: "دیاوولا",
  Vegetale: "سبزیجات",
  Napoli: "ناپولی",
  Siciliana: "سیسیلیانا",
  Pepperoni: "پپرونی",
  Hawaiian: "هاوایی",
  "Spinach and Mushroom": "اسفناج و قارچ",
  Mediterranean: "مدیترانه‌ای",
  Greek: "یونانی",
  Abruzzese: "آربیز",
  "Pesto Chicken": "چیکن پستو",
  "Eggplant Parmesan": "بادمجان پارمزان",
  "Roasted Veggie": "سبزیجات کبابی",
  "Tofu and Mushroom": "توفو و قارچ",

  // مواد اولیه
  tomato: "گوجه فرنگی",
  mozzarella: "موزارلا",
  basil: "ریحان",
  ham: "ژامبون",
  mushrooms: "قارچ",
  artichoke: "کنگر فرنگی",
  prosciutto: "پروشیوتو",
  arugula: "آروگولا",
  "spicy salami": "سالامی تند",
  "chili flakes": "فلفل قرمز",
  "bell peppers": "فلفل دلمه‌ای",
  onions: "پیاز",
  "fresh tomato": "گوجه تازه",
  anchovies: "ماهی کولی",
  olives: "زیتون",
  capers: "کاپر",
  pineapple: "آناناس",
  spinach: "اسفناج",
  "sun-dried tomatoes": "گوجه خشک شده",
  feta: "پنیر فتا",
  pepperoncini: "فلفل پپرونچینی",
  pesto: "پستو",
  chicken: "مرغ",
  marinara: "سس مارینارا",
  eggplant: "بادمجان",
  parmesan: "پنیر پارمزان",
  zucchini: "کدو سبز",
  tofu: "توفو",
};

export async function translateText(text, targetLang = "fa") {
  // اول دیکشنری چک کن
  if (pizzaDictionary[text]) {
    return pizzaDictionary[text];
  }

  // اگر در دیکشنری نبود، از API گوگل استفاده کن
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    );

    if (!response.ok) {
      return text;
    }

    const data = await response.json();

    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return data[0][0][0];
    }

    return text;
  } catch (error) {
    console.error("خطا در ترجمه:", error);
    return text;
  }
}
export function translateTextSync(text) {
  return pizzaDictionary[text] || text;
}
export async function translatePizza(pizza) {
  const [translatedName, translatedIngredients] = await Promise.all([
    translateText(pizza.name),
    Promise.all(pizza.ingredients.map((ing) => translateText(ing))),
  ]);

  return {
    ...pizza,
    name: translatedName,
    ingredients: translatedIngredients,
  };
}
