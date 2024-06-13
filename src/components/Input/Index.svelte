<script lang="ts">
  export let type: "text" | "number" | "password" = "text";
  export let label: string = "";
  export let placeholder: string = "";
  export let icon: string = ""
  export let icon_class: string =""
</script>

<div class="border-b p-2 px-4 ps-8 relative border-gray-400 rounded-sm">
    <img class="absolute w-4 left-0 top-[50%] translate-y-[-50%] {icon_class}" src={icon} alt="icon">
  <input class="outline-none font-medium placeholder:text-gray-600 bg-transparent border-transparent" {type} {placeholder} />
</div>
