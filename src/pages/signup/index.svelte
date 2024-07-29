<script lang="ts">
    import Navbar from "@src/components/navbar/navbar.svelte";
    import Input from "@src/components/Input/index.svelte";
    import Button from "@src/components/Input/button.svelte";
    import Review from "./components/review.svelte";
    import Reviews from "./components/reviews.svelte";

    $: submittable = false;

    $: checks = {
        full_name: { valid: true, reason: "" },
        username: { valid: true, reason: "" },
        email_address: { valid: true, reason: "" },
        password: { valid: true, reason: "" },
    };

    const inputs = new Map<string, string>([
        ["full_name", ""],
        ["email_address", ""],
        ["username", ""],
        ["password", ""],
    ]);

    function checkInputs() {
        const fullNameValue = inputs.get("full_name") || "";
        const fullNameWords = fullNameValue.trim().split(/\s+/);

        if (fullNameWords.length !== 2 && fullNameValue.length) {
            checks.full_name = {
                valid: false,
                reason: "Full name must contain exactly two words",
            };
        } else {
            checks.full_name = {
                valid: true,
                reason: "",
            };
        }

        const usernameValue = inputs.get("username") || "";
        if (
            checks.username &&
            usernameValue.length < 4 &&
            usernameValue.length
        ) {
            checks.username = {
                valid: false,
                reason: "Username must be at least 4 characters long",
            };
        } else if (checks.username) {
            checks.username = {
                valid: true,
                reason: "",
            };
        }

        const emailValue = inputs.get("email_address") || "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue) && emailValue.length) {
            checks.email_address = {
                valid: false,
                reason: "Please enter a valid email address",
            };
        } else {
            checks.email_address = {
                valid: true,
                reason: "",
            };
        }
        const passwordValue = inputs.get("password") || "";
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        if (passwordValue.length < 6) {
            checks.password = {
                valid: false,
                reason: "Password must be at least 6 characters long",
            };
        } else if (!passwordRegex.test(passwordValue) && passwordValue.length) {
            checks.password = {
                valid: false,
                reason: "Uppercase, lowercase, and a special character is required",
            };
        } else {
            checks.password = {
                valid: true,
                reason: "",
            };
        }
        submittable =
            Array.from(inputs.values()).every((value) => value.length > 0) &&
            Object.values(checks).every((check) => check.valid);
    }

    function handleInput(data: { detail: { label: string; value: string } }) {
        const object = data.detail;

        const key = object.label?.toLowerCase().replace(/\s/g, "_");
        if (key && inputs.has(key)) {
            inputs.set(key, object.value);
        }

        checkInputs();
    }
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
                    check={checks.full_name}
                    on:input={handleInput}
                    label="Full Name"
                    placeholder="First and last name in order"
                />
                <Input
                    check={checks.username}
                    on:input={handleInput}
                    label="Username"
                    placeholder="Minimum of 4 characters"
                />
                <Input
                    check={checks.email_address}
                    on:input={handleInput}
                    type="email"
                    label="Email Address"
                    placeholder="Valid email is required"
                />
                <Input
                    check={checks.password}
                    on:input={handleInput}
                    type="password"
                    label="Password"
                    placeholder="Minimum of 6 characters. Make it unique"
                />
                <Button
                    disabled={!submittable}
                    on:click={() => {
                        console.log(inputs);
                    }}
                    className="mt-2"
                    name="Create Account"
                    type="max"
                />
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
            class="xl:h-[85vh] h-fit xl:max-h-[40rem] max-w-[30rem] ms-auto bg-skyblue rounded-lg p-8 flex-col gap-2 hidden lg:flex"
        >
            <div class="flex flex-col gap-2">
                <span
                    class="text-light text-3xl font-semibold block w-[340px] leading-normal xl:4xl 2xl:w-full"
                    >Start Your Journey With Us</span
                >
                <span class="text-light leading-relaxed"
                    >Discover 1000+ fresh startups and explore real user
                    opinions about them.</span
                >
            </div>

            <div class="lg:mt-auto h-fit flex flex-col gap-6">
                <Reviews />
            </div>
        </div>
    </section>
</figure>
