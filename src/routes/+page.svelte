<svelte:head>
  <title>Maturitätsarbeiten Archiv</title>
</svelte:head>

<script>
  import { filterActive } from "$lib/stores.js";

  import Cards from "$lib/home/Cards.svelte";
  import Title from "$lib/home/Title.svelte";

  let query;

  const required = (e) => {
    if (query.trim() === "") e.preventDefault();
  };
</script>

<div class="flex flex-col items-center h-[calc(100vh-6.8rem)]">
  <div style="flex-grow: 3;" />

  <div class="text-gray-700 dark:text-gray-200" style="grid-row-start: 40%; grid-row-end: 40%">
    <Title />

    <form class="rounded-lg border border-gray-300 w-[min(700px,90vw)] flex h-11 items-center px-3 gap-2 hover:shadow hover:border-gray-200 focus-within:shadow focus-within:border-gray-200 dark:bg-dark-900 dark:border-gray-600 dark:divide-gray-600 dark:hover:bg-dark-800 dark:focus-within:bg-dark-800" on:submit={required} action="/search">
      <span class="material-symbols-rounded text-gray-500">search</span>
      <!-- svelte-ignore a11y-autofocus -->
      <input class="outline-none grow text-gray-900 py-1.5 dark:text-gray-200 bg-transparent" type="text" name="arbeiten[query]" id="query" bind:value={query} autofocus />
      <span class="material-symbols-rounded text-gray-500 hover:text-gray-700 cursor-pointer hidden">close</span>
      <a href="/search?arbeiten[sortBy]=arbeiten_created_desc" class="text-gray-500 hover:text-gray-700 border-l border-gray-300 pl-2.5 py-0.5 dark:hover:text-gray-400" on:click={() => filterActive.set(false)}>Alle Arbeiten</a>
      <input type="submit" class="hidden" />
    </form>

    <div class="flex justify-center gap-4 mt-6">
      <a class="bg-gray-100 text-gray-500 px-4 py-2 rounded-md hover:shadow dark:bg-dark-800 dark:hover:bg-dark-700 dark:hover:text-gray-400" href="/search" on:click={() => filterActive.set(true)}>Erweiterte Suchen</a>
      <a class="bg-gray-100 text-gray-500 px-4 py-2 rounded-md hover:shadow dark:bg-dark-800 dark:hover:bg-dark-700 dark:hover:text-gray-400" href="/add">Arbeit hinzufügen</a>
    </div>
  </div>

  <div style="flex-grow: 2;" />

  <Cards />

  <div style="flex-grow: 3;" />
</div>

