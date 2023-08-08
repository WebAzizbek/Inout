const locales = [
  {
    code: "uz",
    key: "uz",
    iso: "uz",
    name: "Uz",
    file: "uz.json",
    flag: "./assets/images/uzbekistn.png",
  },
  {
    code: "en",
    key: "en",
    iso: "en",
    name: "En",
    file: "en.json",
    flag: "./assets/images/america-flag.png",
  },
  {
    code: "ru",
    key: "ru",
    iso: "ru",
    name: "Ru",
    file: "ru.json",
    flag: "./assets/images/russia.png",
  },
];

export default {
  lazy: true,
  langDir: "locales",
  strategy: "prefix_except_default",
  locales,
  defaultLocale: "uz"
};