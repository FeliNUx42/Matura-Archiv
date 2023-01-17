import { v4 } from "uuid";
import { saveFile } from "./aws.js";


const createBetreuer = async (name, pb) => {
  let record = await pb.collection("betreuer").create({ name }, { "$autoCancel": false });
  return record.id;
}

const createFach = async (name, pb) => {
  let record = await pb.collection("fach").create({ name }, { "$autoCancel": false });
  return record.id;
}

const createLink = async (url, pb) => {
  let record = await pb.collection("link").create({ url }, { "$autoCancel": false });
  return record.id;
};

const createDatei = async ({ name, file }, pb) => {
  let type = file.type;
  let key = v4();
  let size = file.size;

  let aws_file = await saveFile(file, key);
  let entry = { name, type, size, key, url: aws_file.Location }  

  let record = await pb.collection("datei").create(entry, { "$autoCancel": false });
  return record.id
}

export default async (data, pb) => {
  for (let i=0; i < data.betreuer.length; i++) {
    data.betreuer[i] = await createBetreuer(data.betreuer[i], pb);
  }

  for (let i=0; i < data.fach.length; i++) {
    data.fach[i] = await createFach(data.fach[i], pb);
  }

  for (let i=0; i < data.links.length; i++) {
    data.links[i] = await createLink(data.links[i], pb);
  }

  data.arbeit = await createDatei({ name: "Arbeit", file: data.arbeit }, pb);

  for (let i=0; i < data.anhang.length; i++) {
    data.anhang[i] = await createDatei(data.anhang[i], pb);
  }

  let record = await pb.collection("archiv").create(data, { "$autoCancel": false });
  return record
}