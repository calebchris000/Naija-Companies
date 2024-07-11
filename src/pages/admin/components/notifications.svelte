<script lang="ts">
  import More from "@src/assets/svg/More.svelte";

  export let notification_list = [
    {
      value:
        "This is a text notification that would be used to test both the length and the style.",
      read: false,
      type: "info",
      date: "2020-04-22",
    },
    {
      value:
        "This is a text notification that would be used to test both the length and the style.",
      read: true,
      type: "info",
      date: "2020-04-22",
    },
    {
      value:
        "This is a text notification that would be used to test both the length and the style.",
      read: true,
      type: "info",
      date: "2020-04-22",
    },
    {
      value:
        "This is a text notification that would be used to test both the length and the style.",
      read: true,
      type: "info",
      date: "2020-04-22",
    },
    {
      value:
        "This is a text notification that would be used to test both the length and the style.",
      read: true,
      type: "info",
      date: "2020-04-22",
    },
  ];
</script>

<div class="p-6 flex flex-col items-start gap-4">
  <span class="text-2xl font-medium text-center">NOTIFICATIONS</span>

  <div class="flex flex-col gap-2 w-full overflow-y-auto h-[24rem]">
    {#each notification_list as { value, read, date }}
      <button
        class="bg-gray-600 h-64 p-4 grid grid-cols-12 items-center py-2 w-full"
        style="font-weight: {read ? '500' : '700'}"
        type="button"
      >
        <span class="h-10 w-10 bg-gray-400 rounded-full col-span-2"> </span>
        <span class="col-span-8 text-start">
          {value.length > 70 ? value.slice(0, 70).trim() + "..." : value}
        </span>
        <div class="flex flex-col justify-between h-full col-span-2">
            <button class="ms-auto" type="button">
                <More className="w-5" />
            </button>
          <span class="text-xs">{date}</span>
        </div>
      </button>
    {/each}
  </div>
</div>
