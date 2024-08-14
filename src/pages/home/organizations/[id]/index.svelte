<script lang="ts">
    import Pencil from "@src/assets/svg/Pencil.svelte";
    import Navbar from "../components/navbar.svelte";
    import CompanyInfo from "./components/company_info.svelte";
    import { getStarRating } from "@src/core/logic/getStarRating";

    const params_id = window.location.href.split("/").slice(-1).join("");
    console.log(params_id);

    const stars = getStarRating(5).join("");
</script>

<section class="h-screen 2xl:h-screen bg-secondary max-w-[120rem] mx-auto">
    <Navbar />
    <section class="mx-auto mt-10 px-56">
        <div class="flex flex-col gap-4">
            <CompanyInfo />
            <div
                class="bg-primary w-full h-24 rounded-3xl p-4 px-8 flex justify-between items-center"
            >
                <button
                    class="text-secondary flex items-center gap-4"
                    type="button"
                >
                    <span class="">Write a review</span>
                    <Pencil className="w-4" />
                </button>

                <button class="text-secondary text-4xl" type="button"
                    >{stars}</button
                >
            </div>
        </div>
        <div></div>
    </section>
</section>
