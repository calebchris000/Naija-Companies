<script lang="ts">
    import Pencil from "@src/assets/svg/Pencil.svelte";
</script>

<section
    class="lg:max-h-[280vh] lg:w-full h-fit bg-secondary space-y-10 shapedividers_com-3867 p-4 py-40"
>
    <span
        class="text-3xl text-light text-center flex justify-center font-medium"
        >About Us</span
    >
    <section
        class="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-3 gap-4 lg:h-[140vh] lg:px-32"
    >
        <div
            class="bg-skyblue h-full w-full rounded-xl lg:col-span-2 p-4 flex flex-col py-10 gap-4 text-light"
        >
            <span class="text-xl font-semibold">Who Are We?</span>
            <span class="text-sm leading-loose"
                >We're a group of passionate Nigerians committed to fostering
                transparency in the business world. Our team combines diverse
                experiences and a shared vision for a fair and thriving Nigerian
                work environment.</span
            >
        </div>
        <div
            class="bg-skyblue h-full w-full rounded-xl lg:col-span-4 flex flex-col gap-4 p-4 py-10 text-light"
        >
            <span class="text-xl font-semibold"
                >What was the motivation in creating this platform?</span
            >
            <span class="leading-loose text-sm">
                We created Naija Companies in response to the rising cases of
                exploitation by both startups and established organizations. Too
                many of our friends and family members have fallen victim to
                dodgy companies and exploitative work practices. We believe that
                by sharing real experiences, we can help others make informed
                decisions about their careers.
            </span>
        </div>
        <div
            class="bg-skyblue h-full w-full rounded-xl lg:col-span-4 flex flex-col gap-4 p-4 py-10 text-light"
        >
            <span class="text-xl font-semibold"
                >What does Naija Companies do?</span
            >
            <span class="leading-loose"
                >Naija Companies is a platform where people can review companies
                based in Nigeria. We provide a space for honest, user-generated
                reviews about businesses across the country, covering everything
                from startups to established corporations.</span
            >
        </div>
        <div
            class="bg-skyblue h-full w-full rounded-xl lg:col-span-2 lg:row-span-2 flex flex-col gap-4 p-4 py-10 text-light"
        >
            <span class="text-xl font-semibold">How can you get involved?</span>
            <span class="leading-loose"
                >Whether you're a fresh graduate, an experienced professional,
                or anywhere in between, your voice matters. Share your
                experiences, read others' reviews, and make informed decisions
                about your career. Together, we can make a difference in the
                Nigerian business world.</span
            >
        </div>
        <div class="lg:col-span-3 mt-16 text-light flex flex-col gap-4">
            <span class="text-3xl font-semibold">OUR VISION</span>
            <span class="leading-loose text-lg"
                >We aim to create a more transparent, fair, and thriving
                Nigerian business landscape. By empowering individuals with
                information, we hope to encourage companies to improve their
                practices and recognize those already doing right by their
                employees and customers.</span
            >
            <button
                class="self-start mt-5 1-full flex items-center bg-skyblue p-3 px-4 gap-4 rounded-lg"
                type="button"
            >
                <span class="font-semibold">Write A Review</span>
                <Pencil className="w-6" />
            </button>
        </div>
    </section>
</section>

