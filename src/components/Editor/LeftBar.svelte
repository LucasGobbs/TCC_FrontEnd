<script lang="ts">
  import MdSearch from "svelte-icons/md/MdSearch.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import DiGoogleAnalytics from "svelte-icons/di/DiGoogleAnalytics.svelte";
  import { fade } from "svelte/transition";
  import TiFolder from "svelte-icons/ti/TiFolder.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const onClickInSelected = () => {
    selectedButton = -1;
    dispatch("clickin", {});
  };
  const onClickInUnselected = (index: number) => {
    selectedButton = index;
    dispatch("clickun", { name: buttons[index].name });
  };
  const buttons = [
    { name: "explorer", component: TiFolder },
    { name: "config", component: MdSettings },
    { name: "dashboard", component: DiGoogleAnalytics },
  ];
  let selectedButton = -1;
</script>

<nav class="bg-indigo-500 w-16 h-full flex flex-col items-center z-1 justify-between shadow-xl border-r-2 border-indigo-800">
  <!-- Top -->
  <div class="">
    <!-- Logo -->
    <div class="mx-auto rounded-full bg-white w-10 h-10 mt-3" />
    <!-- Icons -->
    <div class="mt-8 w-16 text-white ">
      {#each buttons as button, i}
        {#if i == selectedButton}
          <div
            on:click={() => {
              onClickInSelected();
            }}
            class="py-4 hover:bg-indigo-600 bg-indigo-100 bg-opacity-5 border-opacity-100 border-white border-l-4 rounded h-16"
          >
            <div class="w-6 h-6 m-auto">
              <svelte:component this={button.component} />
            </div>
          </div>
        {:else}
          <div
            on:click={() => {
              onClickInUnselected(i);
            }}
            class="transition duration-500 ease-in-out py-4 hover:bg-indigo-600 rounded h-16"
          >
            <div class="w-6 h-6 m-auto">
              <svelte:component this={button.component} />
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Avatar
  <a href="#" class="mt-8">
    <img src="https://randomuser.me/api/portraits/women/76.jpg" class="rounded-full w-10 h-10 mb-3 mx-auto" />
  </a> -->
</nav>
