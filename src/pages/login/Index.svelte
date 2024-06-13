<script lang="ts">
  import Input from "@src/components/Input/Index.svelte";
  import man_on_pc from "@src/assets/signup/man_on_pc.png";
  import user from "@src/assets/user.png";
  import email from "@src/assets/email.png";
  import padlock from "@src/assets/padlock.png";
  import Arrow from "@src/assets/svg/Arrow.svelte";
</script>

<section class="space-y-8">
  <div class="flex items-center gap-6 mx-4 mt-10">
    <button type="button">
      <Arrow className="w-5" />
    </button>
    <span class="text-2xl font-semibold">Sign in your account</span>
  </div>
  <div class="px-6 py-5 mx-4 flex flex-col gap-4 bg-orange-50 rounded-[1.6rem]">
    <img class="w-[50%] mx-auto rounded-3xl" src={man_on_pc} alt="" />
    <Input type="text" placeholder="Username or Email" label="Username or Email" icon={user} />
    <Input
      type="password"
      placeholder="Password"
      label="Password"
      icon={padlock}
      icon_class="w-4"
    />

    <button
      class="p-4 w-full block rounded-xl bg-orange-600 font-medium mt-5 text-white"
      type="button">Sign in</button
    >
    <span class="text-sm text-center"
      >Don't have an account? <a
        class="font-medium text-orange-600"
        href="/signup">Sign up</a
      ></span
    >
  </div>
</section>
