<script lang="ts">
    import Navbar from "@src/components/navbar/navbar.svelte";
    import Input from "@src/components/Input/index.svelte";
    import Button from "@src/components/Input/button.svelte";
    import Review from "./components/review.svelte";
</script>

<figure class="bg-primary lg:overflow-hidden max-w-[120rem] lg:mx-auto">
    <Navbar disabled={true} className="top-[0!important]" />

    <section
        class="bg-primary w-full h-full px-4 lg:grid lg:gap-[10rem] lg:px-10 lg:grid-cols-2"
    >
        <div class="w-full space-y-4">
            <span class="text-3xl text-secondary font-normal"
                >Create An Account</span
            >

            <div class="space-y-4 lg:max-w-[40rem]">
                <Input
                    label="Full Name"
                    placeholder="First and last name in order"
                />
                <Input label="Username" placeholder="Minimum of 4 characters" />
                <Input
                    type="email"
                    label="Email Address"
                    placeholder="Valid email is required"
                />
                <Input
                    type="password"
                    label="Password"
                    placeholder="Minimum of 6 characters. Make it unique"
                />
                <Button className="mt-2" name="Create Account" type="max" />
                <span
                    class="w-fit ms-auto text-sm font-normal block mt-[10px!important] p-0"
                    >Already have an account? <a
                        class="underline font-medium"
                        href="/login">Login</a
                    ></span
                >
            </div>
        </div>
        <div
            class="h-[85vh] max-h-[40rem] max-w-[30rem] ms-auto bg-skyblue rounded-lg p-4 flex-col gap-2 hidden lg:flex"
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
