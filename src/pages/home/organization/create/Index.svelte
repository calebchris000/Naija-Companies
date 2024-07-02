<script lang="ts">
  import Navbar from "@src/components/navbar/Index.svelte";
  import Input from "@src/components/Input/Index.svelte";
  import edit from "@src/assets/svg/edit.svg";
  import link from "@src/assets/svg/link.svg";
  import people from "@src/assets/svg/people.svg";
  import building from "@src/assets/svg/buildng.svg";
  import email from "@src/assets/email.png";
  import city from "@src/assets/svg/city.svg";
  import industry from "@src/assets/svg/industry.svg";
  import castle from "@src/assets/svg/castle.svg";
  import TextArea from "@src/components/Input/TextArea.svelte";
  import { store } from "@src/lib/store";
  import Select from "@src/components/Input/Select.svelte";
  import { GetCapital } from "@src/core/api/capital";
  import { emailRegex, useToken } from "@src/core/utils/utils";
  import { Notification } from "@src/utils/notification";
  import { industries } from "@src/lib/industries";
  import "./style.css";
  import { onMount } from "svelte";
  import { UploadImage } from "@src/core/api/service";
  import { AddOrganization } from "@src/core/api/organization";
  import { cities } from "@src/lib/cities";
  import Link from "@src/assets/svg/Link.svelte";
  import { navigate } from "svelte-routing";
  import Action from "@src/components/action/action.svelte";
  import Description from "@src/assets/svg/description.svelte";

  $: capitals = $store.capital_list;
  $: cities_in_capital = $store.cities_in_capital;
  $: logoUrl = "";
  $: device = $store.device;

  $: store.update((c: any) => {
    c.cities_in_capital = Object.values(
      cities.find(
        (c) => Object.keys(c)[0] === ($store.selected_capital as any)
      ) ?? {}
    )
      .flat()
      .map((city) => ({ id: Math.random() * 100, name: city }));
    return c;
  });

  $: create_status = "not_created";
  $: show_tooltip = true;
  let file_input: HTMLElement;
  let image_element: HTMLImageElement;
  let image_file: File | undefined;

  let sizes = [
    { id: "small", name: "Small (< 100 employees)" },
    { id: "medium", name: "Medium (100 - 500 employees)" },
    { id: "large", name: "Large (501 - 1000 employees)" },
    { id: "extra-large", name: "Extra-Large (> 1000 employees)" },
  ];

  const token = useToken();

  async function getCapitals() {
    const response = await GetCapital({ token });

    if (response.status === 200) {
      store.update((c) => {
        c.capital_list = response.data?.data;
        return c;
      });
    }
  }

  let inputValues: Map<string, string> = new Map();

  let inputValue = [
    { type: "text", label: "name", placeholder: "Name", icon: edit },
    { type: "text", label: "website", placeholder: "Website", icon: link },
    {
      type: "select",
      label: "size",
      placeholder: "Size",
      onOpen: (d: any) => handleSizeOpen(d),
      list: sizes,
      icon: people,
    },
    {
      type: "email",
      label: "email",
      placeholder: "Email Address",
      icon: email,
    },

    {
      type: "select",
      list: industries,
      label: "industry",
      placeholder: "Industry",
      onOpen: (d: any) => handleIndustryOpen(d),
      icon: industry,
    },

    {
      type: "select",
      label: "capitalId",
      onOpen: (d: any) => handleCapitalOpen(d),

      placeholder: "Capital",
      icon: castle,
      list: [],
    },
    {
      type: "select",
      label: "city",
      icon: city,
      placeholder: "City",
      list: [],
    },
  ];

  onMount(() => {
    setTimeout(() => {
      show_tooltip = false;
    }, 5000);
  });

  function handleSizeOpen({ isOpen, label }: any) {
    if (label !== "size") return;
  }

  function handleCapitalOpen({ isOpen, label }: any) {
    if (label !== "capitalId") return;
    if (isOpen) {
      getCapitals();
    } else {
      $store.capital_list = [];
    }
  }

  function handleIndustryOpen({ isOpen, label }: any) {
    if (label !== "industry") return;
  }

  async function handleSubmit() {
    const notification = new Notification();

    const {
      name,
      website,
      email,
      size,
      city,
      industry,
      capitalId,
      description,
    } = Object.fromEntries(inputValues);

    if (!name || !website || !size || !industry || !city || !capitalId) {
      notification.error({ text: "Fill out all required fields" });
      return;
    }

    if (!description) {
      notification.error({
        text: "Provide a short description of what the organization do.",
      });
      return;
    }
    if (!image_file) {
      notification.error({ text: "Upload the company's official logo" });
      return;
    }
    if (!emailRegex.test(email)) {
      notification.error({ text: "The email must be valid" });
    }
    create_status = "pending";

    //* Uploading the image and getting the link
    if (!logoUrl) {
      const formData = new FormData();
      formData.append("image", image_file);
      const response = await UploadImage(formData);

      if (response.status !== 200) {
        create_status = "failure";
        notification.error({
          text: response?.data ?? "Processing logo failed. Try again",
        });
        return;
      }
      logoUrl = response.data?.data?.url;
      inputValues.set("logoUrl", logoUrl);
    }
    const to_object = Object.fromEntries(inputValues);
    const create_response = await AddOrganization({ token, data: to_object });

    if (create_response.status !== 201) {
      create_status = "failure";
      notification.error({
        text:
          create_response.data?.message ??
          "Could not add organization at this time. Try again.",
      });
      return;
    }
    create_status = "success";
    notification.success({
      text:
        create_response?.data?.message ??
        "Success! The organization would be added soon.",
    });

    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }

  function handleFileInput(e: Event) {
    const notification = new Notification();
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    image_file = file;

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target?.result && image_element) {
            image_element.style = "width: 100%";
            image_element.src = event.target.result as string;
          }
        };

        reader.readAsDataURL(file);
      } else {
        notification.error({ text: "Please select an image file." });
        target.value = "";
      }
    }
  }

  $: {
    if (create_status === "failure" || create_status === "success") {
      setTimeout(() => {
        create_status = "not_created";
      }, 2000);
    }
  }

  $: {
    if (show_tooltip) {
      setTimeout(() => {
        show_tooltip = false;
      }, 5000);
    }
  }
