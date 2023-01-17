import { fail } from "@sveltejs/kit";
import { addForm } from "$lib/zod.js"
import _ from "lodash";
import cleanUp from "$lib/cleanUp";
import createArticle from "$lib/createArticle";
import createRecord from "$lib/search";


export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    let data = Object.fromEntries([...formData]);

    data = cleanUp(data);

    try {
      await locals.pb.collection("archiv").getFirstListItem(`name="${data.name.trim()}"`);
      return fail(400, {
        flat: { fieldErrors: { name: [ "Diese Person hat bereits ihre Maturitätsarbeit hinzugefügt" ] } },
        full: []
      })
    } catch (err) {}

    try {
      data = addForm.parse(data);
      let rec = await createArticle(_.cloneDeep(data), locals.pb);

      createRecord(data, rec);

      return { id: rec.id }
    } catch (err) {
      return fail(400, { flat: err.flatten(), full: err.errors })
    }
  }
};