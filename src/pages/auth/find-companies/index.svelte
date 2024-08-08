<script lang="ts">
    import Navbar from "@src/components/navbar/navbar.svelte";
    import CompanyEdit from "./components/company-edit.svelte";
    import SkipForward from "@src/assets/svg/skip_forward.svelte";
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import { onMount } from "svelte";
    import { LocalStorage } from "@src/core/utils/utils";
    import { navigate } from "svelte-routing";
    import Search from "@src/components/Input/search.svelte";
    import { Notification } from "@src/utils/notification";
    import { GetOrganizations } from "@src/core/api/organization";
    import { AddJobExperiences } from "@src/core/api/experiences";
    import Company from "@src/pages/home/capital/[capital]/Company.svelte";
    const local_storage = new LocalStorage();
    const notification = new Notification();
    $: companies_data = [] as any[];
    $: selected_orgs_id = [] as number[];
    $: search = "";
    $: org_filter = organizations.filter((org: any) => {
        const lower = org.name.toLowerCase();
        const search_lower = search.toLowerCase();
        return (
            lower.includes(search_lower) && !selected_orgs_id.includes(org.id)
        );
    });

    $: upload_status = "inactive" as
        | "inactive"
        | "pending"
        | "success"
        | "failure";

    $: {
        if (upload_status === "failure") {
            setTimeout(() => {
                upload_status = "inactive";
            }, 1000);
        }
    }

    $: organizations = [] as any[];

    async function getOrganizations() {
        const response = await GetOrganizations({ token: "" });
        console.log(response);
        if (response.status !== 200) {
            notification.error({
                text:
                    response.data?.message ??
                    "Organizations could not be fetched",
            });
            return;
        }
        console.log(response.data);
        if (!response.data?.data?.length) return;
        const formatted = response.data.data.map((org: any) => {
            return {
                id: org.id,
                name: org.name,
            };
        });
        organizations = formatted;
        console.log(response.data?.data);
    }

    function handleSkip() {
        local_storage.setItem("step", "/signup/success");
        navigate("/signup/success");
    }
    async function handleNext() {
        console.log("next is clicked");
        upload_status = "pending";
        if (companies_data.length === 0) {
            upload_status = "failure";
            notification.error({ text: "Please add at least one company" });
            return;
        }
        console.log(companies_data, "is data and ", organizations, "is valid");
        let isValid = true;
        companies_data.forEach((company) => {
            if (company.selected_roles?.length === 0) {
                notification.error({
                    text: `Please select at least one role for ${organizations.find((org) => org.id === company.id)?.name}`,
                });
                isValid = false;
                return;
            }
            if (!company.tenure.start) {
                notification.error({
                    text: `Please select a start date for ${organizations.find((org) => org.id === company.id)?.name}`,
                });
                isValid = false;
                return;
            }
            if (!company.tenure.current && !company.tenure.end) {
                notification.error({
                    text: `Please select an end date for ${organizations.find((org) => org.id === company.id)?.name}`,
                });
                isValid = false;
                return;
            }
            if (!company.document_proof) {
                notification.error({
                    text: `Please upload a document proof for ${organizations.find((org) => org.id === company.id)?.name}`,
                });
                isValid = false;
                return;
            }
        });

        if (!isValid) {
            upload_status = "failure";
            return;
        }

        console.log("passed");

        const res = await AddJobExperiences(companies_data, "");

        if (res.status !== 201) {
            upload_status = "failure";
            notification.error({
                text: res.data?.message ?? "Could not add experiences",
            });
        } else {
            upload_status = "success";
            notification.success({
                text: "Experiences added successfully",
            });

            setTimeout(() => {
                navigate("/signup/success");
            }, 3000);
        }
    }

    onMount(() => {
        const current_step = local_storage.getItem("step", true);
        const user = local_storage.getItem("user", false);

        if (!current_step || !user?.id) {
            local_storage.setItem("step", "/signup");
            navigate("/signup");
        }
        getOrganizations();
    });
</script>