</script>

<section class="">
  <Navbar>
    <div></div>
  </Navbar>
  {#if device === "mobile"}
    <div class="mt-24 mb-4">
      <Action title="Add an existing Organization" custom_path="/home" />
    </div>
  {/if}
  <div
    class="px-6 py-5 mx-4 flex flex-col gap-10 bg-orange-100 rounded-[1.6rem] xl:translate-y-36 xl:w-[50vw] xl:mx-auto"
  >
    <input
      on:input={handleFileInput}
      bind:this={file_input}
      class="hidden"
      type="file"
      name=""
      id=""
    />
    <button
      on:click={() => {
        if (
          create_status === "pending" ||
          create_status === "success" ||
          create_status === "failure"
        ) {
          return;
        }
        file_input.click();
      }}
      on:mouseenter={() => {
        show_tooltip = create_status === "not_created";
      }}
      type="button"
      class="flex relative rounded-full bg-blue-500 w-fit mx-auto flex-col gap-2 items-center xl:w-32 xl:h-32"
    >
      <div
        class="bg-blue-100 transition-all border-2 border-transparent hover:border-orange-500 rounded-full flex items-center justify-center overflow-hidden w-20 h-20 xl:w-32 xl:h-32"
      >
        <img
          bind:this={image_element}
          class="w-10 xl:w-16 mx-auto"
          src={building}
          alt=""
        />
      </div>
      <span
        style="opacity: {show_tooltip ? '1' : '0'}"
        class="text-xs transition-all opacity-0 select-none text-nowrap top-[50%] translate-y-[-50%] right-0 translate-x-36 bg-blue-600 rounded-md chat-bubble absolute font-medium text-white p-2 py-1"
        >Click to insert logo</span
      >
    </button>
    <div
      class="h-[35vh] overflow-y-scroll flex flex-col gap-4 xl:grid xl:grid-cols-2"
    >
      {#each inputValue as { type, label, list, onOpen, placeholder, icon }}
        {#if type === "select"}
          <Select
            icon_class="xl:w-5"
            custom_empty_message={label === "city"
              ? "Select a capital"
              : ""}
            on:item_click={(e) => {
              const { id, name } = e.detail;
              if (label === "city") {
                inputValues.set(label, name);
              } else {
                inputValues.set(label, id);
              }
              if (label === "capitalId") {
                store.update((c) => {
                  c.selected_capital = name;
                  return c;
                });
              }
            }}
            on:open={(e) => {
              if (onOpen) {
                onOpen(e.detail);
              }
            }}
            {label}
            list={label === "capitalId"
              ? capitals
              : label === "city"
                ? cities_in_capital
                : list}
            {placeholder}
            {icon}
          />
        {:else}
          <Input
            on:input={(data) => {
              const { label, value } = data.detail;
              inputValues.set(label, value);
            }}
            {type}
            {placeholder}
            {label}
            {icon}
          />
        {/if}
      {/each}
      <TextArea
        icon_class="xl:w-5"
        Icon={Description}
        on:input={(data) => {
          const { label, value } = data.detail;
          inputValues.set(label, value);
        }}
        label="description"
        placeholder="Description"
      />
    </div>

    <button
      on:click={handleSubmit}
      style="background-color: {create_status === 'pending'
        ? '#6b7280'
        : create_status === 'success'
          ? '#22c55e'
          : create_status === 'failure'
            ? '#ef4444'
            : '#ea580c'};
            pointer-events: {create_status === 'pending' ||
      create_status === 'success'
        ? 'none'
        : 'auto'}
            "
      class="p-4 w-full block transition-all rounded-xl bg-orange-600 font-medium mt-5 text-white xl:w-fit xl:px-20 xl:mx-auto"
      type="button"
      >{create_status === "pending"
        ? "Adding Company, please wait..."
        : create_status === "success"
          ? "Successfully Added Company!"
          : create_status === "failure"
            ? "Failed to add company"
            : "Add Company"}</button
    >
  </div>
</section>
