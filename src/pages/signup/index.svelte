<script lang="ts">
    import Navbar from "@src/components/navbar/navbar.svelte";
    import Input from "@src/components/Input/index.svelte";
    import Button from "@src/components/Input/button.svelte";
    import Review from "./components/review.svelte";
</script>

<figure class="bg-primary h-screen overflow-hidden max-w-[120rem] mx-auto">
    <Navbar disabled={true} className="top-[0!important]" />

    <section
        class="bg-primary grid grid-cols-2 w-full h-full gap-[10rem] px-10"
    >
        <div class="w-full h-full space-y-4">
            <span class="text-3xl text-secondary font-normal"
                >Create An Account</span
            >

            <div class="space-y-4">
                <Input
                    label="Full Name"
                    placeholder="First and last name in order"
                />
                <Input label="Username" placeholder="Minimum of 4 characters" />
                <Input
                    label="Email Address"
                    placeholder="Valid email is required"
                />
                <Input
                    label="Password"
                    placeholder="Minimum of 6 characters. Make it unique"
                />
                <Button className="mt-2" name="Create Account" type="max" />
                <span
                    class="w-fit ms-auto text-sm font-normal block mt-[10px!important] p-0"
                    >Already have an account? <a class="underline" href="/login"
                        >Login</a
                    ></span
                >
            </div>
        </div>
        <div
            class="h-[85vh] max-w-[40vw] bg-skyblue rounded-lg p-4 flex flex-col gap-2"
        >
            <div class="flex flex-col gap-4">
                <span
                    class="text-light text-3xl font-semibold block w-[340px] leading-normal xl:4xl 2xl:w-full"
                    >Start Your Journey With Us</span
                >
                <span class="text-light leading-relaxed"
                    >Discover 1000+ fresh startups and explore real user
                    opinions about them.</span
                >
            </div>

            <div class="lg:mt-auto h-fit flex flex-col gap-2">
                <Review />
                <div
                    class="flex cursor-pointer items-center justify-center gap-3"
                >
                    <span class="w-3 h-3 bg-light rounded-full"></span>
                    <span class="w-3 h-3 bg-gray-300 rounded-full"></span>
                    <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
                </div>
            </div>
        </div>
    </section>
</figure>
