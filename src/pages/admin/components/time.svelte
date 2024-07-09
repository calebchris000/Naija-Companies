<script lang="ts">
  import { GetTime } from "@src/core/api/time";
  import { Notification } from "@src/utils/notification";
  import moment from "moment";
  import { onMount } from "svelte";

  const notification = new Notification();

  $: unix_time = 0 as number;
  $: time = "12:00 PM";
  $: date = "Monday, 12th June, 2026";

  async function getTime() {
    const res = await GetTime();

    if (res.status !== 200) {
      notification.error({ text: res.data ?? "Could not get time" });
      return;
    }

    const datetime = moment(res.data.datetime);

    unix_time = datetime.unix();

    time = moment(datetime).format("HH:mm A");
    date = moment(datetime).format("dddd, Do MMMM, YYYY");
    startInterval();
  }

  function startInterval() {
    if (!unix_time) return;
    setInterval(() => {
      getTime();
    }, 10000);
  }

  onMount(() => {
    getTime();
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