<figure class="bg-white lg:h-screen">
    <Navbar disabled={true} className="top-[0!important]" />
    <section
        class="lg:absolute text-primary p-4 flex flex-col justify-between rounded-2xl lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[45%] lg:bg-primary lg:w-[80vw] lg:h-[70vh] lg:p-10"
    >
        <div class="top flex flex-col lg:grid lg:grid-cols-12 gap-32 lg:gap-10">
            <div class="left lg:col-span-5 flex flex-col gap-4">
                <div class="text-top flex flex-col gap-4">
                    <span
                        class="text-3xl lg:text-start text-center text-primary lg:text-secondary font-medium"
                        >Find Your Companies</span
                    >
                    <span
                        class="text-primary lg:text-start text-center lg:text-secondary leading-loose lg:text-sm"
                        >Select the companies you're currently employed by or
                        have worked for recently. This step helps us verify your
                        eligibility to provide authentic reviews. We prioritize
                        accurate insights from genuine employees. If your
                        company isn't listed, you can request to add it.</span
                    >
                </div>

                <div class="relative">
                    <Search
                        on:click={(e) => {
                            const { detail } = e;
                            selected_orgs_id = [
                                ...selected_orgs_id,
                                detail?.id,
                            ];
                        }}
                        selected_items={selected_orgs_id}
                        items={organizations}
                    />
                </div>
                <div
                    class="bottom mt-auto max-md:hidden flex items-center justify-between"
                >
                    <button
                        on:click={handleSkip}
                        class="text-cto border border-cto p-2 px-4 rounded-md font-medium flex items-center gap-2 flex-row-reverse"
                        type="button"
                    >
                        <span class="">Skip </span>
                        <SkipForward
                            className="w-5 text-secondary stroke-cto"
                        />
                    </button>
                    <button
                        disabled={upload_status !== "inactive"}
                        class:cursor-not-allowed={upload_status !== "inactive"}
                        class:bg-green-600={upload_status === "success"}
                        class:bg-red-500={upload_status === "failure"}
                        class:text-secondary={upload_status === "failure" ||
                            upload_status === "success"}
                        on:click={handleNext}
                        class="text-primary transition-all bg-cto p-2 px-4 rounded-md font-medium flex items-center gap-2"
                        type="button"
                    >
                        {#if upload_status === "pending"}
                            <span>Processing...</span>
                        {:else if upload_status === "success"}
                            <span>Success</span>
                        {:else if upload_status === "failure"}
                            <span>Failed</span>
                        {:else}
                            <span>Next</span>
                        {/if}
                        <Arrow className="w-4 rotate-180" />
                    </button>
                </div>
            </div>
            <div
                class="right translate-y-[-5rem] lg:translate-y-0 lg:col-span-7 lg:h-[24rem] flex flex-col gap-10 lg:pe-5 lg:overflow-y-scroll"
            >
                {#if selected_orgs_id.length === 0}
                    <div class="text-center text-primary lg:text-secondary">
                        <span class="font-medium lg:text-3xl text-start"
                            >Please select an organization to add.</span
                        >
                    </div>
                {:else}
                    {#each selected_orgs_id as org_id, id}
                        <CompanyEdit
                            on:update={(e) => {
                                const { detail } = e;
                                const index = companies_data.findIndex(
                                    (cd) => cd.id === detail.id,
                                );
                                if (index !== -1) {
                                    companies_data[index] = detail;
                                } else {
                                    companies_data.push(detail);
                                }
                                console.log(companies_data, detail);
                            }}
                            index={org_id}
                            sn={id + 1}
                            company_name={organizations.find(
                                (o) => o.id === org_id,
                            )?.name}
                            on:cancel={() => {
                                selected_orgs_id = selected_orgs_id.filter(
                                    (id) => id !== org_id,
                                );
                                companies_data = companies_data.filter(
                                    (company) => company.id !== org_id,
                                );
                            }}
                        />
                    {/each}
                {/if}
            </div>
        </div>

        <!--* Mobile actions -->
        <div
            class="bottom w-full flex items-center mt-10 justify-between lg:hidden lg:absolute lg:bottom-10"
        >
            <button
                on:click={handleSkip}
                class="lg:text-secondary font-medium flex items-center gap-2 flex-row-reverse"
                type="button"
            >
                <span class="">Skip This Step</span>
                <SkipForward
                    className="w-5 stroke-primary lg:stroke-secondary"
                />
            </button>
            <button
                on:click={handleNext}
                class="text-primary font-medium flex items-center gap-2"
                type="button"
            >
                {#if upload_status === "pending"}
                    <span>Processing...</span>
                {:else if upload_status === "success"}
                    <span>Success</span>
                {:else if upload_status === "failure"}
                    <span>Failed</span>
                {:else}
                    <span>Next</span>
                {/if}
                <Arrow className="w-4 rotate-180" />
            </button>
        </div>
    </section>
</figure>
