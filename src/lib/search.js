import algoliasearch from "algoliasearch";

const client = algoliasearch("K4983KEQZ8", "0599d99b7c0aa6c92daab423161b4acd");
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