import algoliasearch from "algoliasearch";
import { ALG_SECRET_KEY } from '$env/static/private';

const client = algoliasearch("K4983KEQZ8", ALG_SECRET_KEY);
const index = client.initIndex("arbeiten");

export default (data, rec) => {
  data.objectID = rec.id;
  data.created = rec.created;

  data.fach = data.fach.map(i => { return { name: i }});
  data.betreuer = data.betreuer.map(i => { return { name: i }});

  delete data.arbeit;
  delete data.anhang;
  delete data.links;

  index.saveObject(data)
}