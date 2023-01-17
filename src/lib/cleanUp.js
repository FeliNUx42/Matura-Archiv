export default data => {
  data.fach = Object.entries(data).map(([k, v]) => {
    if (k.search(/fach-\d+/i) === -1) return;
    if (v == "-") return;
    return v;
  }).filter(n => n);

  data.betreuer = Object.entries(data).map(([k, v]) => {
    if (k.search(/betreuer-\d+/i) === -1) return;
    return v;
  }).filter(n => n);

  data.anhang = Object.entries(data).map(([k, v]) => {
    if (k.search(/anhang-\d+/i) === -1) return;

    let num = Number(k.split('-')[1])
    return { name: data[`anhang-name-${num}`], file: v };
  }).filter(n => n);

  data.links = Object.entries(data).map(([k, v]) => {
    if (k.search(/link-\d+/i) === -1) return;
    return v;
  }).filter(n => n != undefined);

  data.jahr = Number(data.jahr) || null;

  return data;
}