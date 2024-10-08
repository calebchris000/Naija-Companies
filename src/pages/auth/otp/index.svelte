<script lang="ts">
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import Navbar from "@src/components/navbar/navbar.svelte";
    import check_otp from "@src/assets/animated/check_otp.gif";
    import { onMount } from "svelte";
    import { ResendOtp, VerifyOtp } from "@src/core/api/auth";
    import { LocalStorage } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    import { navigate } from "svelte-routing";

    const input_ids = [1, 2, 3, 4, 5, 6];
    const notification = new Notification();
    const local_storage = new LocalStorage();
    let submit_button: HTMLButtonElement;

    $: otp_numbers = new Array(6).fill(null);
    $: otp_message = "";
    $: otp_status = "inactive" as
        | "inactive"
        | "pending"
        | "success"
        | "failure";

    function focusNext(id: number) {
        const activeElement = document.activeElement as HTMLInputElement;
        otp_numbers[id - 1] = activeElement.value;
        if (id !== 6) {
            let next_element = document.getElementById(`input${id + 1}`);

            next_element?.focus();
        }
    }

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

    async function handleSubmit(e: any) {
        e.preventDefault();

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
        otp_status = "pending";
        submit_button.disabled = true;
        //* Sending the otp
        const userId = local_storage.getItem("user", false)?.id;
        const response = await VerifyOtp({ otp: join_otp, userId });
        if (response.status !== 200) {
            otp_status = "failure";
            otp_message = response.data.message as string;
            document.querySelectorAll(".otp").forEach((el: any) => {
                el.value = "";
                el.disabled = false;
                if (el.id === "input1") {
                    el.focus();
                }
            });
            otp_numbers = new Array(6).fill(null);
            return;
        }
        notification.success({ text: "Email successfully verified!" });
        local_storage.setItem("step", "/signup/find-companies");
        local_storage.setItem("token", response.data.data?.token);

        setTimeout(() => {
            window.location.href = "/signup/find-companies";
        }, 2000);
    }

    async function handleTryAgain() {
        const user = local_storage.getItem("user", false);

        const response = await ResendOtp({ userId: user?.id });
        if (response.status !== 200) {
            notification.error({
                text:
                    response.data?.message ?? "Could not get token. Try again",
            });
        } else {
            notification.success({
                text: "New OTP has been sent to your email.",
            });
        }
    }

    $: {
        if (otp_message || otp_status === "failure") {
            setTimeout(() => {
                otp_message = "";
                submit_button.disabled = false;
                otp_status = "inactive";
            }, 3000);
        }
    }

    onMount(() => {
        const current_step = local_storage.getItem("step", true);
        const user = local_storage.getItem("user", false);
        if (!current_step || !user?.id) {
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

<figure class="h-screen bg-secondary max-w-[120rem]">
    <Navbar disabled={true} className="top-[0!important]" />
    <section
        class="pt-12 text-primary lg:rounded-2xl lg:bg-primary lg:grid lg:grid-cols-12 lg:p-10 p-4 lg:text-secondary lg:bg-light lg:w-[80vw] lg:max-h-[70vh] lg:absolute lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%]"
    >
        <div
            class="flex flex-col text-primary lg:text-secondary gap-4 lg:col-span-6"
        >
            <span class="text-3xl font-medium">Verify Email Address</span>
            <div class="flex flex-col text-sm gap-2 lg:gap-0">
                <span
                    >Enter the 6-digit code sent to calebchris000@gmail.com</span
                >
                <span
                    >Didn’t receive the code? <button
                        type="button"
                        on:click={handleTryAgain}
                        class="cursor-pointer text-sm font-medium underline hover:text-cto"
                        >Try Again</button
                    ></span
                >
            </div>

            <div class="grid grid-cols-6 gap-4">
                {#each input_ids as id}
                    <input
                        id="input{id}"
                        class="w-full otp caret-transparent max-w-[80px] mx-auto h-12 lg:h-20 rounded-lg lg:rounded-xl outline-none bg-primary text-secondary lg:bg-secondary lg:text-black lg:bg-skyblue lg:text-light text-center text-xl lg:text-3xl font-bold"
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
                    class="border border-primary text-primary p-2 px-4 rounded-lg flex items-center gap-2"
                    type="button"
                >
                    <Arrow className="w-3" />
                    <span>Back</span>
                </button>
                <button
                    style="background: {otp_status === 'pending'
                        ? 'gray'
                        : otp_status === 'failure'
                          ? 'red'
                          : ''}"
                    bind:this={submit_button}
                    on:click={handleSubmit}
                    class="bg-primary transition-all submit text-secondary font-medium p-2 px-4 rounded-lg"
                    type="button"
                    >{otp_status === "pending"
                        ? "Checking..."
                        : otp_status === "failure"
                          ? "Verification Failed!"
                          : "Confirm"}</button
                >
            </div>
        </div>
        <div class="lg:col-span-6 ms-auto hidden lg:block">
            <img src={check_otp} alt="OTP Check" class="w-[20rem] mx-auto" />
        </div>
    </section>
</figure>
