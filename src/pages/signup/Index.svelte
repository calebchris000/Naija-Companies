<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Swiper from "swiper";
  import { Navigation, Pagination } from "swiper/modules";
  import "swiper/css";
  import { onMount } from "svelte";
  import Info from "./Info.svelte";
  import Signup from "./Signup.svelte";
  import VerifyEmail from "./VerifyEmail.svelte";

  let swiper: Swiper | null = null;
  onMount(() => {
    swiper = new Swiper(".swiper", {
      modules: [Navigation, Pagination],
      pagination: {
        el: ".swiper-pagination",
      },
    });

    swiper.disable();
  });

  function slideNext() {
    swiper?.enable();
    swiper?.slideNext();
    swiper?.disable();
  }
  function slidePrev() {
    swiper?.enable();
    swiper?.slidePrev();
    swiper?.disable();
  }
</script>

<section class="h-screen">
  <Navbar show_right_action={false}>
    <div></div>
  </Navbar>
  <div class="swiper select-none bg-orange-50 h-full">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <Info on:click={slideNext} />
      </div>
      <div class="swiper-slide">
        <Signup
          on:signup_success={() => {
            slideNext();
          }}
        />
      </div>
      <div class="swiper-slide"><VerifyEmail /></div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="swiper-scrollbar"></div>
  </div>
</section>
