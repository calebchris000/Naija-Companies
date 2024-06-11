<script type="ts">
  import Swiper from "swiper";
  import { Navigation, Pagination, Autoplay } from "swiper/modules";
  import "swiper/css";
  import { onMount } from "svelte";
  import Review from "./Review.svelte";

  onMount(() => {
    new Swiper(".swiper", {
      modules: [Navigation, Pagination, Autoplay],
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });

  const reviewers = [
    {
      alias: "Mike O",
      review:
        "Working at Acme has been an incredibly rewarding experience. The collaborative culture, growth opportunities, and cutting-edge projects make it a fantastic place to build a career. I'm proud to be part of this innovative team.",
      organization: "Acme Solutions LTD.",
      rate: 5,
      employee: false,
    },
    {
      alias: "Oluseye A",
      review:
        "Dynamo Solutions was a nightmare from start to finish. Unethical practices, constant chaos, and a complete lack of professionalism made me regret ever joining this sinking ship of a company.",
      rate: 0.5,
      organization: "Dynamo Solutions.",
      employee: false,
    },
    {
      alias: "Ayomide T",
      review:
        "ZynoTech is a solid company with fair compensation and decent work-life balance. While there's room for improvement in management's communication, the overall work environment is positive and supportive.",
      rate: 3.5,
      organization: "ZynoTech Global.",
      employee: true,
    },
    {
      alias: "Oluseye Adebowale",
      review:
        "I wouldn't recommend Omnicorp to anyone. The toxic work culture, unrealistic deadlines, and complete disregard for employee well-being made it an incredibly stressful and demoralizing place to work.",
      rate: 2,
      organization: "Omnicorp.",
      employee: false,
    },
    {
      alias: "Chukwuemeka E",
      review:
        "My time at QuickByte was neither remarkable nor terrible. The work was steady, but the lack of clear career progression and outdated policies made it feel stagnant. It served its purpose as a job, but not much more.",
      rate: 2.5,
      organization: "QuickByte Solutions.",

      employee: false,
    },
  ];
</script>

<section
  class="flex max-md:flex-col lg:justify-between h-[100vh] pt-20 max-md:pt-28 gap-6"
>
  <div class="w-full">
    <h1 class="font-medium max-md:text-3xl">
      Uncover the Truth About Nigerian Workplaces - Read <strong
        class="text-orange-600">Authentic</strong
      > Employee Reviews
    </h1>
  </div>
  <div class="w-full max-md:w-full">
    <div class="swiper">
      <div class="swiper-wrapper">
        {#each reviewers as { alias, organization, review, rate, employee }}
          <div class="swiper-slide">
            <Review
              company_name={organization}
              reviewer_alias={alias}
              review_text={review}
              rating={rate}
              is_employee={employee}
            />
          </div>
        {/each}
      </div>
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</section>
