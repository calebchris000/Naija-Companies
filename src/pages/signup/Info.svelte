<script lang="ts">
  import user_privacy from "@src/assets/user_privacy.png";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleContinue() {
    dispatch("click", {});
  }
</script>

<section class="p-4 flex flex-col mt-20 gap-4 items-center xl:w-[30vw] xl:mx-auto xl:mt-20">
  <img
    class="rounded-xl w-[16rem]"
    src={user_privacy}
    alt="person holding an armour"
  />
  <span class="text-3xl font-bold">Before You Start</span>
  <span class="text-gray-400 text-center"
    >To protect your privacy, we recommend using a pseudonym if you intend to review a company you're associated with. This will prevent any potential risk to your employment.</span
  >
  <button
    on:click={handleContinue}
    class="bg-orange-600 mt-4 font-semibold text-xl p-4 rounded-xl text-white w-[calc(100vw-30%)] block xl:w-full"
    type="button">I Understand</button
  >
</section>
