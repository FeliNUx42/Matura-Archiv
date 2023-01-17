<script>
  import { DateTime } from "luxon";

  export let hit;

  $: fach = hit._highlightResult.fach.map((f) => f.name.value).join(", ");
  $: date = DateTime.fromSQL(hit.created).setLocale("de").toRelative();
  $: name = hit._highlightResult.name.value;
  $: title = hit._highlightResult.titel.value;
  $: abstract = hit._highlightResult.abstract.value;
</script>


<a
  href="/{hit.objectID}" class="block rounded-md border border-gray-300 px-6 py-3 hover:shadow-md transform-all duration-200 dark:border-gray-600 dark:hover:bg-dark-800">
  <div class="flex justify-between text-sm mb-0.5 text-gray-700 dark:text-gray-500">
    <div>
      <span class="font-medium text-indigo-700 dark:text-indigo-500">{@html fach}</span>
      <span class="mx-1">-</span>
      <span>{date}</span>
    </div>
    <div>
      {@html name}
    </div>
  </div>
  <h1 class="text-xl font-medium mb-1.5 dark:text-white">
    {@html title}
  </h1>
  <p class="text-justify text-gray-700 dark:text-gray-300">
    {@html abstract}
  </p>
</a>

<style>
  p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  :global(mark) {
    background-color: rgb(219 234 254 / 0.7);
    color: rgb(24 54 150);
    border-radius: 2px;
  }

  :global(.dark mark) {
    background-color: rgb(48 49 52);
    color: rgb(96 165 250);
  }

  :global(.fach mark) {
    background-color: rgb(219 234 254 / 0.9);
  }

  :global(.dark .fach mark) {
    background-color: rgb(48 49 52);
  }
</style>
