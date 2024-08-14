<script lang="ts">
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import Building from "@src/assets/svg/building.svelte";

    import { getStarRating } from "@src/core/logic/getStarRating";

    type DetailType = {
        id: string;
        image: string;
        name: string;
        type: string;
        average: number;
        website: string;
        description: string;
        verified: boolean;
    };
    export let detail: DetailType = {
        id: "comp123",
        image: "https://picsum.photos/200",
        name: "TechWave Solutions",
        type: "Technology",
        average: 4.7,
        website: "https://techwavesolutions.com",
        description:
            "Innovative software solutions for all businesses. Expert team delivers cutting-edge tech tailored to needs. Comprehensive services: custom apps, cloud integration, cybersecurity. Driving digital transformation, empowering organizations to stay ahead, focusing on scalability and user experience.",
        verified: true,
    };

    const stars = getStarRating(detail.average).join("");
    $: image_loaded = false;
    function handleImageLoad() {
        image_loaded = true;
    }
</script>

<section
    class="bg-primary max-h-[20rem] text-secondary w-full rounded-3xl h-[50vh] flex items-start gap-10 p-10 pb-20"
>
    <div class="flex flex-col justify-between gap-4 h-full">
        <div
            class:border-none={image_loaded}
            class="w-40 mx-auto rounded-full overflow-hidden border-2 border-secondary"
        >
            <img
                hidden={!image_loaded}
                on:load={handleImageLoad}
                class=""
                src={detail.image}
                alt="logo"
            />
            <span
                style="display: {image_loaded ? 'none' : 'gridq'}"
                class="w-40 grid place-items-center h-40"
            >
                <Building className="w-20" />
            </span>
        </div>
        <span
            class="bg-secondary rounded-md mx-auto text-primary font-bold w-fit px-4"
            >{detail.type.toUpperCase()}</span
        >
    </div>
    <div class="flex flex-col gap-2 h-full">
        <div class="flex items-center gap-2">
            <span class="text-2xl text-secondary font-semibold"
                >{detail.name}</span
            >
            {#if detail.verified}
                <span class="w-4 h-4 rounded-full bg-green-500"></span>
            {/if}
        </div>
        <span class="text-3xl">{stars}</span>
        <a class="flex items-center gap-2" href={detail.website}>
            <span>Visit Website</span>
            <Arrow className="w-3 rotate-[135deg]" />
        </a>
        <div class="flex-grow"></div>
        <span>{detail.description}</span>
    </div>
</section>
