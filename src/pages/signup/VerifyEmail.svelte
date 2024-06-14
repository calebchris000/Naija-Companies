<script lang="ts">
  import Input from "@src/components/Input/Index.svelte";
  import otp from "@src/assets/signup/otp.png";
  import man_otp from "@src/assets/svg/man_otp.svg";
  import Arrow from "@src/assets/svg/Arrow.svelte";
  import { Notification } from "@src/utils/notification";
  import { createEventDispatcher } from "svelte";
  const dispatcher = createEventDispatcher();

  $: verify_status = "not_signed_up";

  let inputValues: Map<string, string> = new Map();

  function handleVerify() {
    const notification = new Notification();

    const OTP = inputValues.get("OTP");
    if (!OTP) {
      notification.error({
        text: "Provide the OTP sent to your email address",
      });
      return;
    }
    if (OTP.length < 6) {
      notification.error({ text: "OTP should contain 6 numbers" });
      return;
    }
    verify_status = "pending";
  }

  $: {
    if (verify_status === "pending") {
      setTimeout(() => {
        verify_status = "success";
      }, 2000);
    } else if (verify_status === "success") {
      setTimeout(() => {
        dispatcher("signup_success");
      }, 2000);
    }
  }
</script>

<section class="space-y-8">
  <div class="flex items-center gap-6 mx-4 mt-10">
    <button type="button">
      <Arrow className="w-5" />
    </button>
    <span class="text-2xl font-semibold">Verify Email Address</span>
  </div>
  <div class="px-6 py-5 mx-4 flex flex-col gap-4 bg-orange-50 rounded-[1.6rem]">
    <img class="w-[70%] mx-auto mb-5 rounded-3xl" src={man_otp} alt="" />
    <Input
      on:input={(data) => {
        const { label, value } = data.detail;
        inputValues.set(label, value);
      }}
      type="number"
      placeholder="OTP"
      label="OTP"
      icon={otp}
    />

    <button
      on:click={verify_status === "not_signed_up" ? handleVerify : () => {}}
      style="background-color: {verify_status === 'pending'
        ? '#6b7280'
        : verify_status === 'success'
          ? '#22c55e'
          : verify_status === 'failure'
            ? '#ef4444'
            : '#ea580c'}"
      class="p-4 w-full block transition-all rounded-xl bg-orange-600 font-medium mt-5 text-white"
      type="button"
      >{verify_status === "pending"
        ? "Verifying Account"
        : verify_status === "success"
          ? "Verify Successful!"
          : verify_status === "failed"
            ? "Verification Failed"
            : "Verify Account"}</button
    >
    <span class="text-sm text-center"
      >Already have an account? <a
        class="font-medium text-orange-600"
        href="/login">Login</a
      ></span
    >
  </div>
</section>
