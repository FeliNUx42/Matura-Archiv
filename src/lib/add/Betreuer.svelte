<script>
  import { schulen, err_flat } from "$lib/stores.js";

  $: errors = [...$err_flat?.betreuer || [], ...$err_flat?.schule || []]
  </script>

<div class="col-span-3">
  <div class="rounded-md border border-gray-300 flex divide-x divide-gray-300 dark:border-gray-600 dark:divide-gray-600 {errors.length ? "mb-1" : ""}">
    <label class="text-gray-400 px-4 py-2 block bg-gray-100 rounded-l dark:bg-dark-800" for="">
      Betreuer(in)
    </label>
    <div class="input-group grow relative transition duration-250">
      <input name="betreuer-0" placeholder=" " class="px-4 py-2 w-full text-gray-800 outline-none dark:text-gray-200 bg-transparent"/>
      <label class="block pl-4 pt-2 text-gray-400 m-0 absolute top-px left-px duration-250 transition-all ease-in-out rounded-md bg-white dark:bg-dark-900 dark:text-gray-500" for="betreuer-0">
        Betreuer(in) 1
      </label>
    </div>
    <div class="input-group grow relative transition duration-250">
      <input name="betreuer-1" placeholder=" " class="px-4 py-2 w-full text-gray-800 outline-none dark:text-gray-200 bg-transparent"/>
      <label class="block pl-4 pt-2 text-gray-400 m-0 absolute top-px left-px duration-250 transition-all ease-in-out rounded-md bg-white dark:bg-dark-900 dark:text-gray-500" for="betreuer-1">
        Betreuer(in) 2 (optional)
      </label>
    </div>
    <label class="text-gray-400 px-4 py-2 block bg-gray-100 dark:bg-dark-800" for="schule">
      Schule
    </label>
    <select class="bg-white text-center px-2 grow text-gray-500 hover:text-gray-800 rounded-r dark:bg-dark-900 dark:hover:text-gray-400" name="schule" id="schule">
      <option value="-">Schule</option>
      {#each $schulen as f }
      <option value={f}>{f}</option>
      {/each}
    </select>
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