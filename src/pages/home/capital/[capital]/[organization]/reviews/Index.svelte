<script lang="ts">
  import edit from "@src/assets/svg/edit.svg";
  import Review from "@src/components/review/Review.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/Index.svelte";
  import { Notification } from "@src/utils/notification";
  import moment from "moment";
  import {
    useLocalStorage,
    useToken,
    useUserData,
  } from "@src/core/utils/utils";
  import { store } from "@src/lib/store";
  import month from "@src/assets/svg/month.svg";
  import calendar from "@src/assets/svg/calendar.svg";
  import { AddReview, GetReviews } from "@src/core/api/review";
  import CompanyDetail from "@src/components/CompanyDetail/CompanyDetail.svelte";
  import { getStarColor } from "@src/core/logic/getStarRating";
  import Select from "@src/components/Input/Select.svelte";
  import { getYears } from "@src/core/logic/getYears";
  import { months } from "@src/lib/months";
  import { onMount } from "svelte";
  import Building from "@src/assets/svg/Building.svelte";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import { navigate } from "svelte-routing";

  const user = useUserData();
  const token = useToken();
  $: reviews = [] as any[];
  $: reactions = [];
  $: review_status = "not_reviewed";
  $: filter_reviews = reviews;
  $: filter_by = { year: "", month: "" };

  function saveItem() {
    const saveEditor = new CustomEvent("onSaveEditor");
    document.dispatchEvent(saveEditor);
  }
  const years = getYears({ from: 2024, till: 1900 }).map((y) => ({
    id: Math.random() * 10,
    name: y,
  }));

  async function getReviews() {
    const notification = new Notification();
    const organization = useLocalStorage({
      key: "selected_organization",
      isString: false,
    });
    const response = await GetReviews({
      token,
      organizationId: organization?.id as string,
    });

    if (response.status !== 200) {
      notification.error({
        text: response.data?.message ?? "Could not get reviews",
      });
      return;
    }
    reviews = response.data?.data as any[];
  }

  function handleSort() {
    console.log(filter_by);

    let sorted_review = reviews;

    if (filter_by.year && filter_by.month) {
      sorted_review = reviews.filter((r) => {
        const r_year = moment(r.createdAt).year();
        const r_month = moment(r.createdAt).format("MMMM");

        return filter_by.year === r_year && filter_by.month === r_month;
      });
    } else {
      if (filter_by.year) {
        sorted_review = reviews.filter((r) => {
          const date = moment(r.createdAt).year();
          return date === filter_by.year;
        });
      }

      if (filter_by.month) {
        sorted_review = reviews.filter((r) => {
          const date = moment(r.createdAt).format("MMMM");
          return date === filter_by.month;
        });
      }
    }
    filter_reviews = sorted_review;
  }

  onMount(() => {
    getReviews();
  });
</script>

<section class="pt-20">
  <Navbar>
    <button
      on:click={() => {
        const { href } = window.location;
        const _href =
          href[href.length - 1] === "/" ? href.slice(0, -2) : href.slice(0, -1);
        navigate(_href);
      }}
      class="text-orange-500 w-full justify-center p-1 transition-all flex items-center gap-2"
      type="button"
    >
      <span class="text-sm">Write a review</span>
      <Pencil className="w-3" />
    </button>
  </Navbar>
  <div class="py-4">
    <Action custom_path="/home" title="" />
  </div>

  <div class="px-4 flex flex-col gap-4">
    <CompanyDetail
      organization_name="Gurugeeks LTD"
      organization_review={2}
      organization_website="https://www.gurugeeks.com"
      organization_description="Gurugeeks develops cloud-based HRM software for mid-sized businesses. Their user-friendly platform streamlines hiring, onboarding, performance reviews, and payroll processes. Founded by HR veterans, PeopleFlow aims to simplify workforce management, boost employee engagement, and drive productivity."
      organization_logo="https://i.ibb.co/85czqJQ/Gemini-Generated-Image-rx2vc3rx2vc3rx2v.jpg"
    />
    <div class="py-5 flex items-center justify-between gap-8">
      <Select
        on:item_click={(e) => {
          filter_by.year = e.detail.name;
          handleSort();
        }}
        list={years}
        defaultValue={years[0].name}
        placeholder="Year"
        className="w-full"
        icon={calendar}
      />
      <Select
        on:item_click={(e) => {
          filter_by.month = e.detail.name;
          handleSort();
        }}
        list={months}
        defaultValue={moment().format("MMMM")}
        placeholder="Month"
        className="w-full"
        icon={month}
      />
    </div>
    <div class="flex flex-col gap-4">
      {#each filter_reviews as { fullName, star, quickReactionView, content }}
        <Review
          reactions={quickReactionView}
          user_alias={fullName}
          user_rating={star}
          user_review={content}
        />
      {/each}
    </div>
  </div>
</section>

<svelte:head>
  <title>Gurugeeks LTD Reviews</title>
</svelte:head>
