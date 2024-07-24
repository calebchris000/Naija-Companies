<script lang="ts">
  import { reviews as rv } from "@src/lib/rating";
  import edit from "@src/assets/svg/edit.svg";
  import Review from "@src/components/review/Review.svelte";
  import Action from "@src/components/action/action.svelte";
  import Navbar from "@src/components/navbar/Index.svelte";
  import { Notification } from "@src/utils/notification";
  import moment from "moment";
  import {
    LocalStorage,
    useLocalStorage,
    useToken,
    useUserData,
  } from "@src/core/utils/utils";
  import { store } from "@src/lib/store";
  import month from "@src/assets/svg/month.svg";
  import calendar from "@src/assets/svg/calendar.svg";
  import { AddReview, GetReviews, ReactReview } from "@src/core/api/review";
  import CompanyDetail from "@src/components/CompanyDetail/CompanyDetail.svelte";
  import { getStarColor } from "@src/core/logic/getStarRating";
  import Select from "@src/components/Input/Select.svelte";
  import { getYears } from "@src/core/logic/getYears";
  import { months } from "@src/lib/months";
  import { onMount } from "svelte";
  import Building from "@src/assets/svg/Building.svelte";
  import Pencil from "@src/assets/svg/Pencil.svelte";
  import { Link, navigate } from "svelte-routing";
  import { GetOrganization } from "@src/core/api/organization";

  const user = useUserData();
  const token = useToken();
  const local_storage = new LocalStorage();
  $: reviews = [] as any[];
  $: reactions = [];
  $: organization_info = {
    name: "",
    website: "",
    city: "",
    review: 0,
    description: "",
    logoUrl: "",
  };
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

  async function getOrganization() {
    const notification = new Notification();
    const orgId = local_storage.getItem("selected_organization", false)?.id;

    const response = await GetOrganization({ token, organizationId: orgId });

    if (response.status !== 200) {
      notification.error({
        text: response.data?.message ?? "Could not get organization info",
      });
      return;
    }
    organization_info = response.data?.data;
  }

  async function getReviews() {
    const notification = new Notification();
    const organization = useLocalStorage({
      key: "selected_organization",
      isString: false,
    }) as any;
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
    let sorted_review = reviews;

    if (filter_by.year && filter_by.month) {
      sorted_review = reviews.filter((r) => {
        const r_year = moment(r.createdAt).year();
        const r_month = moment(r.createdAt).format("MMMM");

        return Number(filter_by.year) === r_year && filter_by.month === r_month;
      });
    } else {
      if (filter_by.year) {
        sorted_review = reviews.filter((r) => {
          const date = moment(r.createdAt).year();
          return date === Number(filter_by.year);
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

  async function handleReaction(d: {
    id: string;
    reaction: "no_reaction" | "liked" | "disliked";
  }) {
    const notification = new Notification();
    const response = await ReactReview({
      token,
      data: { reviewId: d.id, reaction: d.reaction },
    });

    const status = [200, 201];

    if (!status.includes(response.status)) {
      notification.error({
        text: response.data?.message ?? "Could not react to review. Try again",
      });
      return;
    }

    console.log("Successfully add reaction");
    getReviews();
  }

  function handleAddReview() {
    const { href } = window.location;
    const _href = href[href.length - 1] === "/" ?href.slice(0, -1) : href;
    navigate(_href.slice(0, -1))
  }

  onMount(() => {
    getOrganization();
    getReviews();
  });
</script>

<section class="pt-20 lg:p-0 bg-gray-900">
  <Navbar>
    <button
      on:click={() => {
        const { href } = window.location;
        const _href =
          href[href.length - 1] === "/" ? href.slice(0, -2) : href.slice(0, -1);
        navigate(_href);
      }}
      class="text-yellow-500 w-full justify-center p-1 transition-all flex items-center gap-2"
      type="button"
    >
      <span class="text-sm">Write a review</span>
      <Pencil className="w-3" />
    </button>
  </Navbar>
  <div class="py-4 lg:pt-32">
    <Action custom_path="/home" title="" />
  </div>

  <div
    class="px-4 flex flex-col gap-4 lg:flex-row lg:gap-20 lg:w-[85vw] lg:mx-auto"
  >
    <CompanyDetail
      organization_name={organization_info.name}
      organization_review={Number(organization_info.review)}
      organization_website={organization_info.website}
      organization_description={organization_info.description ?? ""}
      organization_logo={organization_info.logoUrl}
    />

    <div class="flex flex-col gap-4 w-full">
      <div class="py-5 flex items-center justify-between gap-8 lg:py-0">
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
      <div class="flex flex-col gap-4 lg:h-[75vh] overflow-y-scroll">
        {#if filter_reviews.length}
          {#each filter_reviews as { id, userId, fullName, star, userReaction, quickReactionView, content }}
            <Review
              on:delete={() => getReviews()}
              on:reaction={(e) => handleReaction(e.detail)}
              {id}
              posterId={userId}
              reactions={quickReactionView}
              {userReaction}
              user_alias={fullName}
              user_rating={star}
              user_review={content}
            />
          {/each}
        {:else}
          <span class="text-3xl text-gray-500 font-medium translate-y-10"
            >Be the first to <button class="text-yellow-500 underline" on:click={handleAddReview} type="button"
              >add a review.</button
            >
          </span>
        {/if}
      </div>
    </div>
  </div>
</section>

<svelte:head>
  <title>Gurugeeks LTD Reviews</title>
</svelte:head>
