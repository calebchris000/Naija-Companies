<script lang="ts">
  import hero_review from "@src/assets/svg/hero_review.svg";
  import Search from "@src/assets/svg/search.svelte";
</script>

<section
  class="hero w-full separator h-screen lg:h-[85vh] bg-primary flex justify-between p-4 py-10 lg:p-32 lg:py-20 pb-0 lg:pb-0"
>
  <div class="w-full h-full flex flex-col gap-4 lg:w-[42rem] z-10">
    <span
      class="leading-relaxed text-4xl font-medium text-secondary text-center lg:text-start lg:text-3xl"
    >
      Uncover the Truth About Nigerian Workplaces - Read <b>Authentic</b> Employee
      Reviews
    </span>
    <span
      class="text-secondary leading-loose text-center lg:text-start lg:text-sm"
    >
      Get honest insights from real Nigerian employees. Make informed career
      decisions based on genuine workplace experiences.
    </span>

    <div
      class="bg-skyblue max-w-[42rem] flex h-16 items-center p-4 gap-4 rounded-lg mt-10 lg:h-12"
    >
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
  <div class="w-full hidden lg:block z-10">
    <img class="ms-auto w-[28rem]" src={hero_review} alt="" />
  </div>
</section>

<style>
  .hero {
    z-index: 10;
  }
  .hero::after {
    content: "";
    position: absolute;
    inset: 0;
    height: calc(100vh + 5rem);
    /* background-image: url("../../assets/overlay/death-star.svg"); */
    background-size: 80px;
    opacity: 0.05;
    z-index: 0;
  }

</style>
