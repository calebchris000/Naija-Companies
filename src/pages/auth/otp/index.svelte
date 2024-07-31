<script lang="ts">
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import Navbar from "@src/components/navbar/navbar.svelte";
    import check_otp from "@src/assets/animated/check_otp.gif";
    import { onMount } from "svelte";
    import { VerifyOtp } from "@src/core/api/auth";
    import { LocalStorage } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    import { navigate } from "svelte-routing";

    const input_ids = [1, 2, 3, 4, 5, 6];
    const notification = new Notification();
    const local_storage = new LocalStorage();

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

    async function handleSubmit() {
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
        //* Sending the otp
        const userId = local_storage.getItem("user", false)?.id;
        const response = await VerifyOtp({ otp: join_otp, userId });
        if (response.status !== 200) {
            otp_message = response.data.message as string;
            document.querySelectorAll(".otp").forEach((el: any) => {
                el.value = "";
                el.disabled = false;
                if (el.id === "input1") {
                    el.focus();
                }
            });

            return;
        }
        notification.success({ text: "Email successfully verified!" });
        local_storage.setItem("step", "/signup/find-companies");

        setTimeout(() => {
            navigate("/signup/find-companies");
        }, 2000);
    }

    $: {
        if (otp_message) {
            setTimeout(() => {
                otp_message = "";
            }, 3000);
        }
    }

    onMount(() => {
        const current_step = local_storage.getItem("step", true);
        if (!current_step) {
            local_storage.setItem("step", "/signup");
            navigate("/signup");
        } else if (current_step !== "/signup/verify-otp") {
            navigate(current_step);
        }
        const firstInput = document.getElementById("input1")?.focus();
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Backspace") {
                focusPrev(event);
            }
        });
    });
</script>

<figure class="h-screen bg-primary max-w-[120rem]">
    <Navbar disabled={true} className="top-[0!important]" />
    <section
        class="lg:rounded-xl lg:shadow-md lg:grid lg:grid-cols-12 lg:p-10 p-4 text-secondary lg:bg-light lg:w-[80vw] lg:max-h-[70vh] lg:absolute lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%]"
    >
        <div class="flex flex-col gap-4 lg:col-span-6">
            <span class="text-3xl font-medium">Verify Email Address</span>
            <div class="flex flex-col text-sm gap-2 lg:gap-0">
                <span
                    >Enter the 6-digit code sent to calebchris000@gmail.com</span
                >
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
            <div class="flex items-center justify-between mt-auto">
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
        </div>
        <div class="lg:col-span-6 ms-auto hidden lg:block">
            <img src={check_otp} alt="OTP Check" class="w-[20rem] mx-auto" />
        </div>
    </section>
</figure>
