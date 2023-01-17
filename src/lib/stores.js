import { writable, readable } from "svelte/store";


export let darkMode = writable(true);

export let filterActive = writable(false);
export let gridActive = writable(false);

export let hitsList = writable([]);

export let err_flat = writable({});
export let err_full = writable([]);

export const faecher = readable([
  "Bildnerisches Gestalten",
  "Biologie",
  "Chemie",
  "Deutsch",
  "Film ",
  "Französisch",
  "Geografie",
  "Geschichte",
  "Informatik",
  "Kulturwissenschaften",
  "Mathematik",
  "Musik",
  "Philosophie",
  "Physik",
  "Sport",
  "Theater",
  "Wirtschaft",
  "Überfachlich"
]);

export const schulen = readable([
  "Kantonale Maturitätsschule für Erwachsene",
  "Kantonsschule Enge",
  "Kantonsschule Hohe Promenade",
  "Kantonsschule Hottingen",
  "Kantonsschule Im Lee",
  "Kantonsschule Küsnacht",
  "Kantonsschule Limmattal",
  "Kantonsschule Rychenberg",
  "Kantonsschule Stadelhofen",
  "Kantonsschule Uster",
  "Kantonsschule Wiedikon",
  "Kantonsschule Zürcher Oberland",
  "Kantonsschule Zürcher Unterland",
  "Kantonsschule Zürich Nord",
  "LG Rämibühl",
  "Liceo Artistico",
  "MNG Rämibühl",
  "RG Rämibühl"
])

export const sprachen = readable([
  "Deutsch",
  "Englisch",
  "Französisch",
])