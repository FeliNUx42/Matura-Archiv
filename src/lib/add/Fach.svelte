<script>
  import { faecher, err_flat } from "$lib/stores.js";
</script>

<div class="col-span-3">
  <div class="rounded-md border border-gray-300 flex divide-x divide-gray-300 dark:border-gray-600 dark:divide-gray-600 overflow-hidden {$err_flat?.fach ? "mb-1" : ""}">
    <label class="text-gray-400 px-4 py-2 block bg-gray-100 dark:bg-dark-800" for="">
      Fach
    </label>
    <select class="bg-white text-center px-2 grow text-gray-500 hover:text-gray-800 dark:bg-dark-900 dark:hover:text-gray-400" name="fach-0">
      <option value="-">Fach 1</option>
      {#each $faecher as f, i }
      <option value={f}>{f}</option>
      {/each}
    </select>
    <select class="bg-white text-center px-2 grow text-gray-500 hover:text-gray-800 dark:bg-dark-900 dark:hover:text-gray-400" name="fach-1">
      <option value="-">Fach 2 (optional)</option>
      {#each $faecher as f, i }
      <option value={f}>{f}</option>
      {/each}
    </select>
    <select class="bg-white text-center px-2 grow text-gray-500 hover:text-gray-800 dark:bg-dark-900 dark:hover:text-gray-400" name="fach-2">
      <option value="-">Fach 3 (optional)</option>
      {#each $faecher as f, i }
      <option value={f}>{f}</option>
      {/each}
    </select>
  </div>
  {#each $err_flat?.fach || [] as error}
    <div class="text-sm ml-2 text-red-700 font-medium dark:text-red-800">*{error}</div>
  {/each}
</div>