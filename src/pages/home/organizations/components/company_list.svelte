<script lang="ts">
    import CompanyItem from "./company_item.svelte";

    export let type = "Trending";

    export let list: {
        id: string;
        image: string;
        name: string;
        rating: number;
        reviews: string[];
    }[] = [
        {
            id: "1",
            image: "https://example.com/images/company1.jpg",
            name: "TechCorp",
            rating: 4.5,
            reviews: ["Great service!", "Excellent products"],
        },
        {
            id: "2",
            image: "https://example.com/images/company2.jpg",
            name: "InnovateTech",
            rating: 4.2,
            reviews: ["Innovative solutions", "Responsive team"],
        },
        {
            id: "3",
            image: "https://example.com/images/company3.jpg",
            name: "DataSystems",
            rating: 4.8,
            reviews: ["Top-notch data management.", "Reliable service"],
        },
        {
            id: "4",
            image: "https://example.com/images/company4.jpg",
            name: "CloudSolutions",
            rating: 4.6,
            reviews: ["Scalable cloud services", "Excellent support"],
        },
        {
            id: "5",
            image: "https://example.com/images/company5.jpg",
            name: "SecurityGuard",
            rating: 4.7,
            reviews: ["Top-tier cybersecurity", "Proactive monitoring"],
        },
        {
            id: "6",
            image: "https://example.com/images/company6.jpg",
            name: "AIInnovate",
            rating: 4.4,
            reviews: ["Cutting-edge AI solutions", "Impressive results"],
        },
        {
            id: "7",
            image: "https://example.com/images/company7.jpg",
            name: "BlockchainTech",
            rating: 4.3,
            reviews: ["Innovative blockchain solutions", "Secure transactions"],
        },
        {
            id: "8",
            image: "https://example.com/images/company8.jpg",
            name: "IoTConnect",
            rating: 4.5,
            reviews: ["Seamless IoT integration", "Robust device management"],
        },
    ];
</script>

<section class="flex flex-col gap-1">
    <span class="font-medium text-primary">{type}</span>
    <div class="flex w-full overflow-x-auto items-center gap-4 py-4">
        <div class="flex-nowrap gap-4 inline-flex">
            {#each list as item}
                <div class="flex-shrink-0">
                    <CompanyItem {item} />
                </div>
            {/each}
        </div>
    </div>
</section>
