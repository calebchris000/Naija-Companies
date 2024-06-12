<script lang="ts">
  export let type: "text" | "number" | "password" = "text";
  export let label: string = "";
  export let placeholder: string = "";
  export let icon: string = ""
</script>

<div class="border-b p-2 px-4 ps-6 relative border-gray-400 rounded-sm">
    <img class="absolute w-3 left-0 top-[50%] translate-y-[-50%]" src={icon} alt="icon">
  <input class="outline-none text-sm font-medium placeholder:text-black bg-transparent border-transparent" {type} {placeholder} />
</div>
