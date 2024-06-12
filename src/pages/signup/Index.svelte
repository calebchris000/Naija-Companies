<script lang="ts">
  import Swiper from "swiper";
  import { Navigation, Pagination } from "swiper/modules";
  import "swiper/css";
  import { onMount } from "svelte";
  import Info from "./Info.svelte";

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
  <div class="swiper select-none border border-red-500 h-full">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <Info on:click={slideNext} />
      </div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="swiper-scrollbar"></div>
  </div>
</section>
