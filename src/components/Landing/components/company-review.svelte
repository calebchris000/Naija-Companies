<script lang="ts">
    import Arrow from "@src/assets/svg/Arrow.svelte";

    export let className = "";

    const rating = [
        { label: "Workspace", percent: "70" },
        { label: "Salary Punctuality", percent: "90" },
        { label: "Clear Hierarchy", percent: "70" },
        { label: "Paid Leaves & Bonuses", percent: "90" },
    ];
</script>

<figure class="bg-skyblue w-full h-full rounded-xl p-10 space-y-8 {className}">
    <div class="text-light space-y-4">
        <span class="font-medium text-2xl text-light">Reviews & Ratings</span>
        <div class="flex items-center gap-4">
            <span class="text-[4rem] font-semibold text-light leading-none"
                >4.9</span
            >
            <div class="flex flex-col gap-2">
                <span class="text-4xl leading-none">★★★★★</span>
                <span class="text-sm text-primary leading-none"
                    >Based on 449 ratings</span
                >
            </div>
        </div>
    </div>

    <!--* Divider  -->
    <div class="h-[0.5px] bg-light w-full"></div>
    <!--* Divider  -->

    <!--* Ratings  -->
    <div class="grid grid-cols-1 gap-5 lg:gap-8 lg:grid-cols-2">
        {#each rating as { label, percent }}
            <div class="space-y-2">
                <span class="font-normal text-sm text-light">{label}</span>
                <div
                    class="w-full h-2 bg-light relative rounded-2xl overflow-hidden"
                >
                    <span
                        style="width: {percent}%;"
                        class="bg-green-500 absolute left-0 top-0 bottom-0"
                    ></span>
                </div>
            </div>
        {/each}
    </div>
    <button
        class="bg-light p-4 rounded-md font-semibold flex items-center gap-4 text-secondary"
        type="button"
    >
        <span>See Reviews</span>
        <Arrow className="w-4 rotate-[135deg]" />
    </button>
</figure>
