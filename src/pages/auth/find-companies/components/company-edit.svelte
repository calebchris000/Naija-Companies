<script lang="ts">
    import Cancel from "@src/assets/svg/cancel.svelte";
    import { Notification } from "@src/utils/notification";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    const notification = new Notification();

    type DataType = {
        id: number;
        selected_roles: string[];
        document_proof: string;
        tenure: { start: string; end: string; current: boolean };
        type: "remote" | "onsite" | "hybrid";
    };

    export let sn = 0;
    export let index = 0;
    export let company_name = "";
    $: data = {
        id: index,
        selected_roles: [],
        document_proof: "",
        tenure: { start: "", end: "", current: false },
        type: "remote",
    } as DataType;
    export let roles = [
        "Backend Developer",
        "Frontend Developer",
        "Full Stack Developer",
        "UI/UX Designer",
    ];

    let add_role_input: HTMLInputElement;
    $: file_name = "";
    $: role_input = "";
    $: filtered_roles = roles as string[];
    $: selected_roles = [] as string[];

    let doc_file_input: HTMLInputElement | null;

    function handleDateChange(
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
        type: "start" | "end",
    ) {
        const val = (e.target as HTMLInputElement)?.value;
        data.tenure = { ...data.tenure, [type]: val };
    }

    function handleCurrentWorked(
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) {
        const currently_worked = (e.target as HTMLInputElement).checked;
        data.tenure.current = currently_worked;
    }

    function handleWorkType(
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) {
        const value = (e.target as HTMLInputElement).id;
        data.type = value as "remote" | "onsite" | "hybrid";
    }

    function handleFileInput(e: Event & { target: HTMLInputElement }) {
        if (!e.target || !e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            if (fileExtension !== "pdf" && fileExtension !== "docx") {
                notification.error({
                    text: "Please upload a PDF or DOCX file only.",
                });
                e.target.value = "";
                return;
            }
            file_name = file.name;
            // Get the document and process it
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const base64 = event.target.result as string;
                    data.document_proof = base64;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function handleRemove() {
        dispatch("cancel");
    }
    function handleAddRole(
        e: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) {
        const val = (e.target as HTMLInputElement).value;
        role_input = val ?? "";
        filtered_roles = roles.filter(
            (role) =>
                role.toLowerCase().includes(role_input.toLowerCase()) &&
                !selected_roles.includes(role),
        );
    }

    $: {
        dispatch("update", data);
    }

    onMount(() => {
        dispatch("update", data);
    });
</script>

<figure class="flex flex-col gap-4 h-fit">
    <section class="flex gap-10 items-center border-b pb-4 one">
        <span class="text-cto text-2xl font-semibold">{sn}.</span>
        <span class="text-cto font-semibold text-2xl">{company_name}</span>
        <span class="text-red-500 text-2xl ms-auto">
            <button on:click={handleRemove} type="button">
                <Cancel className="w-4 hover:text-white transition-all" />
            </button>
        </span>
    </section>

    <section class="two text-secondary pb-4 border-b">
        <div class="flex flex-col gap-2 lg:grid lg:grid-cols-12 lg:gap-4">
            <span class="font-medium text-lg lg:col-span-2">ROLE(S):</span>
            <div
                class="flex items-center flex-wrap lg:col-span-10 gap-4 gap-y-4"
            >
                {#each selected_roles as role, index}
                    <div class="flex items-center gap-4">
                        <span class="text-lg">{role}</span>
                        <button
                            on:click={() => {
                                selected_roles = selected_roles.filter(
                                    (r) => r !== role,
                                );
                                filtered_roles = [
                                    ...roles.filter(
                                        (r) => !selected_roles.includes(r),
                                    ),
                                ];
                                data.selected_roles = selected_roles;

                                if (role_input) {
                                    role_input = "";
                                    if (add_role_input) {
                                        add_role_input.value = "";
                                    }
                                }
                            }}
                            class=" "
                            type="button"
                        >
                            <Cancel className="w-4 text-red-500" />
                        </button>
                    </div>
                {/each}

                <div class="relative w-full">
                    <input
                        class="outline-none p-3 px-4 text-primary placeholder:text-primary font-medium rounded-md w-full"
                        type="text"
                        bind:this={add_role_input}
                        on:input={handleAddRole}
                        placeholder="Add a role"
                        name=""
                        id=""
                    />

                    <div
                        style="opacity: {role_input
                            ? '1'
                            : '0'}; pointer-events: {role_input
                            ? 'auto'
                            : 'none'}"
                        class="absolute transition-all z-50 top-12 rounded-lg flex flex-col bg-secondary text-primary w-full"
                    >
                        {#if !filtered_roles.length}
                            <button
                                on:click={() => {
                                    role_input = "";
                                    if (!add_role_input) return;
                                    add_role_input.value = "";
                                }}
                                type="button"
                                class="font-medium p-4 text-start hover:bg-primary hover:text-secondary"
                                >No Roles</button
                            >
                        {:else}
                            {#each filtered_roles as role}
                                <button
                                    on:click={() => {
                                        selected_roles = [
                                            ...selected_roles,
                                            role,
                                        ];
                                        filtered_roles = filtered_roles.filter(
                                            (r) => r !== role,
                                        );
                                        role_input = "";
                                        data.selected_roles = selected_roles;
                                        if (!add_role_input) return;
                                        add_role_input.value = "";
                                    }}
                                    type="button"
                                    class="font-medium p-4 text-start hover:bg-primary hover:text-secondary"
                                    >{role}</button
                                >
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section
        class="three text-secondary flex flex-col gap-2 lg:grid lg:grid-cols-12 lg:gap-4 pb-4 border-b"
    >
        <span class="font-medium lg:col-span-2">TENURE:</span>
        <div class="space-y-4 w-full col-span-10">
            <div
                class="dates flex flex-wrap items-center gap-4 w-full justify-between"
            >
                <div class="flex flex-col w-full gap-2 lg:gap-0">
                    <span class=" flex flex-col">Start</span>
                    <input
                        on:change={(e) => handleDateChange(e, "start")}
                        class="lg:bg-secondary lg:text-primary outline-none text-secondary font-medium w-full p-3 px-4 rounded-md"
                        type="date"
                    />
                </div>
                <div class="flex flex-col w-full gap-2 lg:gap-0">
                    <span>End</span>
                    <input
                        disabled={data.tenure.current}
                        on:change={(e) => handleDateChange(e, "end")}
                        class="lg:bg-secondary lg:text-primary outline-none text-secondary font-medium w-full p-3 px-4 rounded-md"
                        type="date"
                    />
                </div>
            </div>
            <div class="worked-here flex items-center gap-4">
                <input
                    on:change={(e) => handleCurrentWorked(e)}
                    class="scale-150"
                    type="checkbox"
                />
                <span>I currently work here</span>
            </div>
        </div>
    </section>
    <section
        class="four text-secondary flex flex-col lg:grid lg:grid-cols-12 gap-4 pb-4 lg:pt-0 border-b"
    >
        <span class="font-medium lg:col-span-2">TYPE:</span>

        <div class="flex items-center lg:col-span-10 justify-between w-full">
            <div class="flex items-center gap-4">
                <input
                    on:change={(e) => {
                        handleWorkType(e);
                    }}
                    name="location"
                    id="remote"
                    class="scale-150"
                    type="radio"
                    checked
                />
                <span>Remote</span>
            </div>
            <div class="flex items-center gap-4">
                <input
                    on:change={(e) => {
                        handleWorkType(e);
                    }}
                    name="location"
                    id="onsite"
                    class="scale-150"
                    type="radio"
                />
                <span>On Site</span>
            </div>
            <div class="flex items-center gap-4">
                <input
                    on:change={(e) => {
                        handleWorkType(e);
                    }}
                    name="location"
                    id="hybrid"
                    class="scale-150"
                    type="radio"
                />
                <span>Hybrid</span>
            </div>
        </div>
    </section>
    <section
        class="four text-secondary w-full relative flex flex-col gap-4 pb-4 border-b"
    >
        <span class="proof font-medium col-span-6 w-fit relative">
            PROOF OF EMPLOYMENT:
        </span>

        <div class="flex flex-col lg:flex-row lg:items-center lg:gap-10 w-full">
            <button
                on:click={() => {
                    doc_file_input?.click();
                }}
                class="lg:bg-secondary lg:text-primary lg:text-start lg:font-medium w-full bg-white text-nowrap border border-secondary border-dashed text-secondary lg:p-3 p-4 px-10 rounded-lg"
                type="button"
                >{file_name ? "Change Selected." : "Choose from disk."}</button
            >
            {#if file_name}
                <div class="flex items-center gap-2">
                    <span class="text-sm text-nowrap font-medium text-secondary"
                        >{file_name.length > 24
                            ? file_name.slice(0, 20) + "...pdf"
                            : file_name}</span
                    >
                    <button
                        on:click={() => {
                            if (!doc_file_input) return;
                            doc_file_input.value = "";
                            file_name = "";
                            data.document_proof = "";
                        }}
                    >
                        <Cancel className="w-3 text-red-500" />
                    </button>
                </div>
            {/if}
            <input
                bind:this={doc_file_input}
                on:change={handleFileInput}
                class="hidden"
                type="file"
            />
        </div>

        <div
            class="absolute pointer-events-none opacity-0 left-52 border border-[#ff4500] rounded-md -top-50 bg-white p-4"
        >
            <div
                class="note_message transition-all flex flex-col gap-2 leading-loose text-sm"
            >
                <span
                    >Accepted documents include: <strong>offer letters</strong>,
                    <strong>employment contracts</strong>,
                    <strong>employment verification letters</strong>, or any
                    other <strong>identifiable documents</strong>.</span
                >
                <span class="text-[#ff4500] font-medium">
                    We will not save this document. All uploaded documents will
                    be immediately deleted after verification.</span
                >
            </div>
        </div>
    </section>
</figure>

<style>
    .proof::after {
        content: "*";
        position: absolute;
        transition: opacity 0.3s ease;
        animation: fadeInOut 2s;
        @apply text-red-500  text-xl cursor-pointer transition-all;
    }

    .proof:hover + div {
        opacity: 1 !important;

        pointer-events: auto;
    }
</style>
