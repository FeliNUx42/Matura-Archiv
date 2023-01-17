<script>
  import { err_flat } from "$lib/stores.js";
</script>

<div class="col-span-3">
  <div class="rounded-md border border-gray-300 flex items-center divide-x divide-gray-300 overflow-hidden dark:border-gray-600 dark:divide-gray-600 {$err_flat?.arbeit ? "mb-1" : ""}">
    <label class="text-gray-400 px-4 py-2 block bg-gray-100 dark:bg-dark-800" for="arbeit">
      Arbeit hochladen
    </label>
    
    <input id="arbeit" name="arbeit" type="file" class="grow text-gray-500 px-4 py-2 hover:text-gray-800 dark:hover:text-gray-400"/>
  </div>
  {#each $err_flat?.arbeit || [] as error}
    <div class="text-sm ml-2 text-red-700 font-medium dark:text-red-800">*{error}</div>
  {/each}
</div>

<style>
  input[type="file"]::file-selector-button {
    display: none;
  }
</style>