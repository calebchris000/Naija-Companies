<script lang="ts">
  import { GetTime } from "@src/core/api/time";
  import { Notification } from "@src/utils/notification";
  import moment from "moment";
  import { onMount } from "svelte";

  $: time = moment().format("HH:mm A");
  $: date = moment().format("dddd, Do MMMM, YYYY");

  async function getTime() {
    const res = await GetTime();

    const datetime = moment(res.data?.datetime);

    time = moment(datetime).format("HH:mm A");
    date = moment(datetime).format("dddd, Do MMMM, YYYY");
    startInterval();
  }

  function startInterval() {
    const id = setInterval(() => {
    //   getTime();
    }, 10000);
       
    return () => clearInterval(id);
  }

  onMount(() => {
    // getTime();
  });
</script>

<div class="w-full h-full p-6 flex items-center justify-center">
  {#if !time}
    <span class="text-[3rem]">LOADING TIME</span>
  {:else}
    <div class="flex flex-col gap-1">
      <span class="text-[4.4rem] font-medium">{time}</span>
      <span class="text-[1.6rem] font-medium">{date}</span>
    </div>
  {/if}
</div>
