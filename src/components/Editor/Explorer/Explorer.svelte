
<script lang="ts">
//	import { slide } from 'svelte/transition'
    import {Item, default_folder, Root} from './Explorer'
    import Folder from './Folder.svelte'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
	export let root: Root = new Root(default_folder)
    const handle_select_file = (evt)=>{
        root = root.selectFile(evt.detail.selected); 
        dispatch('SelectFile',{selected: evt.detail.selected})
    }
</script>
<div class="h-full scrollbar-track-transparent scrollbar-thumb-indigo-400 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thin">
    <div class="">
        <ul>
            <Folder on:SelectFile={handle_select_file} bind:folder={root.folders}/>
        </ul>
    </div> 
</div>


