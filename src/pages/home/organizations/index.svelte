<script lang="ts">
    import { navigate } from "svelte-routing";
    import CompanyList from "./components/company_list.svelte";
    import Filters from "./components/filters.svelte";
    import Navbar from "./components/navbar.svelte";
    import Search from "./components/search.svelte";
    import { onMount } from "svelte";
    import { useToken } from "@src/core/utils/utils";
    import { GetOrganizations } from "@src/core/api/organization";
    import { Notification } from "@src/utils/notification";

    const token = useToken();
    const notification = new Notification();
    $: organizations = [] as any[];

    async function getOrganizations() {
        const response = await GetOrganizations({ token, showAverage: true });

        const { status, data } = response;
        console.log(data);

        if (status !== 200) {
            return notification.error({
                text: data?.message ?? "Could not get organizations",
            });
        }

        organizations = data?.data.map((org: any) => ({
            id: org.id,
            image: org.logoUrl,
            name: org.name,
            rating: org.average,
            reviews: [org.city ?? ""],
        }));
    }

    onMount(() => {
        getOrganizations();
    });
</script>

<section class="2xl:h-screen org bg-secondary max-w-[120rem] mx-auto">
    <Navbar />

    <section class="lg:px-10 px-4 flex flex-col gap-10">
        <div class="mt-10 lg:w-[50%] mx-auto flex flex-col gap-4">
            <Search
                on:itemSelect={(e) => {
                    navigate(`/home/organizations/${e.detail.id}`);
                    console.log(e.detail, "is selected");
                }}
                placeholder="Search a company"
                input_class="bg-gray-200 placeholder:text-primary text-primary"
            />
            <Filters
                on:filter={(e) => {
                    console.log("filter is", e.detail);
                }}
                on:sort={(e) => {
                    console.log("sort is ", e.detail);
                }}
            />
        </div>
        <div class="flex flex-col gap-10">
            <CompanyList list={organizations} type="Trending" />
            <CompanyList list={organizations} type="Upcoming Startups" />
        </div>
    </section>
</section>
