<script>
    import InfoAlert from "@src/assets/svg/info_alert.svelte";
    let val = 20;
</script>

<section
    class="w-full overflow-hidden sticky top-0 h-10 flex items-center p-4 lg:px-32 gap-2 z-50 bg-orange-600"
>
    <InfoAlert className="w-5 text-white hidden lg:block" />
    <span class="font-medium text-white text-nowrap scroll"
        >This website is still in development. Please be patient as some
        features may not work.</span
    >
</section>

<style>
    @media not all and (min-width: 1024px) {
        .scroll {
            animation: scroll 10s linear infinite;
        }
    }

    @keyframes scroll {
        0% {
            transform: translateX(100vw);
        }
        100% {
            transform: translateX(-200vw);
        }
    }
</style>
