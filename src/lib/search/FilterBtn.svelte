<script>
  import { filterActive } from "$lib/stores.js";
</script>

<button
  class="flex gap-1 items-center px-2 py-1 text-gray-500 rounded hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-500"
  on:click={() => filterActive.update((n) => !n)}
>
  <span class="material-symbols-outlined">tune</span>
  <span class="">Filter</span>
</button>
