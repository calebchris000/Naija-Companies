<script lang="ts">
    import { onDestroy, onMount, createEventDispatcher } from "svelte";
    import edjsHTML from "editorjs-html";
    import EditorJS from "@editorjs/editorjs";

    let editor: EditorJS | null;
    let element: HTMLElement;

    export let focus = false;

    const dispatch = createEventDispatcher();
    const parser = edjsHTML();

    $: {
        if (!focus && editor && editor.blocks) {
            editor.destroy();
            editor = null;
        } else if (focus && !editor) {
            editor = new EditorJS({
                holder: "editor",
                tools: {},
                hideToolbar: true,
                placeholder: "Write your review...",
                autofocus: true,
                onChange: (api, event) => {
                    api.saver.save().then((d) => {
                        const html = parser.parse(d);
                        dispatch("change", `<div>${html.join("")}</div>`);
                    });
                },
                minHeight: 0,
                defaultBlock: "paragraph",
            });
        }
    }

    onMount(() => {
        if (!focus) return;
        if (editor) {
            editor.destroy();
        }
        editor = new EditorJS({
            holder: "editor",
            tools: {},
            hideToolbar: true,
            placeholder: "Write your review...",
            autofocus: true,
            onChange: (api, event) => {
                api.saver.save().then((d) => {
                    const html = parser.parse(d);
                    dispatch("change", `<div>${html.join("")}</div>`);
                });
            },
            minHeight: 0,
            defaultBlock: "paragraph",
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
    <div
        id="editor"
        class="editor h-full w-full border-none outline-none"
    ></div>
</section>

<style>
    .editor {
        @apply p-4 px-10;
    }
    :global(.ce-toolbar) {
        display: none !important;
    }

    :global(.codex-editor) {
        height: 100% !important;
    }

    :global(.ce-block__content) {
        max-width: 100% !important;
    }
</style>
