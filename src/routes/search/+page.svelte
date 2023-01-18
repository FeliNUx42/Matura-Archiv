<svelte:head>
  <title>Suche | Maturitätsarbeiten Archiv</title>
</svelte:head>

<script>
  import { gridActive, hitsList } from "$lib/stores.js";
  import searchClient from "$lib/search/algolia.js";
  import instantsearch from "instantsearch.js";
  import getWidgets from "$lib/search/widgets.js";

  import { onMount, onDestroy } from "svelte";

  import Entry from "$lib/search/Entry.svelte";
  import Filters from "$lib/search/Filters.svelte";
  import FilterBtn from "$lib/search/FilterBtn.svelte";
  import GridBtn from "$lib/search/GridBtn.svelte";

  let search;

  onMount(() => {
    console.log(instantsearch);
    
    search = instantsearch({
      indexName: "arbeiten",
      searchClient,
      routing: {
        stateMapping: {
          stateToRoute(uiState) {
            let {page, ...rest} = uiState.arbeiten;
            uiState.arbeiten = rest;
            return uiState;
          },
          routeToState(routeState) {
            return routeState
          },
        }
      }
    });

    search.addWidgets(getWidgets());
    search.start();
  })

  onDestroy(() => {
    if (search?.started) search.dispose()
  })
</script>

<section class="mx-auto max-w-5xl pt-6">
  <div
    class="w-full rounded-lg border border-gray-300 flex h-11 items-center px-3 gap-2 hover:shadow hover:border-gray-200 focus-within:shadow focus-within:border-gray-200 dark:hover:bg-dark-800 dark:focus-within:bg-dark-800 dark:border-gray-600"
  >
    <span class="material-symbols-rounded text-gray-500">search</span>
    <div id="instantsearch" class="grow relative" />
  </div>

  <div
    class="border-b border-gray-200 flex justify-between mt-4 items-center pb-1 dark:border-gray-500"
  >
    <FilterBtn />
    
    <span id="clear" />
    <span id="stats" class="text-sm ml-2 text-gray-400 dark:text-gray-500" />

    <span class="grow" />

    <div class="flex items-center gap-1 mr-4">
      <span class="text-gray-400 dark:text-gray-500">Sortieren nach:</span>
      <span id="sort"/>
    </div>

    <GridBtn />
  </div>

  <Filters />
</section>

<section class="mx-auto max-w-5xl mt-6 mb-16 grid gap-4 grid-cols-{$gridActive ? 2 : 1}">
  {#each $hitsList as hit (hit.objectID)}
   <Entry {hit} />
  {/each}
  <div id="sentinel" />
</section>

<style>
  :global(.search-inp) {
    width: 100%;
    outline: none !important;
    color: rgb(17 24 39);
    background: transparent;
  }

  :global(.dark .search-inp) {
    color: rgb(229 231 235);
  }

  :global(#sort select) {
    background-color: #fff !important;
    color: rgb(107 114 128);
    border-radius: 4px;
    padding: 4px 0 4px 8px;
  }

  :global(.dark #sort select) {
    background-color: #202124 !important;
    color: rgb(156 163 175);
  }

  :global(#sort select:hover) {
    background-color: rgb(243 244 246) !important;
    color: rgb(29 78 216);
  }

  :global(.dark #sort select:hover) {
    background-color: rgb(31 41 55) !important;
  }
</style>
