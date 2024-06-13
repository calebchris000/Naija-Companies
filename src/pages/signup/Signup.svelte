<script lang="ts">
  import Input from "@src/components/Input/Index.svelte";
  import man_on_pc from "@src/assets/signup/man_on_pc.png";
  import user from "@src/assets/user.png";
  import email from "@src/assets/email.png";
  import padlock from "@src/assets/padlock.png";
  import Arrow from "@src/assets/svg/Arrow.svelte";
  import { Notification } from "@src/utils/notification";

  let inputValues: Map<string, string> = new Map();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  let isSigningUp = false;

  function handleSignup() {
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

    isSigningUp = true;

    const to_object = Object.fromEntries(inputValues);
    const [firstName, lastName] = fullName?.split(" ");
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
      on:click={!isSigningUp ? handleSignup : () => {}}
      style="background-color: {isSigningUp ? '#6b7280' : '#ea580c'}"
      class="p-4 w-full block rounded-xl bg-orange-600 font-medium mt-5 text-white"
      type="button">{isSigningUp ? "Creating Account" : "Sign Up"}</button
    >
    <span class="text-sm text-center"
      >Already have an account? <a
        class="font-medium text-orange-600"
        href="/login">Login</a
      ></span
    >
  </div>
</section>
