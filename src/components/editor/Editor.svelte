<script lang="ts">
  import EditorJS from "@editorjs/editorjs";
  import { getStarRating } from "@src/core/logic/getStarRating";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import edjsHTML from "editorjs-html";

  const dispatch = createEventDispatcher();
  const edjsParser = edjsHTML();

  $: rated_value = 0;
  $: stars = getStarRating(rated_value).join("");
  let editor: EditorJS;

  function handleSave() {
    editor.save().then((d) => {
      const html = edjsParser.parse(d);
      
      dispatch("save", { content: html, star: rated_value });
    });
  }

  document.addEventListener("onSaveEditor", handleSave);

  onMount(() => {
    editor = new EditorJS({
      holder: "editor_parent",
      placeholder: "Write your review here.",
      onReady: () => {
        console.log("Editor is ready!");
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  function handleChange(e: Event) {
    const { value } = e.target as any;
    const float = parseFloat(value);
    const converted = (float / 100) * 5;
    if (converted % 0.5 === 0 && float) {
      rated_value = converted;
    }
  }
  $: star_color =
    rated_value < 2.5
      ? "red"
      : rated_value >= 2.5 && rated_value <= 3.5
        ? "orange"
        : "green";
</script>

<section class="relative flex flex-col gap-2">
  <span style="color: {star_color}" class="text-3xl">{stars}</span>
  <div class="flex gap-2 h-5 border border-black absolute top-3 opacity-0">
    <input
      on:change={handleChange}
      on:input={handleChange}
      type="range"
      class="h-full"
      name=""
      id=""
    />
  </div>
  <div
    class="px-4 w-full border border-gray-400 max-h-44 overflow-auto"
    id="editor_parent"
  ></div>
</section>
