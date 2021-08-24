<script lang="ts">
    import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte'
    
    import type { Item } from "./Explorer";
    import { createEventDispatcher } from 'svelte';
    import { get_current_component } from 'svelte/internal';
    import { slide } from 'svelte/transition';

    const component = get_current_component();
    const dispatch = createEventDispatcher();
    let hovered = false
    export let folder: Item
    const handle_click = () => {
        folder.expanded = !folder.expanded
    }
    const select_file = (item) => {
        dispatch("SelectFile", {selected: item})
    }
    import IoMdMore from 'svelte-icons/io/IoMdMore.svelte'

    import DiPython from 'svelte-icons/di/DiPython.svelte'
    import DiCodeBadge from 'svelte-icons/di/DiCodeBadge.svelte'
    import DiCode from 'svelte-icons/di/DiCode.svelte'
    import DiJavascript1 from 'svelte-icons/di/DiJavascript1.svelte'
    import DiCss3 from 'svelte-icons/di/DiCss3.svelte'
    import DiJava from 'svelte-icons/di/DiJava.svelte'
    import DiGo from 'svelte-icons/di/DiGo.svelte'
    const component_by_lang = (file_name: string): any => {
        if(file_name.endsWith('js')){return DiJavascript1;}
    }
</script>

<div on:click={handle_click} class="group flex items-center cursor-pointer pb-1 hover:bg-indigo-300 rounded font-semibold justify-between">
    <div class="flex">
        <div class="w-6 h-6 mr-1 transform -translate-x-1">
            {#if folder.expanded}
                <div class="transform rotate-90"><MdChevronRight /></div>
                
            {:else}
    
                <MdChevronRight />
            {/if}		
        </div>
        {folder.name}
    </div>
    
    <div class="w-6 h-6 opacity-0 group-hover:opacity-40 hover:opacity-100">
        <IoMdMore />
    </div>
</div>
{#if folder.expanded}	
    {#each folder.children as child}
        <div  in:slide class="pl-2 border-l border-black border-opacity-25">
            {#if child.isFolder()}
                <svelte:self on:SelectFile={(evt)=>{select_file(evt.detail.selected)}} bind:folder={child} />
            {:else}
                <div class = "flex items-center cursor-pointer hover:bg-purple-300" on:click={()=>{select_file(child)}}>
                    <div class="w-6 h-6 text-indigo-500 mr-1">
                        {#if child.name.endsWith('js')}
                            <DiJavascript1 />
                        {:else if  child.name.endsWith('java')}
                            <DiJava />
                        {:else if  child.name.endsWith('css')}
                            <DiCss3 />
                        {:else if  child.name.endsWith('py')}
                            <DiPython/>
                        {:else if  child.name.endsWith('go')}
                            <DiGo/>
                        {:else}
                             <DiCode />
                        {/if}
                        
                    </div>
                    {#if child.expanded}
                        <div class="font-bold text-indigo-500">{child.name}</div>
                    {:else}
                        <div>{child.name}</div>
                    {/if}
                    
                </div>
                
            {/if}
        </div>
    {/each}
{/if}

