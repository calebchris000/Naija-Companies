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
  <!-- Slider main container -->
  <div class="swiper select-none border border-red-500 h-full">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">
        <Info on:click={slideNext} />
      </div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
  </div>
</section>
