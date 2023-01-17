<script>
    import { page } from '$app/stores';
    import { darkMode } from "$lib/stores.js";
    import { toggleMode } from "$lib/darkMode.js";

    const home = "/";
    const href_0 = "/search";
    const href_1 = "/add";
</script>

<nav class="w-full border-b border-gray-300 dark:border-gray-600 flex justify-between px-16 dark:bg-dark-900">
  <a href={home} class="flex gap-4 items-center text-xl text-gray-500 py-3 dark:text-gray-300">
    <img src="/logo.svg" alt="" class="h-9">
    <div>
      <span class="font-medium">Maturitätsarbeiten</span> Archiv
    </div>
  </a>
  <div class="flex items-stretch text-gray-500 dark:text-gray-400">
    <a 
      href={href_0}
      class="px-7 pt-[4px] flex items-center border-b-2 border-white dark:border-dark-900 dark:hover:bg-dark-800 dark:hover:border-dark-800 dark:hover:text-gray-200 hover:bg-gray-100 hover:border-gray-100 hover:text-gray-700 aria-disabled:bg-blue-100/60 aria-disabled:text-blue-800 aria-disabled:border-blue-700 dark:aria-disabled:bg-dark-800/60 dark:aria-disabled:text-blue-400 dark:aria-disabled:border-blue-400"
      aria-disabled={$page.route.id == href_0}
    >
      Suchen
    </a>
    <a 
      href={href_1}
      class="px-7 pt-[4px] flex items-center border-b-2 border-white dark:border-dark-900 dark:hover:bg-dark-800 dark:hover:border-dark-800 dark:hover:text-gray-200 hover:bg-gray-100 hover:border-gray-100 hover:text-gray-700 aria-disabled:bg-blue-100/60 aria-disabled:text-blue-800 aria-disabled:border-blue-700 dark:aria-disabled:bg-dark-800/60 dark:aria-disabled:text-blue-400 dark:aria-disabled:border-blue-400"
      aria-disabled={$page.route.id == href_1}
    >
      Hinzufügen
    </a>
    <button
      class="material-symbols-outlined px-2 py-2 dark:hover:bg-dark-800 dark:hover:border-dark-800 dark:hover:text-gray-200 hover:bg-gray-100 hover:text-gray-700 self-center rounded-full ml-3"
      on:click={toggleMode}
      >
    {#if $darkMode}
      light_mode
    {:else}
      dark_mode
    {/if}
    </button>
  </div>
</nav>