<script lang="ts">
    import Search from "@src/assets/svg/search.svelte";
    import Navbar from "@src/components/navbar/navbar.svelte";
    import CompanyEdit from "./components/company-edit.svelte";
    import SkipForward from "@src/assets/svg/skip_forward.svelte";
    import Arrow from "@src/assets/svg/Arrow.svelte";
</script>

<figure>
    <Navbar disabled={true} className="top-[0!important]" />
    <section
        class="absolute flex flex-col justify-between rounded-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white w-[80vw] h-[75vh] p-10"
    >
        <div class="top grid grid-cols-12 gap-20">
            <div class="left col-span-5 flex flex-col gap-4">
                <div class="text-top flex flex-col gap-4">
                    <span class="text-3xl font-medium text-secondary"
                        >Find Your Companies</span
                    >
                    <span class="text-gray-500 leading-loose text-sm"
                        >Select the companies you're currently employed by or
                        have worked for recently. This step helps us verify your
                        eligibility to provide authentic reviews. We prioritize
                        accurate insights from genuine employees. If your
                        company isn't listed, you can request to add it.</span
                    >
                </div>
                <div
                    class="search bg-skyblue rounded-md text-light mt-4 flex items-center gap-4 p-4"
                >
                    <Search className="w-6" />
                    <input
                        class="bg-transparent outline-none placeholder:text-white"
                        type="text"
                        placeholder="Search for a company"
                    />
                </div>
            </div>
            <div class="right col-span-7 h-[95%] pe-5 overflow-y-scroll">
                <CompanyEdit index={1} company_name="Zed Enterprise" />
            </div>
        </div>
        <div class="bottom w-full flex justify-between">
            <button
                class="text-cto font-medium flex items-center gap-2 flex-row-reverse"
                type="button"
            >
                <span>Skip This Step</span>
                <SkipForward className="w-5" />
            </button>
            <button
                class="text-cto font-medium flex items-center gap-2"
                type="button"
            >
                <span>Next Step</span>
                <Arrow className="w-4 rotate-180" />
            </button>
        </div>
    </section>
</figure>
