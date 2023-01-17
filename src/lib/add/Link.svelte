<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";

  import { err_full } from "$lib/stores.js";

  const dispatch = createEventDispatcher();

  export let i;

  $: errors = $err_full
    .filter(e => e.path[0] == "links" && e.path[1] == i)
    .map(e => e.message)

</script>

<div transition:slide={{duration:250}}>
  <div class="rounded-md border border-gray-300 flex divide-x divide-gray-300 dark:border-gray-600 dark:divide-gray-600 {errors.length ? "mb-1" : ""}">
    <label class="text-gray-400 px-4 py-2 block bg-gray-100 rounded-l dark:bg-dark-800" for="">
      Link
    </label>
    <div class="input-group grow relative transition duration-250">
      <input name="link-{i}" placeholder=" " class="px-4 py-2 w-full text-gray-800 outline-none bg-transparent dark:text-gray-200"/>
      <label class="block pl-4 pt-2 text-gray-400 m-0 absolute top-px left-px duration-250 transition-all ease-in-out rounded-md bg-white dark:bg-dark-900 dark:text-gray-500" for="link-{i}">
        Url
      </label>
    </div>
    <button 
      type="button"
      class="flex items-center px-3 text-gray-400 bg-gray-100 rounded-r hover:bg-gray-200 hover:text-gray-600 dark:bg-dark-800 dark:hover:bg-dark-700 dark:hover:text-gray-400"
      on:click={() => dispatch("delete", i)}
    >
      <span class="material-symbols-outlined">
        delete
      </span>
    </button>
  </div>
  {#each errors as error}
    <div class="text-sm ml-2 text-red-700 font-medium dark:text-red-800">*{error}</div>
  {/each}
</div>

<style>
  .input-group label {
    pointer-events: none;
  }
  
  .input-group:hover,
  .input-group:focus-within {
    border-color: rgb(156 163 175); /* gray-400 */
  }
  
  :global(.dark .input-group:hover),
  :global(.dark .input-group:focus-within) {
    border-color: rgb(107 114 128) !important; /* gray-500 */
  }
  
  .input-group:hover label,
  .input-group input:focus ~label {
    color: rgb(109, 117, 128);
  }
  
  :global(.dark .input-group:hover label),
  :global(.dark .input-group input:focus ~label) {
    color: rgb(156 163 175) !important;
  }
  
  .input-group:focus-within label,
  .input-group input:not(:placeholder-shown) ~ label {
    padding: 0px 8px;
    top: -13px;
    left: 16px;
    z-index: 1;
  }
  </style>