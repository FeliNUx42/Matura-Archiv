<script>
  import { filterActive } from "$lib/stores.js";
</script>

<div
  class="relative bg-gray-000 px-6 grid grid-cols-5 gap-10 overflow-hidden filter
  transition-all duration-300 {$filterActive ? 'h-[357px] py-3' : 'h-0 py-0'}"
>
  <div class="col-span-2">
    <h2 class="text-lg font-medium text-gray-500 mb-2 dark:text-gray-300">Fach</h2>
    <div id="fach" />
  </div>
  <div class="col-span-2">
    <h2 class="text-lg font-medium text-gray-500 mb-2 dark:text-gray-300">Schule</h2>
    <div id="schule" />
  </div>
  <div class="flex flex-col gap-5">
    <div>
      <h2 class="text-lg font-medium text-gray-500 mb-2 dark:text-gray-300">Sprache</h2>
      <div id="sprache" class="w-max" />
    </div>
    <div>
      <h2 class="text-lg font-medium text-gray-500 mb-2 dark:text-gray-300">Jahr</h2>
      <div id="jahr" class="w-max" />
    </div>
  </div>
  <div class="h-3 col-span-3" />
  <div class="absolute border-b border-gray-200 left-0 right-0 bottom-0 dark:border-gray-600" />
</div>

<style>
  :root {
    --checked: rgb(59 130 246);
    --hover: rgb(96 165 250);
    --text: rgb(75 85 99);
    --checked-bg: rgb(219 234 254 / 0.6);
    --checked-col: rgb(29 78 216);
    --form-text: rgb(17 24 39);
    --form-border: rgb(229 231 235);
    --mark-bg: rgb(219 234 254 / 0.6);
    --mark-col: rgb(30 64 175);
  }

  :global(.dark) {
    --checked: rgb(37 99 235);
    --hover: rgb(29 78 216);
    --text: rgb(209 213 219);
    --checked-bg: rgb(48 49 52);
    --checked-col: rgb(59 130 246);
    --form-text: rgb(209 213 219);
    --form-border: rgb(55 65 81);
    --mark-bg: rgb(48 49 52);
    --mark-col: rgb(59 130 246);
  }

  :global(.ref-item) {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
  }

  :global(.ref-list:last-child) {
    margin-bottom: 0px;
  }

  :global(.ref-checkbox) {
    position: relative;
    appearance: none;
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border: 2px solid rgb(209 213 219);
    border-radius: 0.25rem;
  }

  :global(.ref-checkbox::after) {
    content: "✓";
    position: absolute;
    top: -4px;
    left: 1px;
    font-size: small;
    color: white;
  }

  :global(.dark .ref-checkbox::after) {
    color: #202124;
  }

  :global(.ref-checkbox:hover) {
    border-color: var(--checked);
  }

  :global(.ref-checkbox:checked) {
    background-color: var(--checked);
    border-color: var(--checked);
  }

  :global(.ref-checkbox:checked:hover) {
    background-color: var(--hover);
    border-color: var(--hover);
  }

  :global(.ref-text) {
    color: var(--text);
    margin-left: 8px;
  }

  :global(.ref-count) {
    margin-left: 8px;
    background-color: var(--checked-bg);
    color: var(--checked-col);
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 1px 10px;
    border-radius: 0.25rem;
  }

  :global(.filter-form) {
    color: var(--form-text);
    border-bottom: 1px solid var(--form-border);
    margin-bottom: 10px;
  }

  :global(.filter-inp) {
    outline: none !important;
    background: transparent;
  }

  :global(.filter mark) {
    background-color: var(--mark-bg);
    color: var(--mark-col);
  }
</style>
