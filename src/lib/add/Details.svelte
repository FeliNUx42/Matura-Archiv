<script>
  import { sprachen } from "$lib/stores.js";

  let checked = "r";
</script>

<div class="col-span-3">
  <div class="rounded-md border border-gray-300 flex divide-x divide-gray-300 overflow-hidden dark:border-gray-600 dark:divide-gray-600">
    <label class="text-gray-400 px-4 py-2 block bg-gray-100 dark:bg-dark-800" for="">
      Farbe
    </label>
    <label for="farbe-0" class="color relative grow text-3xl text-white bg-rose-200 dark:bg-rose-200/60 {checked == "r" ? "active" : "" }">
      <input type="radio" name="farbe" id="farbe-0" value="r" bind:group={checked} hidden>
    </label>
    <label for="farbe-1" class="color relative grow text-3xl text-white bg-emerald-200 dark:bg-emerald-200/60 {checked == "g" ? "active" : "" }">
      <input type="radio" name="farbe" id="farbe-1" value="g" bind:group={checked} hidden>
    </label>
    <label for="farbe-2" class="color relative grow text-3xl text-white bg-sky-200 dark:bg-sky-200/60 {checked == "b" ? "active" : "" }">
      <input type="radio" name="farbe" id="farbe-2" value="b" bind:group={checked} hidden>
    </label>
    
    <label class="text-gray-400 px-4 py-2 block bg-gray-100 dark:bg-dark-800" for="sprache">
      Sprache
    </label>
    <select class="bg-white text-center px-2 grow text-gray-500 hover:text-gray-800 dark:bg-dark-900 dark:hover:text-gray-400" name="sprache" id="sprache">
      {#each $sprachen as s}
      <option value={s}>{s}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  label.color::after {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    content: "";
    pointer-events: none;
  }

  label.active::after {
    content: "✓";
    background-color: #0002 !important;
  }

  label:hover::after {
    background-color: #0001;
  }

</style>