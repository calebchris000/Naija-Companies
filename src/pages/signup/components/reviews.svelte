<script>
    import { onMount } from "svelte";
    import Swiper from "swiper";
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import { Autoplay } from "swiper/modules";
    import Review from "./review.svelte";

    onMount(() => {
        const swiper = new Swiper(".swiper", {
            pagination: {
                el: ".swiper-pagination",
            },
            allowTouchMove: false,
            modules: [Autoplay],
            loop: true,
            autoplay: {
                delay: 3000,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
</script>

<section class="space-y-4">
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><Review /></div>
            <div class="swiper-slide"><Review /></div>
            <div class="swiper-slide"><Review /></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <!-- <div class="flex cursor-pointer items-center justify-center gap-3">
        <span class="w-2 h-2 bg-light rounded-full"></span>
        <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
    </div> -->
</section>

<style>
    .swiper {
        width: 100%;
        height: 300px;
    }
</style>
