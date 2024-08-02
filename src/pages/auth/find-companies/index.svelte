<script lang="ts">
    import Search from "@src/assets/svg/search.svelte";
    import Navbar from "@src/components/navbar/navbar.svelte";
    import CompanyEdit from "./components/company-edit.svelte";
    import SkipForward from "@src/assets/svg/skip_forward.svelte";
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import { onMount } from "svelte";
    import { LocalStorage } from "@src/core/utils/utils";
    import { navigate } from "svelte-routing";

    const local_storage = new LocalStorage();

    onMount(() => {
        const current_step = local_storage.getItem("step", true);

        if (!current_step) {
            local_storage.setItem("step", "/signup");
            navigate("/signup");
        }
    });
</script>

<figure class="bg-white h-screen">
    <Navbar disabled={true} className="top-[0!important]" />
    <section
        class="lg:absolute p-4 flex flex-col justify-between rounded-2xl lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%] lg:bg-primary lg:w-[80vw] lg:h-[70vh] lg:p-10"
    >
        <div class="top flex flex-col lg:grid lg:grid-cols-12 gap-32 lg:gap-10">
            <div class="left lg:col-span-5 flex flex-col gap-4">
                <div class="text-top flex flex-col gap-4">
                    <span class="text-3xl text-secondary font-medium"
                        >Find Your Companies</span
                    >
                    <span class="text-secondary leading-loose lg:text-sm"
                        >Select the companies you're currently employed by or
                        have worked for recently. This step helps us verify your
                        eligibility to provide authentic reviews. We prioritize
                        accurate insights from genuine employees. If your
                        company isn't listed, you can request to add it.</span
                    >
                </div>
                <div
                    class="search bg-secondary rounded-md text-secondary mt-4 flex items-center gap-4 p-4"
                >
                    <Search className="w-6 text-primary" />
                    <input
                        class="bg-transparent outline-none text-primary placeholder:text-primary"
                        type="text"
                        placeholder="Search for a company"
                    />
                </div>
                <div
                    class="bottom mt-auto max-md:hidden flex items-center justify-between"
                >
                    <button
                        class="text-cto border border-cto p-2 px-4 rounded-md font-medium flex items-center gap-2 flex-row-reverse"
                        type="button"
                    >
                        <span class="">Skip </span>
                        <SkipForward
                            className="w-5 text-secondary stroke-cto"
                        />
                    </button>
                    <button
                        class="text-primary bg-cto p-2 px-4 rounded-md font-medium flex items-center gap-2"
                        type="button"
                    >
                        <span>Next</span>
                        <Arrow className="w-4 rotate-180" />
                    </button>
                </div>
            </div>
            <div
                class="right lg:col-span-7 lg:h-[95%] lg:pe-5 lg:overflow-y-scroll"
            >
                <CompanyEdit index={1} company_name="Zed Enterprise" />
            </div>
        </div>

        <div
            class="bottom w-full flex items-center mt-10 justify-between lg:hidden lg:absolute lg:bottom-10"
        >
            <button
                class="text-cto font-medium flex items-center gap-2 flex-row-reverse"
                type="button"
            >
                <span class="">Skip This Step</span>
                <SkipForward className="w-5" />
            </button>
            <button
                class="text-primary font-medium flex items-center gap-2"
                type="button"
            >
                <span>Next Step</span>
                <Arrow className="w-4 rotate-180" />
            </button>
        </div>
    </section>
</figure>
