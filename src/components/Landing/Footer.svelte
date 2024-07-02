<script lang="ts">
  import axios from "axios";
  import { emailRegex } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import logo from "@src/assets/svg/logo_white.svg";
  import Instagram from "@src/assets/svg/instagram.svelte";
  import Twitterx from "@src/assets/svg/twitterx.svelte";
  import { Link } from "svelte-routing";

  const notification = new Notification();
  let inputValues = new Map();

  let emailInput: HTMLInputElement;
  let messageInput: HTMLTextAreaElement;

  $: email_status = "not_sent" as
    | "success"
    | "failure"
    | "pending"
    | "not_sent";
  $: button_message =
    email_status === "pending"
      ? "Sending Message"
      : email_status === "success"
        ? "Message Sent!"
        : email_status === "failure"
          ? "Message Not Sent"
          : "Send Message";

  $: button_color =
    email_status === "pending"
      ? "#6b7280"
      : email_status === "success"
        ? "#22c55e"
        : email_status === "failure"
          ? "#ef4444"
          : "#ea580c";

  $: {
    if (email_status === "success" || email_status === "failure") {
      setTimeout(() => {
        email_status = "not_sent";
      }, 2000);
    }
  }

  type ContactType = {
    name: string;
    Icon: string | typeof Twitterx;
    url: string;
  };

  const contacts: ContactType[] = [
    {
      name: "Twitter",
      Icon: Twitterx,
      url: "https://twitter.com/calebchris000",
    },
    {
      name: "Instagram",
      Icon: Instagram,
      url: "https://instagram.com/calebchris000",
    },
  ];

  function handleInput({ ev, label }: { ev: any; label: string }) {
    const el: HTMLInputElement = ev.target;
    if (el) {
      inputValues.set(label, el.value);
    }
  }

  async function handleEmail() {
    if (!inputValues.has("email") || !inputValues.has("message")) {
      notification.error({ text: "Please fill out all required fields" });
      return;
    }

    const email = inputValues.get("email");
    const message = inputValues.get("message");

    if (!emailRegex.test(email)) {
      notification.error({ text: "Email address is not valid" });
      return;
    }
    email_status = "pending";

    const base_url = import.meta.env.VITE_NAIJA_COMPANIES_BASE_URL;
    const response = await axios.post(`${base_url}/sendEmail`, {
      email,
      message,
    });

    if (response.status !== 200) {
      email_status = "failure";
      notification.error({
        text: response.data?.message ?? "Failed to send message",
      });
      return;
    }
    email_status = "success";
    emailInput.value = ""
    messageInput.value = ""
    notification.success({ text: "Message sent!" });

    setTimeout(() => {
      email_status = "success";
    }, 2000);
  }
</script>

<section
  class="xl:h-[80vh] bg-black text-white flex flex-col py-16 xl:grid xl:grid-cols-2 xl:grid-rows-12 gap-10 xl:p-10 xl:py-10"
>
  <div
    class="w-full xl:row-span-11 xl:bg-gray-900 xl:p-20 p-4 text-black flex flex-col text-center gap-2"
  >
    <div
      class="flex flex-col gap-2 mb-4 font-semibold text-2xl xl:text-4xl text-white h-full"
    >
      <span class="">Having Complaints?</span>
      <span class="text-sm font-normal xl:font-medium xl:text-xl"
        >Send us an email</span
      >
    </div>
    <div class="w-full flex flex-col gap-4">
      <input
        bind:this={emailInput}
        on:input={(e) => handleInput({ ev: e, label: "email" })}
        class="bg-white outline-none font-normal text-sm p-4"
        placeholder="Your email address"
        type="email"
        required
      />
      <textarea
        bind:this={messageInput}
        on:input={(e) => handleInput({ ev: e, label: "message" })}
        class="bg-white outline-none font-normal text-sm p-4 h-[30vh]"
        placeholder="Your message"
        name="message"
        id=""
      ></textarea>
    </div>
    <button
      on:click={email_status === "not_sent" ? handleEmail : () => {}}
      style="background-color: {button_color}"
      class="p-4 rounded-md font-semibold text-white"
      type="button">{button_message}</button
    >
  </div>
  <div
    class="w-full xl:row-span-11 relative xl:bg-gray-900 p-4 xl:p-20 text-white flex flex-col gap-20"
  >
    <div class="w-32">
      <img class="w-full" src={logo} alt="" />
    </div>

    <div
      class="flex items-start gap-4 xl:justify-center max-md:justify-between max-md:flex-wrap xl:gap-44"
    >
      <div class="flex flex-col gap-6">
        <span class="font-semibold text-xl xl:text-2xl">Company</span>
        <span class="flex flex-col gap-6 xl:text-xl">
          <Link to="/home">Home</Link>
          <Link to="/home">FAQ</Link>
          <Link to="/home">Blog</Link>
          <Link to="/home">Career</Link>
        </span>
      </div>
      <div class="flex flex-col gap-6">
        <span class="font-semibold text-xl xl:text-2xl">Legal</span>
        <span class="flex flex-col gap-6 xl:text-xl">
          <Link to="/home">Terms of use</Link>
          <Link to="/home">Privacy</Link>
          <Link to="/home">Cookie</Link>
        </span>
      </div>
      <div class="flex flex-col gap-6">
        <span class="font-semibold text-xl xl:text-2xl">Social</span>
        <span class="flex flex-col gap-6 xl:text-xl">
          <Link to="/home">LinkedIn</Link>
          <Link to="/home">Twitter</Link>
          <Link to="/home">Facebook</Link>
          <Link to="/home">Instagram</Link>
        </span>
      </div>
    </div>
  </div>

  <div class="col-span-3 bg-black w-full flex items-end gap-20">
    <span> © 2024 Delta Inc. </span>
    <span class="flex items-center gap-4">
      <Link to="/home">Privacy</Link>
      <Link to="/home">Cookies</Link>
    </span>
  </div>
</section>
