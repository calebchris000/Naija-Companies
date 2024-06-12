<script lang="ts">
  import user_privacy from "@src/assets/user_privacy.png";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleContinue() {
    dispatch("click", {});
  }
</script>

<section class="p-4 flex flex-col gap-4 items-center">
  <img
    class="rounded-xl w-[16rem]"
    src={user_privacy}
    alt="person holding an armour"
  />
  <span class="text-3xl font-bold">Text To Replace</span>
  <span class="text-gray-400 text-center"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quas
    veritatis fugit sed nemo eius ipsa commodi doloremque illum explicabo?
    Tempora ipsum nesciunt rerum aliquam obcaecati nisi ut. Assumenda, fugiat.</span
  >
  <button
    on:click={handleContinue}
    class="bg-orange-600 mt-4 font-semibold text-xl p-4 rounded-xl text-white w-[calc(100vw-30%)] block"
    type="button">Continue</button
  >
</section>