<style>
    .shapedividers_com-3867 {
        /* overflow: hidden; */
        @apply lg:overflow-hidden;
        position: relative;
    }
    .shapedividers_com-3867::before {
        content: "";
        font-family: "shape divider from ShapeDividers.com";
        position: absolute;
        z-index: 3;
        pointer-events: none;
        background-repeat: no-repeat;
        bottom: -0.1vw;
        left: -0.1vw;
        right: -0.1vw;
        top: -0.1vw;
        background-size: 100% 90px;
        background-position: 50% 0%;
        background-image: url('data:image/svg+xml;charset=utf8, <svg preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 53"><g fill="white"><path opacity=".5" d="M32 32H15L6 17l9-15h17l9 15-9 15z"/><path opacity=".5" d="M64 32H47l-9-15 9-15h17l9 15-9 15zM49 53h-7l-4-7 4-7h7l4 7-4 7zM5 35H3l-2-2 2-2h2l1 2-1 2z"/><path opacity=".2" d="M28 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-18-1H8l-3-4 3-5h5l3 5-3 4zm-3-18H5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-1-3 1-2h3l1 2-1 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zM24 52h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M87 35h2l1-2-1-2h-2l-2 2 2 2z"/><path opacity=".2" d="M64 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm17-1h6l3-4-3-5h-6l-2 5 2 4z"/><path opacity=".5" d="M82 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M51 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-1 3 1 2z"/><path opacity=".5" d="M125 32h-18l-8-15 8-15h18l9 15-9 15z"/><path opacity=".5" d="M156 32h-17l-9-15 9-15h17l9 15-9 15zm-14 21h-8l-4-7 4-7h8l3 7-3 7zM97 35h-2l-1-2 1-2h2l2 2-2 2z"/><path opacity=".2" d="M120 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-17-1h-6l-3-4 3-5h6l2 5-2 4zm-4-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l2 3-2 2z"/><path opacity=".5" d="M179 35h2l2-2-2-2h-2l-1 2 1 2z"/><path opacity=".2" d="M156 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1v2zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M174 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M143 38h3l2-3-2-2h-3l-1 2 1 3zm2-9h4l1-3-1-3h-4l-1 3 1 3zm15 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M217 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M249 32h-18l-8-15 8-15h18l8 15-8 15zm-15 21h-8l-3-7 3-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M213 43h-9l-4-7 4-7h9l4 7-4 7zm3 6h-2v-2h2v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-3-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-2l-2-2 2-3h2l2 3-2 2z"/><path opacity=".5" d="M271 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M249 43h8l4-7-4-7h-8l-5 7 5 7zm-4 6h2v-2h-2v2zm18-1h6l2-4-2-5h-6l-3 5 3 4z"/><path opacity=".5" d="M266 30h6l2-5-2-4h-6l-2 4 2 5z"/><path opacity=".2" d="M236 38h2l2-3-2-2h-2l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-2 3 2 2z"/><path opacity=".5" d="M310 32h-18l-9-15 9-15h18l8 15-8 15z"/><path opacity=".5" d="M341 32h-17l-9-15 9-15h17l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-2l-2-2 2-2h2l1 2-1 2z"/><path opacity=".2" d="M305 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l1 2-1 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zm-15 23h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M364 35h2l1-2-1-2h-2l-2 2 2 2z"/><path opacity=".2" d="M341 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M359 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M328 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h4l1-3-1-3h-4l-1 3 1 3zm15 23h3l1-2-1-3h-3l-1 3 1 2z"/><path opacity=".5" d="M402 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M433 32h-17l-9-15 9-15h17l9 15-9 15zm-14 21h-8l-4-7 4-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M397 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1v-2h1l1 1-1 1zm-17-1h-6l-2-4 2-5h6l2 5-2 4zm-4-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l2 3-2 2z"/><path opacity=".5" d="M456 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M433 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1v2zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M451 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M420 38h3l2-3-2-2h-3l-1 2 1 3zm3-9h3l2-3-2-3h-3l-2 3 2 3zm14 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M494 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M526 32h-18l-8-15 8-15h18l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M490 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-3-9h-3l-2-3 2-3h3l2 3-2 3zm-14 23h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M548 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M526 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1v-2h-1l-1 1 1 1zm17-1h6l2-4-2-5h-6l-2 5 2 4z"/><path opacity=".5" d="M544 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M513 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-2 3 2 2z"/><path opacity=".5" d="M587 32h-18l-8-15 8-15h18l8 15-8 15z"/><path opacity=".5" d="M618 32h-17l-9-15 9-15h17l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-2l-1-2 1-2h2l2 2-2 2z"/><path opacity=".2" d="M582 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zm-15 23h-3l-1-2 1-3h3l1 3-1 2z"/><path opacity=".5" d="M641 35h2l2-2-2-2h-2l-1 2 1 2z"/><path opacity=".2" d="M618 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M636 30h5l3-5-3-4h-5l-3 4 3 5z"/><path opacity=".2" d="M605 38h3l1-3-1-2h-3l-1 2 1 3zm2-9h4l1-3-1-3h-4l-1 3 1 3zm15 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M679 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M711 32h-18l-9-15 9-15h18l8 15-8 15zm-15 21h-8l-4-7 4-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M674 43h-8l-4-7 4-7h8l5 7-5 7zm4 6h-2v-2h2v2zm-18-1h-6l-2-4 2-5h6l3 5-3 4zm-3-18h-6l-2-5 2-4h6l2 4-2 5zm30 8h-2l-2-3 2-2h2l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l2 3-2 2z"/><path opacity=".5" d="M733 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M710 43h9l4-7-4-7h-9l-4 7 4 7zm-3 6h2v-2h-2v2zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M728 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M697 38h3l2-3-2-2h-3l-1 2 1 3zm3-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h2l2-2-2-3h-2l-2 3 2 2z"/><path opacity=".5" d="M771 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M803 32h-17l-9-15 9-15h17l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-2l-2-2 2-2h2l1 2-1 2z"/><path opacity=".2" d="M767 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zm-15 23h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M826 35h2l1-2-1-2h-2l-2 2 2 2z"/><path opacity=".2" d="M803 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm17-1h6l3-4-3-5h-6l-2 5 2 4z"/><path opacity=".5" d="M821 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M790 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-2 3 2 2z"/><path opacity=".5" d="M864 32h-18l-8-15 8-15h18l9 15-9 15z"/><path opacity=".5" d="M895 32h-17l-9-15 9-15h17l9 15-9 15zm-14 21h-8l-4-7 4-7h8l3 7-3 7zm-45-18h-2l-1-2 1-2h2l2 2-2 2z"/><path opacity=".2" d="M859 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-17-1h-6l-3-4 3-5h6l2 5-2 4zm-4-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l1 3-1 2z"/><path opacity=".5" d="M918 35h2l2-2-2-2h-2l-1 2 1 2z"/><path opacity=".2" d="M895 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M913 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M882 38h3l1-3-1-2h-3l-1 2 1 3zm2-9h4l1-3-1-3h-4l-1 3 1 3zm15 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M956 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M988 32h-18l-8-15 8-15h18l8 15-8 15zm-15 21h-8l-3-7 3-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M952 43h-9l-4-7 4-7h9l4 7-4 7zm3 6h-2v-2h2v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-3-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-2l-2-2 2-3h2l2 3-2 2z"/><path opacity=".5" d="M1010 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M988 43h8l4-7-4-7h-8l-5 7 5 7zm-4 6h2v-2h-2v2zm18-1h6l2-4-2-5h-6l-3 5 3 4z"/><path opacity=".5" d="M1005 30h6l2-5-2-4h-6l-2 4 2 5z"/><path opacity=".2" d="M975 38h2l2-3-2-2h-2l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-2 3 2 2z"/><path opacity=".5" d="M1049 32h-18l-9-15 9-15h18l8 15-8 15z"/><path opacity=".5" d="M1080 32h-17l-9-15 9-15h17l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-2l-2-2 2-2h2l1 2-1 2z"/><path opacity=".2" d="M1044 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l1 2-1 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zm-15 23h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M1103 35h2l1-2-1-2h-2l-2 2 2 2z"/><path opacity=".2" d="M1080 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm17-1h6l3-4-3-5h-6l-2 5 2 4z"/><path opacity=".5" d="M1098 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M1067 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h4l1-3-1-3h-4l-1 3 1 3zm15 23h3l1-2-1-3h-3l-1 3 1 2z"/><path opacity=".5" d="M1141 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M1172 32h-17l-9-15 9-15h17l9 15-9 15zm-14 21h-8l-4-7 4-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M1136 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1v-2h1l1 1-1 1zm-17-1h-6l-2-4 2-5h6l2 5-2 4zm-4-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l2 3-2 2z"/><path opacity=".5" d="M1195 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M1172 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1v2zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M1190 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M1159 38h3l2-3-2-2h-3l-1 2 1 3zm3-9h3l2-3-2-3h-3l-2 3 2 3zm14 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M1233 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M1265 32h-18l-8-15 8-15h18l9 15-9 15zm-15 21h-8l-3-7 3-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M1229 43h-8l-5-7 5-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-3-9h-3l-2-3 2-3h3l2 3-2 3zm-14 23h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M1287 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M1265 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1v-2h-1l-1 1 1 1zm17-1h6l2-4-2-5h-6l-2 5 2 4z"/><path opacity=".5" d="M1283 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M1252 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-2 3 2 2z"/><path opacity=".5" d="M1326 32h-18l-8-15 8-15h18l8 15-8 15z"/><path opacity=".5" d="M1357 32h-17l-9-15 9-15h17l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-2l-1-2 1-2h2l2 2-2 2z"/><path opacity=".2" d="M1321 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zm-15 23h-3l-1-2 1-3h3l1 3-1 2z"/><path opacity=".5" d="M1380 35h2l2-2-2-2h-2l-1 2 1 2z"/><path opacity=".2" d="M1357 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M1375 30h5l3-5-3-4h-5l-3 4 3 5z"/><path opacity=".2" d="M1344 38h3l1-3-1-2h-3l-1 2 1 3zm2-9h4l1-3-1-3h-4l-1 3 1 3zm15 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M1418 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M1450 32h-18l-9-15 9-15h18l8 15-8 15zm-15 21h-8l-4-7 4-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M1413 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1v-2h1l1 1-1 1zm-17-1h-6l-2-4 2-5h6l3 5-3 4zm-3-18h-6l-2-5 2-4h6l2 4-2 5zm30 8h-2l-2-3 2-2h2l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l2 3-2 2z"/><path opacity=".5" d="M1472 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M1449 43h9l4-7-4-7h-9l-4 7 4 7zm-3 6h2v-2h-2v2zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M1467 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M1436 38h3l2-3-2-2h-3l-1 2 1 3zm3-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h2l2-2-2-3h-2l-2 3 2 2z"/><path opacity=".5" d="M1510 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M1542 32h-17l-9-15 9-15h17l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-2l-2-2 2-2h2l1 2-1 2z"/><path opacity=".2" d="M1506 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zm-15 23h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M1565 35h2l1-2-1-2h-2l-2 2 2 2z"/><path opacity=".2" d="M1542 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm17-1h6l2-4-2-5h-6l-2 5 2 4z"/><path opacity=".5" d="M1560 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M1529 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-2 3 2 2z"/><path opacity=".5" d="M1603 32h-18l-8-15 8-15h18l9 15-9 15z"/><path opacity=".5" d="M1634 32h-17l-9-15 9-15h17l9 15-9 15zm-14 21h-8l-4-7 4-7h8l3 7-3 7zm-45-18h-2l-1-2 1-2h2l2 2-2 2z"/><path opacity=".2" d="M1598 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-17-1h-6l-3-4 3-5h6l2 5-2 4zm-4-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l1 3-1 2z"/><path opacity=".5" d="M1657 35h2l2-2-2-2h-2l-1 2 1 2z"/><path opacity=".2" d="M1634 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M1652 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M1621 38h3l1-3-1-2h-3l-1 2 1 3zm2-9h4l1-3-1-3h-4l-1 3 1 3zm15 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M1695 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M1727 32h-18l-8-15 8-15h18l8 15-8 15zm-15 21h-8l-3-7 3-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M1691 43h-9l-4-7 4-7h9l4 7-4 7zm3 6h-2v-2h2v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-3-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l2 3-2 2z"/><path opacity=".5" d="M1749 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M1727 43h8l4-7-4-7h-8l-5 7 5 7zm-4 6h2v-2h-2v2zm18-1h6l2-4-2-5h-6l-3 5 3 4z"/><path opacity=".5" d="M1744 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M1713 38h3l2-3-2-2h-3l-1 2 1 3zm3-9h3l2-3-2-3h-3l-2 3 2 3zm15 23h3l1-2-1-3h-3l-2 3 2 2z"/><path opacity=".5" d="M1788 32h-18l-9-15 9-15h18l8 15-8 15z"/><path opacity=".5" d="M1819 32h-17l-9-15 9-15h17l9 15-9 15zm-15 21h-7l-4-7 4-7h7l4 7-4 7zm-44-18h-2l-2-2 2-2h2l1 2-1 2z"/><path opacity=".2" d="M1783 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1l1 1-1 1zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l1 2-1 3zm-2-9h-4l-1-3 1-3h4l1 3-1 3zm-15 23h-3l-2-2 2-3h3l1 3-1 2z"/><path opacity=".5" d="M1842 35h2l1-2-1-2h-2l-2 2 2 2z"/><path opacity=".2" d="M1819 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1l-1 1 1 1zm17-1h6l3-4-3-5h-6l-2 5 2 4z"/><path opacity=".5" d="M1837 30h5l2-5-2-4h-5l-3 4 3 5z"/><path opacity=".2" d="M1806 38h3l1-3-1-2h-3l-2 2 2 3zm2-9h3l2-3-2-3h-3l-1 3 1 3zm15 23h3l1-2-1-3h-3l-1 3 1 2z"/><path opacity=".5" d="M1880 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M1911 32h-17l-9-15 9-15h17l9 15-9 15zm-14 21h-8l-4-7 4-7h8l3 7-3 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M1875 43h-8l-4-7 4-7h8l4 7-4 7zm3 6h-1v-2h1l1 1-1 1zm-17-1h-6l-2-4 2-5h6l2 5-2 4zm-4-18h-5l-2-5 2-4h5l3 4-3 5zm31 8h-3l-1-3 1-2h3l2 2-2 3zm-2-9h-3l-2-3 2-3h3l2 3-2 3zm-15 23h-3l-1-2 1-3h3l2 3-2 2z"/><path opacity=".5" d="M1934 35h3l1-2-1-2h-3l-1 2 1 2z"/><path opacity=".2" d="M1911 43h8l4-7-4-7h-8l-4 7 4 7zm-3 6h1l1-1-1-1h-1v2zm18-1h5l3-4-3-5h-5l-3 5 3 4z"/><path opacity=".5" d="M1929 30h5l3-5-3-4h-5l-2 4 2 5z"/><path opacity=".2" d="M1898 38h3l2-3-2-2h-3l-1 2 1 3zm3-9h3l2-3-2-3h-3l-2 3 2 3zm14 23h3l2-2-2-3h-3l-1 3 1 2z"/><path opacity=".5" d="M1972 32h-17l-9-15 9-15h17l9 15-9 15z"/><path opacity=".5" d="M2000 32V2h-14l-7 13-1 2 8 15h14zm-11 21h-8l-3-7 3-7h8l4 7-4 7zm-44-18h-3l-1-2 1-2h3l1 2-1 2z"/><path opacity=".2" d="M1968 43h-8l-5-7 5-7h8l4 7-4 7zm3 6h-1l-1-1 1-1h1v2zm-18-1h-5l-3-4 3-5h5l3 5-3 4zm-3-18h-5l-3-5 3-4h5l2 4-2 5zm31 8h-3l-2-3 2-2h3l1 2-1 3zm-3-9h-3l-2-3 2-3h3l2 3-2 3zm-14 23h-3l-2-2 2-3h3l1 3-1 2zm36-15v-3 3zm0 11v-1 1zm-9-10h3l1-3-1-2h-3l-2 2 2 3zm2-9h3l2-3-2-3h-3l-2 3 2 3z"/><path d="M1990 12l-2 3h-17l-5-8-5 8h-28l-4-8-5 8h-18l-5-9-5 9h-18l-4-8-5 8h-30l-5-8-4 8h-18l-4-7-5 7h-17l-5-8-4 8h-32l-5-8-5 8h-17l-4-6-3 6h-17l-5-8-5 8h-34l-4-8-5 8h-17l-3-4-2 4h-18l-4-8-5 8h-36l-5-8-4 8h-18l-1-2-2 2h-17l-5-8-4 8h-35l-5-8-5 8h-17l-2-3-2 3h-17l-5-8-5 8h-28l-5-8-4 8h-18l-5-9-5 9h-18l-5-8-4 8h-30l-5-8-5 8h-17l-4-7-5 7h-17l-5-8-5 8h-26l-4-8-5 8h-17l-7-11-6 11h-18l-4-8-5 8h-28l-5-8-4 8h-18l-5-9-6 9h-17l-5-8-4 8h-25l-5-8-5 8h-17l-7-12-7 12h-17l-5-8-5 8h-28l-5-8-4 8h-18l-5-9-5 9h-18l-4-8-5 8h-25l-5-8-4 8h-18l-7-12-7 12h-17l-5-8-4 8h-25l-5-8-5 8h-17l-7-12-7 12h-17l-5-8-5 8h-30l-5-8-4 8h-18l-4-7-4 7h-18l-4-8-5 8h-24l-5-8-4 8h-18l-7-13-8 13h-17l-5-8-5 8h-28l-4-8-5 8h-18l-5-9-5 9h-18l-4-8-5 8h-28l-5-8-4 8h-18l-5-9-6 9h-17l-5-8-4 8h-25l-5-8-5 8h-17l-7-12-7 12h-17l-5-8-5 8h-25l-4-8-5 8h-17l-7-12-7 12h-18l-4-8-5 8H89l-5-8-4 8H62L55 3l-7 12H31l-5-8-4 8H4L0 8V0h2000v15l-10-3z"/></g></svg>');
    }

    @media (min-width: 2100px) {
        .shapedividers_com-3867::before {
            background-size: 100% calc(2vw + 90px);
        }
    }
</style>
