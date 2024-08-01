<script lang="ts">
    import { getStarRating } from "@src/core/logic/getStarRating";

    export let name = "Zed Enterprise";
    export let rating = 5;
    export let review =
        "I've worked at Zed Enterprise for 3 years. Loved the innovative tech and supportive team. Grew constantly, enjoyed great work-life balance. Leadership was transparent, culture collaborative. Left for personal reasons, but highly recommend for tech careers.";
    export let reviewer = "David Oyewole";
    export let is_employee = false;

    const stars = getStarRating(rating).join("");
</script>

<section
    class="bg-primary text-secondary p-4 w-full lg:h-full rounded-xl mb-2 space-y-4"
>
    <div class="flex items-center gap-4">
        <span class="text-lg font-medium">{name}</span>
        <span class="text-2xl">{stars}</span>
    </div>
    <div>
        <span class="leading-loose">{review}</span>
    </div>
    <div class="flex items-center justify-end">
        <span class="text-sm text-cto"
            >{reviewer} {!is_employee ? " | Ex-Employee" : " | Employee"}</span
        >
    </div>
</section>
