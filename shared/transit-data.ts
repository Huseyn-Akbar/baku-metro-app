export type MetroStation = {
  id: string;
  name: string;
  line: "Qırmızı xətt" | "Yaşıl xətt" | "Bənövşəyi xətt";
  order: number;
};

export type BusRoute = {
  id: string;
  number: string;
  title: string;
  description: string;
  source: "AYNA MaaS" | "Ekspres";
  stations: string[];
  isExpress?: boolean;
};

export const metroStations: MetroStation[] = [
  { id: "icherisheher", name: "İçərişəhər", line: "Qırmızı xətt", order: 1 },
  { id: "sahil", name: "Sahil", line: "Qırmızı xətt", order: 2 },
  { id: "28-may", name: "28 May", line: "Qırmızı xətt", order: 3 },
  { id: "ganjlik", name: "Gənclik", line: "Qırmızı xətt", order: 4 },
  { id: "nariman-narimanov", name: "Nəriman Nərimanov", line: "Qırmızı xətt", order: 5 },
  { id: "bakmil", name: "Bakmil", line: "Qırmızı xətt", order: 6 },
  { id: "ulduz", name: "Ulduz", line: "Qırmızı xətt", order: 7 },
  { id: "koroglu", name: "Koroğlu", line: "Qırmızı xətt", order: 8 },
  { id: "qara-qarayev", name: "Qara Qarayev", line: "Qırmızı xətt", order: 9 },
  { id: "neftchiler", name: "Neftçilər", line: "Qırmızı xətt", order: 10 },
  { id: "xalqlar-dostlugu", name: "Xalqlar Dostluğu", line: "Qırmızı xətt", order: 11 },
  { id: "ahmadli", name: "Əhmədli", line: "Qırmızı xətt", order: 12 },
  { id: "hazi-aslanov", name: "Həzi Aslanov", line: "Qırmızı xətt", order: 13 },
  { id: "nizami", name: "Nizami", line: "Yaşıl xətt", order: 14 },
  { id: "elmler-akademiyasi", name: "Elmlər Akademiyası", line: "Yaşıl xətt", order: 15 },
  { id: "insaatcilar", name: "İnşaatçılar", line: "Yaşıl xətt", order: 16 },
  { id: "20-yanvar", name: "20 Yanvar", line: "Yaşıl xətt", order: 17 },
  { id: "memar-əcemi", name: "Memar Əcəmi", line: "Yaşıl xətt", order: 18 },
  { id: "nasimi", name: "Nəsimi", line: "Yaşıl xətt", order: 19 },
  { id: "azadliq-prospekti", name: "Azadlıq prospekti", line: "Yaşıl xətt", order: 20 },
  { id: "dernegul", name: "Dərnəgül", line: "Yaşıl xətt", order: 21 },
  { id: "xocesen", name: "Xocəsən", line: "Bənövşəyi xətt", order: 22 },
  { id: "avtovagzal", name: "Avtovağzal", line: "Bənövşəyi xətt", order: 23 },
  { id: "8-noyabr", name: "8 Noyabr", line: "Bənövşəyi xətt", order: 24 },
  { id: "cefer-cabbarli", name: "Cəfər Cabbarlı", line: "Yaşıl xətt", order: 25 },
  { id: "shah-is mayil-xetai", name: "Şah İsmayıl Xətai", line: "Yaşıl xətt", order: 26 },
  { id: "ag-sheher", name: "Ağ Şəhər", line: "Bənövşəyi xətt", order: 27 },
];

export const expressRoutes: BusRoute[] = [
  { id: "m1", number: "M1", title: "Elmlər Akademiyası ↔ 28 May", description: "Elmlər Akademiyası və 28 May stansiyaları arasında ekspres xətt.", source: "Ekspres", stations: ["Elmlər Akademiyası", "28 May"], isExpress: true },
  { id: "m2", number: "M2", title: "İnşaatçılar ↔ Nizami ↔ 28 May", description: "İnşaatçılar, Nizami və 28 May stansiyaları arasında ekspres xətt.", source: "Ekspres", stations: ["İnşaatçılar", "Nizami", "28 May"], isExpress: true },
  { id: "m3", number: "M3", title: "20 Yanvar ↔ Nizami ↔ 28 May", description: "20 Yanvar, Nizami və 28 May stansiyaları arasında ekspres xətt.", source: "Ekspres", stations: ["20 Yanvar", "Nizami", "28 May"], isExpress: true },
  { id: "m4", number: "M4", title: "20 Yanvar ↔ Koroğlu", description: "20 Yanvar və Koroğlu stansiyaları arasında ekspres xətt.", source: "Ekspres", stations: ["20 Yanvar", "Koroğlu"], isExpress: true },
  { id: "m5", number: "M5", title: "20 Yanvar ↔ Gənclik", description: "20 Yanvar və Gənclik stansiyaları arasında ekspres xətt.", source: "Ekspres", stations: ["20 Yanvar", "Gənclik"], isExpress: true },
  { id: "m6", number: "M6", title: "Elmlər Akademiyası ↔ Gənclik", description: "Elmlər Akademiyası və Gənclik stansiyaları arasında ekspres xətt.", source: "Ekspres", stations: ["Elmlər Akademiyası", "Gənclik"], isExpress: true },
];

export function routesBetween(start: string, end: string, routes: BusRoute[]) {
  if (!start || !end || start === end) return [];
  return routes.filter(route => route.stations.includes(start) && route.stations.includes(end));
}
