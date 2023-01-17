<svelte:head>
  <title>Hinzufügen | Maturitätsarbeiten Archiv</title>
</svelte:head>

<script>
  import { enhance } from "$app/forms";
  import { err_flat, err_full, darkMode } from "$lib/stores.js"
  import toast from "svelte-french-toast"

  import Input from "$lib/add/Input.svelte";
  import NumInput from "$lib/add/NumInput.svelte";
  import Textarea from "$lib/add/Textarea.svelte";
  import Fach from "$lib/add/Fach.svelte";
  import Betreuer from "$lib/add/Betreuer.svelte";
  import Details from "$lib/add/Details.svelte";
  import UploadArbeit from "$lib/add/Upload.svelte";
  import Anhang from "$lib/add/Anhang.svelte";
  import Link from "$lib/add/Link.svelte";

  let anhaenge = [0];
  let a_add = 0;

  let links = [0];
  let l_add = 0;

  const addAnhang = () => {
    if (anhaenge.length >= 10) return;
    anhaenge = [...anhaenge, anhaenge.length+a_add];
  }

  const addLink = () => {
    if (anhaenge.length >= 10) return;
    links = [...links, links.length+l_add];
  }

  const removeAnhang = e => {
    anhaenge.splice(e.detail-a_add, 1);
    anhaenge = anhaenge;

    a_add += 1;
  }

  const removeLink = e => {
    links.splice(e.detail-l_add, 1);
    links = links;

    l_add += 1;
  }

  const handleForm = () => {
    let id = toast.loading("Arbeit wird hinzugefügt...", { style: $darkMode ? "background-color: #303134; color: #fff;" : "" });

    return async ({ result }) => {
      toast.remove(id);
      
      if (result.type == "success") {
        let objectID = result.data.id;
        err_flat.set({});
        err_full.set([]);

        window.location = `/${objectID}?success=true`;
      } else {
        toast.error("Ein Fehler ist aufgetreten...", { style: $darkMode ? "background-color: #303134; color: #fff;" : "" });
        err_flat.set(result.data.flat.fieldErrors)
        err_full.set(result.data.full)

        window.scrollTo(0,0)
      }
    }
  }
</script>


<section class="mx-auto max-w-5xl pt-10 pb-20">
  <h1 class="text-gray-700 text-4xl mb-8 text-center dark:text-gray-200"><b class="font-medium">Maturitätsarbeit</b> hinzufügen</h1>

  <form class="grid grid-cols-3 gap-6" method="post" action="/add" enctype="multipart/form-data" use:enhance={handleForm}>
    <Input name="name" className="col-span-2" placeholder="Name Vorname" />
    <NumInput name="jahr" placeholder="Erscheinungsjahr" />
    <Input name="titel" className="col-span-3" placeholder="Titel" />
    <Input name="untertitel" className="col-span-3" placeholder="Untertitel (optional)" />
    <Fach />
    <Betreuer />
    <Details />
    <Textarea name="intro" className="col-span-3" placeholder="Intro (optional)" rows=3 />
    <Textarea name="abstract" className="col-span-3" placeholder="Abstract" rows=8 />
    <UploadArbeit />

    <div class="col-span-3">
      <h2 class="text-xl mb-4 text-gray-700 dark:text-gray-300">Anhänge hinzufügen
        <span class="text-gray-400 text-lg dark:text-gray-500">(max 10)</span>
      </h2>

      <div class="grid gap-3">
        {#each anhaenge as i (i) }
        <Anhang {i} on:delete={removeAnhang} />
        {/each}
        <div>
          <button 
            type="button"
            class="float-right flex items-center gap-1 px-3 py-1.5 text-gray-500 bg-gray-100 rounded hover:bg-gray-200 hover:text-blue-700 dark:bg-dark-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-500"
            disabled={anhaenge.length >= 10}
            on:click={addAnhang}
          >
            <span class="material-symbols-outlined">
              add
            </span>
            Feld hinzufügen
          </button>
        </div>
      </div>
    </div>

    <div class="col-span-3">
      <h2 class="text-xl mb-4 text-gray-700 dark:text-gray-300">Links hinzufügen
        <span class="text-gray-400 text-lg dark:text-gray-500">(max 10)</span>
      </h2>

      <div class="grid gap-3">
        {#each links as i (i) }
        <Link {i} on:delete={removeLink} />
        {/each}
        <div>
          <button 
            type="button"
            class="float-right flex items-center gap-1 px-3 py-1.5 text-gray-500 bg-gray-100 rounded hover:bg-gray-200 hover:text-blue-700 dark:bg-dark-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-500"
            disabled={links.length >= 10}
            on:click={addLink}
          >
            <span class="material-symbols-outlined">
              add
            </span>
            Feld hinzufügen
          </button>
        </div>
      </div>
    </div>

    <div class="col-span-3">
      <button
        class="float-right border border-blue-500 rounded px-4 py-1.5 flex gap-1 items-center font-medium text-blue-700 hover:bg-blue-100/60 hover:text-blue-800 dark:border-blue-600 dark:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-500"
      >
        <span class="material-symbols-outlined text-normal mr-2">
          publish
        </span>
        Arbeit hinzufügen
      </button>
    </div>
  </form>
</section>
