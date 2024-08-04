<script lang="ts">
    import Cancel from "@src/assets/svg/cancel.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let index = 0;
    export let company_name = "";
    export let roles = [
        "Backend Developer",
        "Frontend Developer",
        "Full Stack Developer",
        "UI/UX Designer",
    ];
    $: file_name = "";

    let doc_file_input: HTMLInputElement | null;

    function handleFileInput(e: Event & { target: HTMLInputElement }) {
        if (!e.target || !e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            if (fileExtension !== "pdf" && fileExtension !== "docx") {
                alert("Please upload a PDF or DOCX file only.");
                e.target.value = ""; // Clear the file input
            }
            console.log("Document name:", file.name);
            file_name = file.name;
            // Get the document and process it
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const base64 = event.target.result as string;
                    console.log("Base64 encoded file:", base64);
                    // You can now use the base64 string as needed
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function handleRemove() {
        dispatch("cancel");
    }
    function handleAddRole() {}
</script>

<figure class="flex flex-col gap-4 h-fit">
    <section class="flex gap-10 items-center border-b pb-4 one">
        <span class="text-cto text-2xl font-semibold">{index}.</span>
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
                class="flex items-center flex-wrap lg:col-span-10 gap-4 gap-y-1"
            >
                {#each roles as role, index}
                    <span class="text-lg">{role}</span>
                    {#if roles.length - 1 !== index}
                        <span class="w-2 h-2 bg-secondary rounded-full"></span>
                    {/if}
                {/each}
                <button
                    type="button"
                    on:click={handleAddRole}
                    class="lg:w-6 lg:h-6 w-8 mt-4 lg:m-0 h-8 bg-secondary rounded-full relative text-primary"
                >
                    <span
                        class="absolute top-[54%] left-[52%] -translate-x-[50%] -translate-y-[50%]"
                        >+</span
                    >
                </button>
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
                        class="lg:bg-secondary lg:text-primary outline-none text-secondary font-medium w-full p-3 px-4 rounded-md"
                        type="date"
                    />
                </div>
                <div class="flex flex-col w-full gap-2 lg:gap-0">
                    <span>End</span>
                    <input
                        class="lg:bg-secondary lg:text-primary outline-none text-secondary font-medium w-full p-3 px-4 rounded-md"
                        type="date"
                    />
                </div>
            </div>
            <div class="worked-here flex items-center gap-4">
                <input class="scale-150" type="checkbox" />
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
                <input name="location" class="scale-150" type="radio" checked />
                <span>Remote</span>
            </div>
            <div class="flex items-center gap-4">
                <input name="location" class="scale-150" type="radio" />
                <span>On Site</span>
            </div>
            <div class="flex items-center gap-4">
                <input name="location" class="scale-150" type="radio" />
                <span>Hybrid</span>
            </div>
        </div>
    </section>
    <section
        class="four text-secondary w-full relative lg:grid lg:grid-cols-1 flex flex-col gap-4 pb-4 border-b"
    >
        <span class="proof font-medium col-span-6 w-fit relative">
            PROOF OF EMPLOYMENT:
        </span>

        <div class="flex flex-col lg:flex-row lg:items-center lg:gap-10">
            <button
                on:click={() => {
                    doc_file_input?.click();
                }}
                class="lg:bg-primary w-full bg-white text-nowrap border border-secondary border-dashed text-secondary lg:p-3 p-4 px-10 rounded-lg"
                type="button">Choose from disk.</button
            >
            <div class="flex items-center gap-2">
                {#if file_name}
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
                        }}
                    >
                        <Cancel className="w-3 text-red-500" />
                    </button>
                {/if}
            </div>
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
