export async function load({ locals, params }) {
  let record = await locals.pb.collection('archiv').getOne(params.arbeit_id, {expand:"fach,betreuer,arbeit,links,anhang"});
  let data = structuredClone(record);

  return { ...data }
}