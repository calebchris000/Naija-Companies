<script lang="ts">
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import Navbar from "@src/components/navbar/navbar.svelte";
    import { onMount } from "svelte";

    const input_ids = [1, 2, 3, 4, 5, 6];

    $: otp_numbers = new Array(6).fill(null);
    $: otp_message = "";

    function focusNext(id: number) {
        const activeElement = document.activeElement as HTMLInputElement;
        otp_numbers[id - 1] = activeElement.value;
        if (id !== 6) {
            let next_element = document.getElementById(`input${id + 1}`);

            next_element?.focus();
        }
    }

    $: console.log(otp_numbers);

    function focusPrev(e: Event) {
        e?.preventDefault();
        const activeElement = document.activeElement as HTMLInputElement;
        const activeId = parseInt(activeElement.id.replace("input", ""));
        otp_numbers[activeId - 1] = null;
        if (activeId === 6) {
            activeElement.value = "";
            const previousElement: any = document.getElementById(
                `input${activeId - 1}`,
            );
            previousElement?.focus();
        } else if (activeId >= 1) {
            activeElement.value = "";
            const previousElement: any = document.getElementById(
                `input${activeId - 1}`,
            );
            previousElement?.focus();
        }
    }

    function handleSubmit() {
        const filter_otp = otp_numbers.filter((number) => number);
        if (filter_otp.length < 6) {
            setTimeout(() => {
                otp_message = "";
            }, 4000);
            otp_message = "OTP numbers are not complete!";
            return;
        }
        const otp_inputs = document.querySelectorAll(".otp");
        otp_inputs.forEach((inp: any) => {
            inp.disabled = true;
        });

        const join_otp = filter_otp.join("");
        console.log(join_otp);
    }

    onMount(() => {
        const firstInput = document.getElementById("input1")?.focus();
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Backspace") {
                focusPrev(event);
            }
        });
    });
</script>

<figure class="w-full h-screen bg-primary">
    <Navbar disabled={true} className="top-[0!important]" />
    <section
        class="lg:rounded-xl lg:p-10 p-4 text-secondary flex flex-col gap-4 lg:bg-light lg:w-[50vw] lg:h-[60vh] lg:fixed lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%]"
    >
        <span class="text-3xl font-medium">Verify Email Address</span>
        <div class="flex flex-col text-sm gap-2 lg:gap-0">
            <span>Enter the 6-digit code sent to calebchris000@gmail.com</span>
            <span
                >Didn’t receive the code? <span
                    class="cursor-pointer text-sm font-medium underline hover:text-cto"
                    >Try Again</span
                ></span
            >
        </div>

        <div class="grid grid-cols-6 gap-4">
            {#each input_ids as id}
                <input
                    id="input{id}"
                    class="w-full otp caret-transparent max-w-[80px] mx-auto h-12 lg:h-20 rounded-lg lg:rounded-xl outline-none bg-light text-secondary lg:bg-skyblue lg:text-light text-center text-xl lg:text-3xl font-bold"
                    type="number"
                    maxlength="1"
                    on:input={(e) => {
                        if (
                            e.target instanceof HTMLInputElement &&
                            e.target.value.length > 1
                        ) {
                            e.target.value = e.target.value.slice(0, 1);
                        }
                        focusNext(id);
                    }}
                />
            {/each}
        </div>

        <span
            class="ms-auto -translate-y-2 transition-all text-sm text-red-500 h-4 font-semibold"
            >{otp_message}</span
        >
        <div class="flex items-center justify-between">
            <button
                class="border border-cto text-cto p-2 px-4 rounded-lg flex items-center gap-2"
                type="button"
            >
                <Arrow className="w-3" />
                <span>Back</span>
            </button>
            <button
                on:click={handleSubmit}
                class="bg-cto text-light p-2 px-4 rounded-lg"
                type="button">Confirm</button
            >
        </div>
    </section>
</figure>
