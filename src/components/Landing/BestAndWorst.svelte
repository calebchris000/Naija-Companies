<script lang="ts">
  import Crown from "@src/assets/svg/crown.svelte";
  import Poop from "@src/assets/svg/poop.svelte";
  import frame_gold from "@src/assets/frame_gold.png";
  import Company from "../navbar/Trophy/company.svelte";
</script>

<section class="bg-blue-200 h-screen py-10 pb-20">
  <span class="text-4xl font-medium w-fit mx-auto py-5 block"
    >Best And Worst Companies for <b>2024</b></span
  >
  <div class="w-[85vw] mx-auto py-10 flex gap-10 items-center justify-between">
    <div class="w-full flex flex-col gap-8 items-center">
      <div class="flex items-center gap-8">
        <span class="text-3xl font-semibold text-[#8a7000]"
          >Employee's Choice</span
        >
        <Crown className="w-12 text-[#8a7000]" />
      </div>
      <Company
        frame={frame_gold}
        star_color="#c4a92e"
        divider_color="#c4a92e"
        review="This is the best company I've ever worked with in my entire life. Apart from the fact that the pay is on par with developed countries, the office culture is very accommodating. I couldn't recommend Delta enough!"
      />
    </div>
    <div class="w-full flex flex-col gap-8 items-center">
      <div class="flex items-center gap-8">
        <span class="text-3xl font-semibold text-orange-900"
          >Employee's Nightmare</span
        >
        <Poop className="w-8 text-orange-900" />
      </div>
      <Company
        company_name="Zed Technology LTD"
        company_name_style="text-orange-900"
        star_color="#7c2d12"
        review="Words cannot describe how absolutely terrible this company is. I've never worked with a company so bad I had to go to therapy. To anyone reading this; Please, PLEASE don't work for this company if you value your mental health."
        rating={0.5}
      />
    </div>
  </div>
</section>
