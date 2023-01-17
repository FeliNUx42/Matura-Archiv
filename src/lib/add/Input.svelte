<script>
  import { err_flat } from "$lib/stores.js";

  export let name;
  export let placeholder;
  export let className = "";
</script>

<div class={className}>
  <div class="input-group relative rounded-md border border-gray-300 dark:border-gray-600 transition duration-250 {$err_flat[name] ? "mb-1" : ""}">
    <input
      {name}
      placeholder=" "
      class="px-4 py-2 text-gray-800 bg-transparent outline-none w-full dark:text-gray-200"
    />
    <label class="block pl-4 pt-2 text-gray-400 m-0 absolute top-px left-px duration-250 transition-all ease-in-out rounded-md bg-white dark:bg-dark-900 dark:text-gray-500" for="{name}">{placeholder}</label>
  </div>
  {#each $err_flat[name] || [] as error}
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
