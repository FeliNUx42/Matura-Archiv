<script>
  export let arbeiten = 164;
  export let faecher = 38;
  export let schulen = 26;

  const loc = "de-CH";
</script>

<div class="bottom-[20%] flex gap-8 dark:opacity-70">
  <div class="card-0 px-10 py-5 text-xl rounded-md">
    <span class="font-semibold mr-1">{arbeiten.toLocaleString(loc)}</span> Arbeiten
  </div>
  <div class="card-1 px-10 py-5 text-xl rounded-md">
    <span class="font-semibold mr-1">{faecher.toLocaleString(loc)}</span> Fächer
  </div>
  <div class="card-2 px-10 py-5 text-xl rounded-md">
    <span class="font-semibold mr-1">{schulen.toLocaleString(loc)}</span> Schulen
  </div>
</div>

<style>
  .card-0 {
    color: #064213;
    background-color: #dfffe7;
  }

  .card-1 {
    color: #093c49;
    background-color: #dbf8ff;
  }

  .card-2 {
    color: #4d0f0b;
    background-color: #ffdddb;
  }
</style>
