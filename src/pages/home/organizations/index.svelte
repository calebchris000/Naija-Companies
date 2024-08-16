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
    $: filters = { sort: "", filter: "" };
    $: organizations = [] as any[];
    $: organizations_filter = organizations;
    $: summarize_status = "inactive" as
        | "inactive"
        | "pending"
        | "success"
        | "failure";

    async function getOrganizations() {
        const response = await GetOrganizations({ token, showAverage: true });

        const { status, data } = response;
        console.log(data);

        if (status !== 200) {
            return notification.error({
                text: data?.message ?? "Could nwot get organizations",
            });
        }

        organizations = data?.data.map((org: any) => ({
            id: org.id,
            image: org.logoUrl,
            name: org.name,
            capitalId: org.capitalId,
            rating: org.average,
            reviews: [org.city ?? ""],
        }));
    }

    function handleSummarize() {
        summarize_status = "pending";
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
                    const { id, name } = e.detail;
                    organizations_filter = organizations.filter((org) => {
                        return org.capitalId === id;
                    });
                }}
                on:sort={(e) => {
                    console.log("sort is ", e.detail);
                    if (e.detail === "Ascending") {
                        console.log("it is");
                        organizations_filter = organizations_filter.sort(
                            (a, b) => a.name.localeCompare(b.name),
                        );
                    } else if (e.detail === "Descending") {
                        organizations_filter = organizations_filter.sort(
                            (a, b) => b.name.localeCompare(a.name),
                        );
                    } else {
                        organizations_filter = organizations.filter((org) => {
                            return organizations_filter.includes(org);
                        });
                    }
                }}
            />
        </div>
        <div class="flex flex-col gap-10">
            <CompanyList list={organizations_filter} type="Trending" />
            <CompanyList list={organizations_filter} type="Upcoming Startups" />
        </div>
    </section>
</section>
