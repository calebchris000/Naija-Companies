<script lang="ts">
  import Input from "@src/components/Input/Index.svelte";
  import man_on_pc from "@src/assets/signup/man_on_pc.png";
  import user from "@src/assets/user.png";
  import email from "@src/assets/email.png";
  import padlock from "@src/assets/padlock.png";
  import Arrow from "@src/assets/svg/Arrow.svelte";
  import { Notification } from "@src/utils/notification";
  import { createEventDispatcher } from "svelte";
  import { Signup } from "@src/core/api/auth";
  const dispatcher = createEventDispatcher();

  $: signup_status = "not_signed_up";

  let inputValues: Map<string, string> = new Map();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  let isSigningUp = false;

  async function handleSignup() {
    const notification = new Notification();
    const fullName = inputValues.get("Full Name");

    const isTwoNames = inputValues.get("Full Name")?.split(" ");

    if (!fullName) {
      notification.error({ title: "", text: "Provide a name" });
      return;
    }
    if (isTwoNames && isTwoNames?.length <= 1) {
      notification.error({ title: "", text: "Include your last name" });
      return;
    }
    const email = inputValues.get("Email");
    if (!email || !emailRegex.test(email)) {
      notification.error({ text: "Email address is required" });
      return;
    }
    const password = inputValues.get("Password");
    const confirm_password = inputValues.get("Confirm Password");
    if (!password || !confirm_password) {
      notification.error({ text: "Fill out all password fields" });
      return;
    }
    if (password !== confirm_password) {
      notification.error({ text: "Ensure that the passwords match" });
      return;
    }
    if (password.length < 6) {
      notification.error({ text: "Include 6 or more unique characters" });
      return;
    }
    signup_status = "pending";

    // const to_object = Object.fromEntries(inputValues);
    const [firstName, lastName] = fullName?.split(" ");
    console.log("logger");

    try {
      const response = await Signup({ firstName, lastName, email, password });
      if (response.status !== 201) {
        signup_status = "failure";
        notification.error({
          text: response.data.message ?? "Could not connect to server",
        });
        return;
      }
      const { id } = response.data.data as any;
      localStorage.setItem("userId", id);
      console.log(response.data);
      signup_status = "success";
      dispatcher("signup_success");
    } catch (error) {
      signup_status = "failure";
      notification.error({ text: String(error) ?? "Something went wrong" });
    }
  }

  $: {
    if (signup_status === "failure") {
      setTimeout(() => {
        signup_status = "not_signed_up";
      }, 2000);
    }
  }
</script>

<section class="space-y-8">
  <div class="flex items-center gap-6 mx-4 mt-10">
    <button type="button">
      <Arrow className="w-5" />
    </button>
    <span class="text-2xl font-semibold">Create a new account</span>
  </div>
  <div class="px-6 py-5 mx-4 flex flex-col gap-4 bg-orange-50 rounded-[1.6rem]">
    <img class="w-[50%] mx-auto rounded-3xl" src={man_on_pc} alt="" />
    <Input
      on:input={(data) => {
        const { label, value } = data.detail;
        inputValues.set(label, value);
      }}
      type="text"
      placeholder="Full Name"
      label="Full Name"
      icon={user}
    />
    <Input
      on:input={(data) => {
        const { label, value } = data.detail;
        inputValues.set(label, value);
      }}
      type="email"
      icon_class="w-4"
      placeholder="Email"
      label="Email"
      icon={email}
    />
    <Input
      on:input={(data) => {
        const { label, value } = data.detail;
        inputValues.set(label, value);
      }}
      type="password"
      placeholder="Password"
      label="Password"
      icon={padlock}
    />
    <Input
      on:input={(data) => {
        const { label, value } = data.detail;
        inputValues.set(label, value);
      }}
      type="password"
      placeholder="Confirm Password"
      label="Confirm Password"
      icon={padlock}
    />
    <button
      on:click={signup_status === "not_signed_up" ? handleSignup : () => {}}
      style="background-color: {signup_status === 'pending'
        ? '#6b7280'
        : signup_status === 'success'
          ? '#22c55e'
          : signup_status === 'failure'
            ? '#ef4444'
            : '#ea580c'}"
      class="p-4 w-full block transition-all rounded-xl bg-orange-600 font-medium mt-5 text-white"
      type="button"
      >{signup_status === "pending"
        ? "Creating Account"
        : signup_status === "success"
          ? "Sign Up Successful!"
          : signup_status === "failure"
            ? "Signup Failed"
            : "Sign Up"}</button
    >
    <span class="text-sm text-center"
      >Already have an account? <a
        class="font-medium text-orange-600"
        href="/login">Login</a
      ></span
    >
  </div>
</section>
