<script>
  import { Toaster } from "svelte-french-toast";
  import { initMode } from "$lib/darkMode.js";
  import { darkMode } from "$lib/stores.js";
  import { onMount } from "svelte";

  import Nav from "$lib/layout/Nav.svelte";
  import Footer from "$lib/layout/Footer.svelte";

  import "../app.css";

  onMount(() => {
    initMode();
  })
</script>

<div class={$darkMode ? "dark" : ""}>
  <div class="dark:bg-dark-900">

    <Toaster />
    <Nav />
    
    <main class="min-h-[calc(100vh-109px)] mx-10">
      <slot />
    </main>
    
    <Footer />
  </div>
</div>