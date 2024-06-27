<script lang="ts">
  import { Timer } from "@src/utils/timer";
  import { ResendOtp } from "@src/core/api/auth";
  import Input from "@src/components/Input/Index.svelte";
  import otp from "@src/assets/signup/otp.png";
  import man_otp from "@src/assets/svg/man_otp.svg";
  import Arrow from "@src/assets/svg/Arrow.svelte";
  import { Notification } from "@src/utils/notification";
  import { createEventDispatcher } from "svelte";
  import { VerifyOtp } from "@src/core/api/auth";
  import { navigate } from "svelte-routing";
  import { useUserData } from "@src/core/utils/utils";
  const dispatcher = createEventDispatcher();

  $: verify_status = "not_verified";

  let inputValues: Map<string, string> = new Map();

  async function handleVerify() {
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

    try {
      const userId = useUserData().id;
      const response = await VerifyOtp({ otp: OTP, userId });
      console.log(response.data);
      if (response.data && response.data.statusCode === 3) {
        notification.error({
          text: "OTP has expired. Click on 'Resend' to generate a new code",
        });
      }

      if (response.status !== 200) {
        verify_status = "failure";
        const { message } = response.data;
        notification.error({
          text:
            message ??
            "Verification failed. Click on 'Resend' to generate a new OTP",
        });
        return;
      }
      const { token, ...user } = response.data.data as any;
      verify_status = "success";
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error: any) {
      console.log(error.response);
      verify_status = "failure";
      if (error?.response) {
        notification.error({
          text:
            String(error.response?.data?.message) ??
            "Could not connect to server",
        });
      } else {
        notification.error({
          text: String(error) ?? "Could not connect to server",
        });
      }
    }
  }

  $: {
    if (verify_status === "success" || verify_status === "failure") {
      setTimeout(() => {
        verify_status = "not_verified";
      }, 2000);
    }
  }

  $: time = { minute: "00", seconds: "00", total_seconds: 0 } as {
    minute: string;
    seconds: string;
    total_seconds?: number;
  };
  const timer = new Timer(0, (d) => {
    time = d;
  });

  async function handleResend() {
    timer.start();
    const notification = new Notification();
    const user = useUserData();
    if (!user) return;
    try {
      const response = await ResendOtp({ userId: user.id });

      if (response.status !== 200) {
        notification.error({
          text: "Could not generate OTP. Try again in an hour",
        });
        return;
      }
      timer.start();
      notification.success({ text: "OTP is generated. Check your inbox" });
    } catch (error: any) {
      if (error.response) {
        notification.error({ text: error.response?.data?.message });
        return;
      }
      notification.error({ text: String(error) });
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

    {#if time.total_seconds !== 0}
      <div class="font-medium text-center text-sm">
        {time.minute}:{time.seconds} remaining
      </div>
    {/if}

    <button
      on:click={verify_status === "not_verified" ? handleVerify : () => {}}
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
          : verify_status === "failure"
            ? "Verification Failed"
            : "Verify Account"}</button
    >
    <span class="text-sm text-center"
      >Can't find OTP? <button
        on:click={handleResend}
        type="button"
        class="font-medium text-orange-600">Resend</button
      ></span
    >
  </div>
</section>
