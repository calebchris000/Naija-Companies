<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import EditorJS from "@editorjs/editorjs";

    let editor: EditorJS;
    let element: HTMLElement;

    export let focus = false;

    $: {
        if (!focus && editor && editor.blocks) {
            editor?.destroy();
        } else if (focus && !editor?.blocks) {
            editor = new EditorJS({
                holder: "editor",
                tools: {},
                placeholder: "Write your review...",
                autofocus: true,
            });
        }
    }

    onMount(() => {
        if (!focus) return;
        editor = new EditorJS({
            holder: "editor",
            tools: {},
            placeholder: "Write your review...",
            autofocus: true,
        });
    });

    onDestroy(() => {
        if (editor) {
            editor?.destroy();
        }
    });
</script>

<section
    bind:this={element}
    class="outline-none border border-primary rounded-xl h-full flex flex-col"
>
    <div id="editor" class="editor py-4 w-full border-none outline-none"></div>
</section>

<style>
    .editor {
        height: 10rem !important;
    }
</style>
