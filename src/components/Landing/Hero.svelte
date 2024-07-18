<script lang="ts">
  import hero_review from "@src/assets/svg/hero_review.svg";
  import Search from "@src/assets/svg/search.svelte";
</script>

<section class="w-full h-screen bg-primary flex justify-between p-4 py-10 xl:p-32">
  <div class="w-full h-full flex flex-col gap-4 xl:w-[42rem]">
    <span class="text-3xl leading-relaxed font-medium text-secondary text-center xl:text-start">
      Uncover the Truth About Nigerian Workplaces - Read <b>Authentic</b> Employee
      Reviews
    </span>
    <span class="text-secondary leading-loose text-sm text-center xl:text-start">
      Get honest insights from real Nigerian employees. Make informed career
      decisions based on genuine workplace experiences.
    </span>

    <div class="bg-skyblue max-w-[42rem] h-12 flex items-center p-4 gap-4 rounded-lg mt-10">
      <Search className="w-6 text-light" />
      <input
        class="text-light placeholder:text-light outline-none w-full bg-transparent"
        placeholder="Search for a company"
        type="text"
        name=""
        id=""
      />
    </div>
  </div>
  <div class="w-full hidden xl:block">
    <img class="ms-auto w-[20rem]" src={hero_review} alt="" />
  </div>
</section>
