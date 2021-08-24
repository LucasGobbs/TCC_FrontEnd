<script lang="ts">
  import LeftBar from "./LeftBar.svelte";
  import { Item } from "./Explorer/Explorer";

  import Avatar from "./Avatar.svelte";
  import Explorer from "./Explorer/Explorer.svelte";
  import TabBar from "./TabBar/TabBar.svelte";
  import { Col, Row, Container, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import { User, EditorSession } from "./user.js";
  import CodeMirror from "./Codemirror/index.js";
  let project_explorer = new Root(default_folder);

  import { Tab, Tabs } from "./TabBar/TabBar";
  import { default_folder, Root } from "./Explorer/Explorer";
  import { onMount } from "svelte";

  let tabs: Tabs = new Tabs([]);

  let options = {
    mode: "javascript",
    lineNumbers: true,
    theme: "dracula",
    value: "", //tab_list[0].data,
  };

  // const open_tab = (idx) => {
  //   options.value = tab_list[idx].data;
  //   return options;
  // };
  let editor;

  let editorSession = new EditorSession();
  $: editorSession.editor = editor;
  let bookmark = null;
  let cursor_activity = false;
  let _domNode;

  let first = true;
  let second_left = true;
  let left_bar = "explorer";
  onMount(() => {
    //editorSession.addUser(new User("Lucas"))
    editorSession.addUser(new User("Elian"));
    editorSession.addUser(new User("Eduardo"));
  });
  const handle_select_file = (evt) => {
    const new_tab = Tab.fromItem(evt.detail.selected);
    if (tabs.alreadyOpen(new_tab)) {
      const idx = tabs.getIndex(new_tab);
      if (idx == -1) {
        return;
      }
      tabs = tabs.select(idx);
    } else {
      tabs = tabs.add(new_tab);
    }
    editor.getDoc().setValue(evt.detail.selected.content);
    //editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: evt.detail.selected.content } });
    editor = editor;
    editorSession.moveCursor("Elian", 5, 6);
    editorSession.moveCursor("Eduardo", 1, 20);
  };
  const handle_select_tab = (evt) => {
    project_explorer = project_explorer.selectFile(Item.fromTab(evt.detail.tab));
    //editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: evt.detail.tab.content } });
    editor.getDoc().setValue(evt.detail.tab.content);
    editor = editor;
  };
  function cursorMoved(event) {
    //editorSession.editor.getDoc().replaceRange('T', {line: 0, ch: 0}, {line: 0, ch: 0})
    let pos = editor.getCursor("head");

    if (first) {
      first = false;
      editorSession.moveCursor("Elian", 5, 6);
      editorSession.moveCursor("Eduardo", 1, 20);
    }
  }

  function changed(event) {
    //console.log(event);
    // console.log(event.detail.doc.cm.display.input)
  }
  function changes(event) {
    //console.log("changes: ", event);
    // console.log(event.detail.doc.cm.display.input)
  }
  let avatar_bar = true;
  const create_user = () => {
    const colors = ["bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    const letters = "ABCDEFGHIJKLMNPQRSTUXYZ";

    return {
      color: colors[Math.floor(Math.random() * colors.length)],
      name: `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}`,
    };
  };
  let users = [];
  for (let i = 0; i < 25; i++) {
    users.push(create_user());
  }
</script>

<div class="total bg-red-500">
  <div class="flex flex-row flex-grow h-full ">
    <div class="flex flex-row flex-grow h-full ">
      <!-- Left Bar -->
      <div>
        <LeftBar />
      </div>
      {#if second_left}
        <div class="bg-white w-72 max-h-full shadow-2xl flex flex-col items-left z-1 justify-between ">
          <div class="ml-4 divide-y divide-indigo-300 w-11/12 h-full">
            <h1 class="text-black-500 tracking-widest text-sm pt-2 mb-3 font-bold">Programação Orientada a Objetos</h1>
            {#if left_bar == "explorer"}
              <h2 class="title-font font-medium text-black-500 tracking-widest text-2xl mb-5 pt-8 ">Explorer</h2>
              <!-- <Explorer bind:root={project_explorer} on:SelectFile={handle_select_file} /> -->
              <Explorer on:SelectFile={handle_select_file} bind:root={project_explorer} />
            {:else if left_bar == "config"}
              <h1 class="title-font font-medium text-black-500 tracking-widest text-2xl mb-3 pt-8 ">Config</h1>
              <!-- <div>
                <p>Font Size:</p>
                <input type="range" min="5" max="10" step="0.01" />
              </div> -->
            {:else if left_bar == "dashboard"}
              <h1 class="title-font font-medium text-black-500 tracking-widest text-2xl mb-3 pt-8 ">Storage</h1>
              <!-- <Dashboard /> -->
            {/if}
          </div>
        </div>
      {/if}
      <!-- Editor -->
      <div class="flex-grow h-full relative ">
        <div style="height: 5%;">
          <!-- <div>asdasdasdas</div> -->
          <TabBar on:TabSelected={handle_select_tab} bind:tabs />
        </div>

        <div style="height: 95%; width: calc(100%);" class=" max-w-full">
          <CodeMirror on:activity={cursorMoved} on:changes={changes} on:change={changed} bind:editor {options} class="editor" />
          <!-- <CodeMirror bind:this={editor} on:change={changes} /> -->
        </div>
      </div>
      {#if avatar_bar}
        <div class="bg-indigo-500 flex flex-col pt-1 p-2 pt-2 overflow-y-scroll shadow-md ">
          {#each users as user}
            <Avatar name={user.name} color={user.color} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- <div>
  <div on:click={() => {}} class="bg-blue-700">aaaaaaaa</div>
</div> -->
<style>
  .total {
    min-height: 100%;
    height: 100%;
    position: relative;
  }
  :global(.custon-cursor) {
    position: absolute;
    white-space: nowrap;
    transform: translate(-50%, 10%);
    width: 1px;
    height: 17px;
    margin: auto;
    display: inline-block;
    vertical-align: middle;
    opacity: 1;
    padding: 2px;
    z-index: 4000;
  }
  :global(.nametag) {
    position: absolute;
    white-space: nowrap;
    color: white;
    text-shadow: 0 0 2px #000000;
    border-radius: 3px;
    opacity: 0;
    font-size: 12px;
    padding: 2px;
    font-family: sans-serif;
    font-size: 15px;
    z-index: 4000;
    transform: translate(-50%, -100%);
    transition: opacity 0.5s ease-out;
  }
  :global(.custon-cursor:hover > .nametag) {
    opacity: 1;
  }
</style>
