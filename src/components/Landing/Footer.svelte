<script lang="ts">
  import logo from "@src/assets/svg/logo_white.svg";
  import Instagram from "@src/assets/svg/instagram.svelte";
  import Twitterx from "@src/assets/svg/twitterx.svelte";
  import type { SvelteComponent } from "svelte";
  import { Link } from "svelte-routing";

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
      <span class="text-sm font-normal xl:font-medium xl:text-xl">Send us an email</span>
    </div>
    <div class="w-full flex flex-col gap-4">
      <input
        class="bg-white outline-none font-normal text-sm p-4"
        placeholder="Your email address"
        type="email"
        required
      />
      <textarea
        class="bg-white outline-none font-normal text-sm p-4 h-[30vh]"
        placeholder="Your message"
        name="message"
        id=""
      ></textarea>
    </div>
    <button
      class="bg-orange-600 p-4 rounded-md font-semibold text-white"
      type="button">Send Message</button
    >
  </div>
  <div class="w-full xl:row-span-11 relative xl:bg-gray-900 p-4 xl:p-20 text-white flex flex-col gap-20">
    <div class="w-32">
      <img class="w-full" src={logo} alt="" />
    </div>

    <div class="flex items-start gap-4 xl:justify-center max-md:justify-between max-md:flex-wrap xl:gap-44">
      <div class="flex flex-col gap-6">
        <span class="font-semibold text-xl xl:text-2xl">Company</span>
        <span class="flex flex-col gap-6 xl:text-xl">
          <Link to="">Home</Link>
          <Link to="">FAQ</Link>
          <Link to="">Blog</Link>
          <Link to="">Career</Link>
        </span>
      </div>
      <div class="flex flex-col gap-6">
        <span class="font-semibold text-xl xl:text-2xl">Legal</span>
        <span class="flex flex-col gap-6 xl:text-xl">
          <Link to="">Terms of use</Link>
          <Link to="">Privacy</Link>
          <Link to="">Cookie</Link>
        </span>
      </div>
      <div class="flex flex-col gap-6">
        <span class="font-semibold text-xl xl:text-2xl">Social</span>
        <span class="flex flex-col gap-6 xl:text-xl">
          <Link to="">LinkedIn</Link>
          <Link to="">Twitter</Link>
          <Link to="">Facebook</Link>
          <Link to="">Instagram</Link>
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
