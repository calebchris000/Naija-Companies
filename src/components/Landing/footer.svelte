<script lang="ts">
    import logo from "@src/assets/logo-white.png";
    import { AddEmail } from "@src/core/api/email";
    import { emailRegex } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    const notification = new Notification();
    let email_element: HTMLInputElement;
    async function handleAddEmail() {
        if (!email_element) return;
        const { value } = email_element;

        if (!value) {
            notification.error({ text: "Fill out the email field" });
            return;
        }
        if (!emailRegex.test(value)) {
            notification.error({ text: "Fill out a valid email" });
            return;
        }

        const response = await AddEmail({ email: value });

        if (response.status !== 200) {
            notification.error({
                text: "Submission failed: " + response.data ?? "Network error",
            });
        } else {
            notification.success({ text: "Subscription Successful!" });
            email_element.value = "";
        }
    }
</script>

<section
    class=" w-full bg-black lg:pb-4 p-4 py-32 text-primary space-y-24 lg:p-32 lg:px-10"
>
    <div class="flex flex-col gap-2 text-center text-secondary">
        <span class="text-3xl font-medium">Join Our Newsletter</span>
        <span class="leading-loose lg:max-w-[55vw] mx-auto"
            >Stay informed about Nigerian workplace trends, company reviews, and
            career insights. Get exclusive updates and be the first to know
            about newly reviewed organizations. Join our community today!</span
        >
        <div
            class="flex items-center max-w-[1000px] flex-col lg:flex-row h-32 gap-4 mx-auto mt-4 lg:h-14 lg:w-[50vw]"
        >
            <input
                bind:this={email_element}
                class="bg-secondary mx-auto w-full h-full text-black placeholder:text-black font-medium px-10 py-3 outline-none rounded-full"
                type="email"
                placeholder="Your email address"
            />
            <button
                on:click={handleAddEmail}
                class="bg-primary text-white h-full px-10 py-3 w-full lg:w-fit rounded-full font-semibold"
                type="button">Submit</button
            >
        </div>
    </div>

    <div class="flex flex-col gap-10">
        <div class="w-52">
            <img class="w-full" src={logo} alt="" />
        </div>

        <div class="flex flex-col text-secondary gap-10 lg:flex-row lg:gap-60">
            <figure class="flex flex-col gap-4">
                <span class="font-semibold">Follow Us</span>
                <div class="flex flex-col gap-4">
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>LinkedIn</span>
                    <span>Instagram</span>
                </div>
            </figure>
            <figure class="flex flex-col gap-4">
                <span class="font-semibold">About</span>
                <div class="flex flex-col gap-4">
                    <span>About Us</span>
                    <span>Blog</span>
                    <span>Services</span>
                    <span>Features</span>
                </div>
            </figure>
            <figure class="flex flex-col gap-4">
                <span class="font-semibold">Community</span>
                <div class="flex flex-col gap-4">
                    <span>Help Center</span>
                    <span>Login</span>
                    <span>Signup</span>
                    <span>Home</span>
                </div>
            </figure>
            <figure class="flex flex-col gap-4">
                <span class="font-semibold">Community</span>
                <div class="flex flex-col gap-4">
                    <span>Help Center</span>
                    <span>Login</span>
                    <span>Signup</span>
                    <span>Home</span>
                </div>
            </figure>
        </div>
    </div>

    <div
        class="text-secondary font-medium text-xs flex flex-col lg:flex-row items-center gap-4"
    >
        <span>© 2024 Naija Companies. All rights reserved. </span>
        <span class="lg:inline hidden">|</span>
        <div class="flex gap-4">
            <span>Legal</span>
            <span>Cookies</span>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
        </div>
    </div>
</section>
