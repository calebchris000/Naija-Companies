<script lang="ts">
  export let className = "";
</script>

<figure
  class="bg-skyblue rounded-xl h-full w-full p-4 py-10 {className} space-y-5 xl:space-y-10 xl:p-10"
>
  <!--* Top First -->
  <div class="w-full flex items-center gap-4 flex-col xl:flex-row xl:gap-10">
    <span class="w-32 h-32 bg-gray-400 rounded-full"></span>
    <div class="flex flex-col gap-2 xl:text-center w-full xl:w-fit">
      <span class="text-2xl text-light text-center font-medium leading-none xl:text-start xl:leading-normal"
        >Company Name</span
      >
      <span class="text-xs text-primary text-center leading-none mt-4 xl:mt-0 xl:text-start"
        >1, Address Avenue, State, Country. TX 230310 Lorem is long</span
      >
      <span class="text-xs text-primary text-center leading-normal  xl:text-start">www.website.com</span>
      <span class="text-xs text-primary text-center leading-normal  xl:text-start">email@email.com</span>
    </div>
  </div>
  <!--* Top First -->

  <!--* Bottom Second  -->
  <div>
    <span class="text-primary text-sm text-center xl:text-start"
      >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore sit,
      dolor corporis quis hic, quo iure iste maxime neque error eum laboriosam
      aliquam tempora eligendi ut magni alias saepe veritatis.</span
    >
  </div>
  <!--* Bottom Second  -->
</figure>
