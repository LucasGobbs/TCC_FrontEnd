<script lang="ts">
  import { onMount } from "svelte";
  export let color: string;
  export let name: string;
</script>

<div class="w-10 h-10 relative mb-4 flex-shrink-0">
  <div
    class="{color} w-full h-full rounded-full overflow-hidden shadow-inner text-center table cursor-pointer transform hover:scale-125"
  >
    <span class="table-cell text-black font-bold align-middle">{name}</span>
  </div>
  <span class="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full" />
</div>
