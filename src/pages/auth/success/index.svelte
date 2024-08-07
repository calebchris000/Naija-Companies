<script lang="ts">
    import Navbar from "@src/components/navbar/navbar.svelte";
    import Animated from "./animated.svelte";
    import confetti from "canvas-confetti";
    import check_animated from "@src/assets/animated/completed.gif";
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        var myCanvas = document.createElement("canvas");
        document.body.appendChild(myCanvas);
        var myConfetti = confetti.create(myCanvas, {
            resize: true,
            useWorker: true,
        });
        myConfetti({
            particleCount: 100,
            spread: 90,
            // any other options from the global
            // confetti function
        });
        confetti({
            particleCount: 300,
            spread: 180,
        });
    });
</script>

<figure class="bg-secondary h-screen">
    <Navbar disabled={true} className="top-[0!important]" />
    <section
        class="lg:w-[70vw] lg:shadow-lg px-4 lg:grid lg:grid-cols-6 lg:p-10 text-secondary lg:min-h-[50vh] lg:rounded-xl lg:bg-primary lg:absolute lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%]"
    >
        <div
            class="lg:col-span-4 lg:space-y-10 flex flex-col gap-10 lg:block pt-10 lg:p-0"
        >
            <!-- <img class="h-40 w-40 mx-auto" src={check_animated} alt="" /> -->
            <div class="flex flex-col gap-2 lg:w-[32rem]">
                <span class="text-3xl font-medium">Registration Complete!</span>
                <span class="leading-relaxed lg:leading-loose lg:text-sm"
                    >Your job submission is currently under review. In the
                    meantime, you can search for companies and add reviews to
                    help others in our community.</span
                >
            </div>
            <div
                class="lg:w-[32rem] flex flex-col gap-2 bg-white lg:bg-transparent p-4 rounded-lg lg:p-0"
            >
                <span class="text-3xl lg:text-2xl font-medium text-secondary"
                    >Important!</span
                >
                <span
                    class="text-secondary font-medium leading-relaxed lg:text-sm lg:leading-loose"
                    >Do not use your real name in reviews. If you have, please
                    go to your profile page immediately and change it. Using
                    your real name could jeopardize your current employment if
                    you're reviewing your employer.</span
                >
            </div>
            <div>
                <button
                    class="lg:p-2 p-3 flex items-center gap-2 px-10 lg:px-4 hover:rounded-none transition-all rounded-md bg-secondary text-primary font-medium text-xl lg:text-lg"
                    type="button"
                    ><span>Let's Go!</span>
                    <Arrow className="w-4 rotate-180" />
                </button>
            </div>
        </div>
        <div class="lg:col-span-2 hidden lg:block">
            <img
                src={check_animated}
                alt="Animated check"
                class="w-full h-auto"
            />
            <!-- <Animated /> -->
        </div>
    </section>
</figure>
