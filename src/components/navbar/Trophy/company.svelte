<script lang="ts">
  import logo from "@src/assets/test_logo.jpg";
  import { getStarColor, getStarRating } from "@src/core/logic/getStarRating";
  import "./style.css";

  export let rating: number = 5;
  export let company_name = "Delta Inc.";
  export let company_name_style = "text-[#8a7000]";
  export let divider_color = "#7c2d12";
  export let frame = "";
  export let star_color = getStarColor(rating);

  const stars = getStarRating(rating).join("");
  export let review =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel bibendum tincidunt, nisl nunc aliquet nunc, vitae aliquam nisl nunc eu nunc.";
</script>

<div
  class="bg-gray-50 h-[54vh] relative w-full flex gap-4 py-4 flex-col items-center shadow-lg xl:w-[20vw]"
>
  <img
    class="absolute top-[50%] scale-[1.4] translate-y-[-50%] xl:scale-[1.43] xl:w-full"
    src={frame}
    alt=""
  />
  <div class="border-2 h-24 w-24 overflow-hidden rounded-full xl:h-32 xl:w-32">
    <img class="w-full" src={logo} alt="" />
  </div>
  <div class="px-4">
    <span class="text-3xl font-semibold {company_name_style}"
      >{company_name}</span
    >
  </div>
  <div class="h-10 w-[80%] flex justify-center items-center">
    <span class="text-[3.5rem]" style="color: {star_color}">{stars}</span>
  </div>
  <div
    class="h-64 trophy_review text-xl text-black px-8 py-4 w-full border-t-2 overflow-y-auto"
    style="border-color: {divider_color};"
  >
    {review}
  </div>
</div>
