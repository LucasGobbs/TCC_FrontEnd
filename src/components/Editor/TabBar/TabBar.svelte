<script lang="ts">
  import type { Item } from "../Explorer/Explorer";
  import { slide } from "svelte/transition";
  import type { Tabs } from "./TabBar";
  export let tabs: Tabs;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const handle_click = (index) => {
    tabs.selected = index;
    dispatch("TabSelected", { tab: tabs.getSelected() });
  };
  const handle_remove = (index) => {
    tabs = tabs.remove(index);
    dispatch("TabSelected", { tab: tabs.getSelected() });
  };
  import MdClear from "svelte-icons/md/MdClear.svelte";
</script>

<div class="bg-indigo-500 h-full">
  <ul id="tabs" class="inline-flex w-full px-1 h-full items-center  ">
    {#each tabs.items as tab, i}
      <!-- content here -->
      {#if i == tabs.selected}
        <li class="w-20 mr-1 h-full pl-1 pb-1 -mb-px font-semibold text-gray-800 bg-white border-b-2 rounded-t ">
          <div class="flex justify-between items-center p-1">
            <a id="default-tab" href="#first" class="text-center">
              {tab.name}
            </a>
            <div
              class="w-4 h-4 hover:text-red-600 transform hover:scale-125"
              on:click={() => {
                handle_remove(i);
              }}
            >
              <MdClear />
            </div>
          </div>
        </li>
      {:else}
        <li
          class="w-20 h-full mr-1 pl-1 font-semibold text-gray-800 rounded-t bg-white hover:opacity-70 opacity-50"
          on:click={(evt) => {
            handle_click(i);
          }}
        >
          <div class="flex justify-between items-center p-1">
            <a id="default-tab" href="#first" class="text-center">
              {tab.name}
            </a>
            <div
              class="w-4 h-4 hover:text-red-600 transform hover:scale-125"
              on:click|stopPropagation={() => {
                handle_remove(i);
              }}
            >
              <MdClear />
            </div>
          </div>
        </li>
      {/if}
    {/each}
  </ul>
</div>
