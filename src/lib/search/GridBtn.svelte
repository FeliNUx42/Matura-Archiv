<script>
  import { gridActive } from "$lib/stores.js";
</script>

<div class="flex divide-x border rounded border-gray-300 divide-gray-300 dark:border-gray-600 dark:divide-gray-600">
  <button
    class="material-symbols-outlined text-gray-500 px-1.5 py-0.5 hover:bg-gray-100 hover:text-gray-700 aria-checked:text-blue-700 aria-checked:bg-blue-100/60 rounded-l dark:hover:bg-dark-800 dark:hover:text-gray-400 dark:aria-checked:text-blue-500 dark:aria-checked:bg-gray-800"
    aria-checked={!$gridActive}
    on:click={() => gridActive.set(false)}
  >
    view_list
  </button>
  <button
    class="material-symbols-outlined text-gray-500 px-1.5 py-0.5 hover:bg-gray-100 hover:text-gray-700 aria-checked:text-blue-700 aria-checked:bg-blue-100/60 rounded-r dark:hover:bg-dark-800 dark:hover:text-gray-400 dark:aria-checked:text-blue-500 dark:aria-checked:bg-gray-800"
    aria-checked={$gridActive}
    on:click={() => gridActive.set(true)}
  >
    view_module
  </button>
</div>