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
      <Arrow className="w-5"/>
    </button>
    <span class="text-2xl font-semibold">Create a new account</span>
  </div>
  <div
    class="px-6 py-5 mx-4 flex flex-col gap-4 bg-orange-50 rounded-[1.6rem]"
  >
    <img class="w-[50%] mx-auto rounded-3xl" src={man_on_pc} alt="" />
    <Input type="text" placeholder="Full Name" label="Full Name" icon={user} />
    <Input
      type="text"
      icon_class="w-4"
      placeholder="Email"
      label="Email"
      icon={email}
    />
    <Input
      type="password"
      placeholder="Password"
      label="Password"
      icon={padlock}
      icon_class="w-4"
    />
    <Input
      type="password"
      placeholder="Confirm Password"
      label="Confirm Password"
      icon_class="w-4"
      icon={padlock}
    />
    <button
      class="p-4 w-full block rounded-xl bg-orange-600 font-medium mt-5 text-white"
      type="button">Sign Up</button
    >
    <span class="text-sm text-center"
      >Already have an account? <a
        class="font-medium text-orange-600"
        href="/login">Login</a
      ></span
    >
  </div>
</section>
