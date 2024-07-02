<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let className = "";

  type ListType = {
    id: string | number;
    name: string | number;
  };
  export let defaultValue: any = "";
  export let icon: string = "";
  export let icon_class: string = "";
  export let label: string = "";
  export let custom_empty_message = "Nothing";
  export let placeholder: string = "";
  const Placeholder = placeholder;
  export let list: ListType[] = [{ id: "0", name: "Nothing" }];
  const dispatch = createEventDispatcher();

  $: isOpen = false;
  $: value_exist = list.find((l) => String(l.name) === String(defaultValue));

  $: if (value_exist) {
    placeholder = `${Placeholder}: ${defaultValue}`;
  }
  function handleState() {
    isOpen = !isOpen;

    dispatch("open", { isOpen, label });
  }

  function handleItemClick({ id, name }: any) {
    dispatch("item_click", { id, name });
    placeholder = `${Placeholder}: ${name}`;
  }

  let parent: HTMLDivElement;
  let options: HTMLDivElement;

  document.addEventListener("mousedown", (e) => {
    if (!e.target || !parent) return;
    const element = e.target as HTMLElement;

    if (!parent.contains(element)) {
      isOpen = false;
    }
  });
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  bind:this={parent}
  role="button"
  on:click|stopPropagation={handleState}
  class="border-b p-2 select_parent flex ps-8 items-center relative border-gray-400 {className}"
>
  <img
    class="absolute w-4 left-0 top-[50%] translate-y-[-50%] {icon_class}"
    src={icon}
    alt="icon"
  />
  <span class="text-gray-600 font-medium">{placeholder}</span>
  <div
    bind:this={options}
    style="display: {isOpen ? 'flex' : 'none'}"
    class="absolute flex flex-col gap-2 z-20 max-h-[30vh] overflow-y-scroll transition-all top-8 bg-white left-0 right-0 py-2 shadow-sm"
  >
    {#if Array.isArray(list) && list.length}
      {#each list as { id, name }}
        <span
          on:click|self={() => handleItemClick({ id, name })}
          role="button"
          class="select-none border-b px-2 border-gray-100 py-2 text-sm"
          >{name}</span
        >
      {/each}
    {:else}
      <span class="select-none border-b px-2 border-gray-100 py-2 text-sm"
        >{custom_empty_message}</span
      >
    {/if}
  </div>
</div>
