<script>
  import { DateTime } from "luxon";
  import toast from "svelte-french-toast"
  import { page } from '$app/stores';
  import { darkMode } from "$lib/stores.js";
  import { onMount } from "svelte";

  export let data;

  let lightColors = {
    r: { bg: "#feeded", border: "#f97316", head: "#b91c1c", title: "#7c2d12", cards: "#b91c1c"},
    g: { bg: "#e3fcef", border: "#10b981", head: "#047857", title: "#065f46", cards: "#047857"},
    b: { bg: "#ecf7fe", border: "#0ea5e9", head: "#0369a1", title: "#0c4a6e", cards: "#0369a1"},
  }

  let darkColors = {
    r: { bg: "#351d28", border: "#881337", head: "#9f1239", title: "#e11d48", cards: "#9f1239"},
    g: { bg: "#1b2928", border: "#064E3B", head: "#065F46", title: "#059669", cards: "#065F46"},
    b: { bg: "#1c2933", border: "#0C4A6E", head: "#0369A1", title: "#0EA5E9", cards: "#0284C7"},
  }

  $: c = $darkMode ? darkColors[data.farbe] : lightColors[data.farbe];

  const types = {
    "application/pdf": "PDF",
    "image/jpg": "JPG",
    "image/jpeg": "JPEG",
    "image/png": "PNG"
  }
    
  if ($page.url.searchParams.get("success")) {
    toast.success("Die Arbeit wurde erfolgreich erstellt.", { style: $darkMode ? "background-color: #303134; color: #fff;" : "" });
    onMount(() => window.history.replaceState(null, document.title, window.location.pathname));
  }

  let date = DateTime.fromSQL(data.created).setLocale("de").toLocaleString(DateTime.DATE_FULL);
</script>

<svelte:head>
  <title>{data.name} | Maturitätsarbeiten Archiv</title>
</svelte:head>

<section class="-mx-10 px-10" style="background-color: {c.bg}; color: {c.title};">
  <header class="mx-auto max-w-5xl pt-8 pb-10">
    <div class="flex justify-between mb-4" style="color: {c.head};">
      <div><b class="font-medium">{data.name}</b>, {data.jahr}</div>
      <div>Erstellt am <b class="font-medium">{date}</b></div>
    </div>
    <h1 class="text-3xl mb-3">{data.titel}</h1>
    <h2 class="text-2xl mb-6">{data.untertitel}</h2>

    <div class="grid grid-cols-{data.expand.betreuer.length+1} gap-4">
      {#each data.expand.betreuer as { name }, i }
      {@const label = ( i ? (i+1) + '. ' : '' ) + "Betreuer(in):"}
      <div class="text-center p-4 border rounded-md" style="border-color: {c.border};">
        <h3 style="color: {c.cards}">{label}</h3>
        <h2 class="font-medium text-lg">{name}</h2>
      </div>
      {/each}
      <div class="text-center p-4 border rounded-md" style="border-color: {c.border};">
        <h3 style="color: {c.cards}">Schule:</h3>
        <h2 class="font-medium text-lg">{data.schule}</h2>
      </div>
    </div>
  </header>
</section>
<section class="mx-auto max-w-5xl mt-8 text-gray-900 dark:text-gray-200">
  <div>
    <div class="flex gap-2 items-center mb-4">
      <div class="text-xl text-gray-800 mr-2 dark:text-gray-300">Fach: </div>
      {#each data.expand.fach as { name }}
        <div class="bg-gray-100 px-2 py-1 rounded text-indigo-800 dark:bg-dark-800 dark:text-indigo-500">
          {name}
        </div>
      {/each}
      <span class="grow" />
      <a
        href={data.expand.arbeit.url}
        class="border border-blue-500 rounded px-4 py-1.5 flex font-medium text-blue-700 hover:bg-blue-100/60 hover:text-blue-800 dark:border-blue-600 dark:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-500"
        target="_blank"
        rel="noreferrer"
      >
        <span class="material-symbols-outlined text-normal mr-2">
          open_in_new
        </span>
        <span>
          Maturarbeit öffnen (PDF, {Math.round(data.expand.arbeit.size/1024**2)}MB)
        </span>
      </a>
    </div>

    {#if data.intro}
    <h3 class="text-xl text-gray-800 mb-1 dark:text-gray-300">Intro</h3>
    <p class="text-justify mb-4">{data.intro}</p>
    {/if}
    
    <h3 class="text-xl text-gray-800 mb-1 dark:text-gray-300">Abstract</h3>
    <p class="text-justify pb-8 border-b border-gray-300 dark:border-gray-600">{data.abstract}</p>
  </div>

  <div class="grid grid-cols-2 divide-x divide-gray-300 mb-10 dark:divide-gray-600">
    <div>
      <h2 class="text-xl text-gray-800 mb-3 ml-4 mt-4 dark:text-gray-300">Anhang</h2>
      <div class="grid gap-4 mr-4">
        {#if data.expand.anhang }
        {#each data.expand.anhang as { name, url, type, size } }
          <a
            href={url}
            class="border border-gray-300 rounded link px-5 py-1.5 hover:bg-gray-100 hover:text-black dark:border-gray-600 dark:text-gray-200 dark:hover:bg-dark-800"
            target="_blank"
            rel="noreferrer"
          >
          {name} ({types[type]}, {Math.round(size/1024**2)}MB)
        </a>
        {/each}
        {:else}
        <div class="px-4 py-1.5 text-gray-500 italic">Keine Anhänge...</div>
        {/if}
      </div>
    </div>

    <div>
      <h2 class="text-xl text-gray-800 mb-3 ml-8 mt-4 dark:text-gray-300">Links</h2>
      <div class="grid gap-4 ml-4">
        {#if data.expand.links }
        {#each data.expand.links as { url } }
          <a
            href={url}
            class="border border-gray-300 rounded link px-5 py-1.5 hover:bg-gray-100 hover:text-black dark:border-gray-600 dark:text-gray-200 dark:hover:bg-dark-800"
            target="_blank"
            rel="noreferrer"
          >{url}</a>
        {/each}
        {:else}
        <div class="px-4 py-1.5 text-gray-500 italic">Keine Links...</div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .link {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 2rem;
  }
</style>