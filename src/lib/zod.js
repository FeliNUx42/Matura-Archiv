import { z } from "zod";
import PocketBase from 'pocketbase';
import { PB_URL } from '$env/static/private';
import { faecher, schulen, sprachen } from "./stores.js"

let fach_opt;
faecher.subscribe(v => fach_opt = v);

let schulen_opt;
schulen.subscribe(v => schulen_opt = v);

let sprachen_opt;
sprachen.subscribe(v => sprachen_opt = v);

const MAX_SIZE = 250 * 1024**2 // 250MB
const ACC_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/octet-stream"];


export const addForm = z.object({
  name: z.string({ required_error: "Der Name wird benötigt"})
    .min(1, { message: "Der Name wird benötigt" })
    .max(128, { message: "Der Name darf nicht länger als 128 Zeichen sein"})
    .trim(),
  jahr: z.number({ required_error: "Das Erscheinungsjahr wird benötigt", invalid_type_error: "Das Erscheinungsjahr wird benötigt" })
    .min(2000, { message: "Das Erscheinungsjahr darf nicht kleiner als 2000 sein"})
    .max(2030, { message: "Das Erscheinungsjahr darf nicht grösser als 2030 sein"}),
  titel: z.string({ required_error: "Der Titel wird benötigt"})
    .min(1, { message: "Der Titel wird benötigt" })
    .max(128, { message: "Der Titel darf nicht länger als 256 Zeichen sein"})
    .trim(),
  untertitel: z.string({ required_error: "Der Untertitel wird benötigt"})
    .max(512, { message: "Der Untertiletl darf nicht länger als 512 Zeichen sein"})
    .trim(),
  fach: z.enum(fach_opt)
    .array()
    .min(1, { message: "Mind. ein Fach muss angegeben werden" })
    .max(3),
  betreuer: z.string({ required_error: "Der Name wird benötigt"})
    .min(1, { message: "Der Name wird benötigt"})
    .max(128, { message: "Der Name darf nicht länger als 128 Zeichen sein"})
    .trim()
    .array()
    .min(1, { message: "Mind. ein(e) Betreuer(in) muss angegeben werden"})
    .max(2),
  schule: z.string().refine(s => schulen_opt.includes(s), "Die Schule muss angegeben werden"),
  farbe: z.enum(["r","g","b"]),
  sprache: z.enum(sprachen_opt),
  intro: z.string()
    .max(1024, { message: "Das Intro darf nicht länger als 1024 Zeichen sein"})
    .trim(),
  abstract: z.string({ required_error: "Der Abstract wird benötigt" })
    .min(1, { message: "Der Abstract wird benötigt" })
    .max(4096, { message: "Der Abstract darf nicht länger als 4096 Zeichen sein" })
    .trim(),
  arbeit: z.any()
    .refine(f => f.type !== "application/octet-stream", "Die Datei wird benötigt")
    .refine(f => f.size <= MAX_SIZE, "Die Datei darf nicht grösser als 250MB sein")
    .refine(f => ["application/pdf", "application/octet-stream"].includes(f.type), "Die Datei muss ein PDF sein"),
  anhang: z.object({
    name: z.string({ required_error: "Der Name wird benötigt"})
      .min(1, { message: "Der Name wird benötigt"})
      .max(128, { message: "Der Name darf nicht länger als 128 Zeichen sein"})
      .trim(),
    file: z.any()
    .refine(f => f.type !== "application/octet-stream", "Die Datei wird benötigt")
    .refine(f => f.size <= MAX_SIZE, "Die Datei darf nicht grösser als 250MB sein")
      .refine(f => ACC_TYPES.includes(f.type), "Die Datei muss ein PDF, JPG, JPEG oder PNG sein"),
  }).array().max(10),
  links: z.string()
    .url({ message: "Der Link ist ungültig" })
    .array()
    .max(10)
});