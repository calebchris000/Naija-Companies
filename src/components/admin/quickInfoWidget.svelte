<script lang="ts">
  export let Icon = "";
  export let title = "";
  export let value: string | number = "";
</script>

<section
  class="w-[20rem] h-[8rem] bg-blue-900 p-4 flex flex-col gap-3 items-center"
>
  <span></span>
  <span class="text-xl">{title}</span>
  <span class="text-3xl font-medium">{value}</span>
</section>
