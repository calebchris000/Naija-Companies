<script lang="ts">
  import Input from "@src/components/Input/Index.svelte";
  import user from "@src/assets/user.png"
</script>

<section>
  <img src="" alt="" />

  <div class="mt-10 px-6 py-10 mx-4 space-y-4 bg-orange-200 rounded-md">
    <Input type="text" placeholder="First Name" label="First Name" icon={user} />
    <Input type="text" placeholder="Last Name" label="First Name" icon={user} />
    <Input type="text" placeholder="Email" label="First Name" icon={user} />
  </div>
</section>
