<script lang="ts">
    export let className = "";
</script>

<figure
    class="bg-primary rounded-xl h-full w-full p-4 py-10 {className} space-y-5 lg:space-y-10 lg:p-10"
>
    <!--* Top First -->
    <div class="w-full flex items-center gap-4 flex-col lg:flex-row lg:gap-10">
        <span class="w-32 h-32 bg-secondary rounded-full"></span>
        <div class="flex flex-col gap-2 lg:text-center w-full lg:w-fit">
            <span
                class="text-2xl text-secondary text-center font-medium leading-none lg:text-start lg:leading-normal"
                >Company Name</span
            >
            <span
                class="text-xs text-secondary text-center leading-none mt-4 lg:mt-0 lg:text-start"
                >1, Address Avenue, State, Country. TX 230310 Lorem is long</span
            >
            <span
                class="text-xs text-secondary text-center leading-normal lg:text-start"
                >www.website.com</span
            >
            <span
                class="text-xs text-secondary text-center leading-normal lg:text-start"
                >email@email.com</span
            >
        </div>
    </div>
    <!--* Top First -->

    <!--* Bottom Second  -->
    <div>
        <span class="text-secondary text-center lg:text-start"
            >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
            sit, dolor corporis quis hic, quo iure iste maxime neque error eum
            laboriosam aliquam tempora eligendi ut magni alias saepe veritatis.</span
        >
    </div>
    <!--* Bottom Second  -->
</figure>
