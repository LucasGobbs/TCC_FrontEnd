<script>
  import { Router, Route } from "./router/router.js";
  import Tailwindcss from "./Tailwindcss.svelte";
  import Editor from "./components/Editor/Editor.svelte";
  import Home from "./components/Home.svelte";
</script>

<div class="init bg-green-500 h-screen mx-auto overflow-hidden">
  <!-- <ul>
    <li>
      <a href="/" class="text-2xl">Home</a>
    </li>
    <li>
      <a href="/editor">Editor</a>
    </li>
  </ul> -->

  <Router hashbang={false}>
    <Route path="/">This is HOME page.</Route>
    <Route path="/editor"><Editor /></Route>
  </Router>
</div>

<style>
  init {
  }
  :global(main) {
    min-width: 100%;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  :global(body) {
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>
