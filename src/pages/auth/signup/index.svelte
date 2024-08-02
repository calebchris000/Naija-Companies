<script lang="ts">
    import Navbar from "@src/components/navbar/navbar.svelte";
    import Input from "@src/components/Input/index.svelte";
    import Button from "@src/components/Input/button.svelte";
    import Review from "./components/review.svelte";
    import Reviews from "./components/reviews.svelte";
    import { LocalStorage } from "@src/core/utils/utils";
    import { Notification } from "@src/utils/notification";
    import { onMount } from "svelte";
    import { Signup } from "@src/core/api/auth";
    import { navigate } from "svelte-routing";

    $: submittable = false;
    $: signup_status = "inactive" as
        | "inactive"
        | "pending"
        | "success"
        | "failure";

    $: default_values = {
        full_name: "",
        username: "",
        email_address: "",
        password: "",
    } as {
        full_name: string;
        username: string;
        email_address: string;
        password: string;
    };

    $: checks = {
        full_name: { valid: true, reason: "" },
        username: { valid: true, reason: "" },
        email_address: { valid: true, reason: "" },
        password: { valid: true, reason: "" },
    };

    const notification = new Notification();
    const local_storage = new LocalStorage();
    const inputs = new Map<string, string>([
        ["full_name", ""],
        ["email_address", ""],
        ["username", ""],
        ["password", ""],
    ]);

    function saveInputValues() {
        const local_storage = new LocalStorage();
        let storageObject = local_storage.getItem("userInputs", false);

        if (!storageObject) {
            storageObject = {};
        }

        inputs.forEach((value, key) => {
            if (key !== "password" && value) {
                storageObject[key] = value;
            }
        });

        local_storage.setItem("userInputs", storageObject);
    }

    function checkInputs() {
        if (typeof saveInputValues === "function") {
            saveInputValues();
        }
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
                reason: "Minimum of 4 characters long",
            };
        } else if (checks.username) {
            checks.username = {
                valid: true,
                reason: "",
            };
        }

        const emailValue = inputs.get("email_address") || "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue && !emailRegex.test(emailValue) && emailValue.length) {
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
        if (passwordValue.length < 6 && passwordValue.length) {
            checks.password = {
                valid: false,
                reason: "Password must be at least 6 characters long",
            };
        } else if (!passwordRegex.test(passwordValue) && passwordValue.length) {
            checks.password = {
                valid: false,
                reason: "Uppercase, lowercase, a special character",
            };
        } else if (
            usernameValue &&
            passwordValue.toLowerCase() === usernameValue.toLowerCase()
        ) {
            checks.password = {
                valid: false,
                reason: "Password cannot be the same as username",
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
    async function handleSubmit() {
        signup_status = "pending";
        submittable = false;
        const to_object: any = Object.fromEntries(inputs);
        const fullNameParts = to_object.full_name.split(" ");
        to_object.firstName = fullNameParts[0];
        to_object.lastName = fullNameParts[1];
        to_object.email = to_object.email_address;
        to_object.userName = to_object.username;
        delete to_object.full_name;
        delete to_object.email_address;
        delete to_object.username;

        const credentials: {
            firstName: string;
            lastName: string;
            email: string;
            userName: string;
            password: string;
        } = to_object;

        const response = await Signup(credentials);
        const { status, data } = response;

        if (status !== 201) {
            const r = response.data as any;
            notification.error({
                text: r ?? "The email address or username is already in use.",
            });
            signup_status = "failure";
            return;
        }
        signup_status = "success";
        local_storage.setItem("user", response.data?.data);
        local_storage.setItem("step", "/signup/verify-otp");

        setTimeout(() => {
            navigate("/signup/verify-otp");
        }, 2000);
    }

    $: {
        if (signup_status === "failure") {
            setTimeout(() => {
                signup_status = "inactive";
                submittable = true;
            }, 3000);
        }
    }

    onMount(() => {
        const local_storage = new LocalStorage();
        const current_step = local_storage.getItem("step", true);
        if (!current_step) {
            local_storage.setItem("step", "/signup");
        } else if (current_step !== "/signup") {
            navigate(current_step);
        }

        const storageObject = local_storage.getItem("userInputs", false);
        if (storageObject) {
            Object.entries(storageObject).forEach(([key, value]) => {
                if (key in default_values) {
                    (default_values as Record<string, string>)[key] =
                        value as string;
                }
                inputs.set(key, value as string);
            });
        }
    });
</script>

<figure class="bg-secondary lg:overflow-hidden max-w-[120rem] lg:mx-auto">
    <Navbar
        disabled={true}
        use_dark_logo={true}
        className="top-[0!important] bg-secondary"
    />

    <section
        class="bg-secondary w-full h-full px-4 lg:grid lg:gap-[10rem] lg:px-10 lg:grid-cols-2"
    >
        <div class="w-full space-y-4">
            <span class="text-3xl text-primary font-medium"
                >Create An Account</span
            >

            <div class="space-y-4 lg:max-w-[40rem]">
                <Input
                    check={checks.full_name}
                    on:input={handleInput}
                    label="Full Name"
                    defaultValue={default_values.full_name}
                    placeholder="First and last name in order"
                />
                <Input
                    check={checks.username}
                    on:input={handleInput}
                    label="Username"
                    defaultValue={default_values.username}
                    placeholder="Minimum of 4 characters"
                />
                <Input
                    check={checks.email_address}
                    on:input={handleInput}
                    type="email"
                    label="Email Address"
                    defaultValue={default_values.email_address}
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
                    on:click={handleSubmit}
                    className="mt-2"
                    style="background-color: {signup_status === 'success'
                        ? 'green'
                        : signup_status === 'failure'
                          ? 'red'
                          : ''}"
                    name={signup_status === "pending"
                        ? "Creating Account..."
                        : signup_status === "success"
                          ? "Account Successfully Created!"
                          : signup_status === "failure"
                            ? "Account Creation Failure!"
                            : "Create Account"}
                    type="max"
                />
                <span
                    class="w-fit ms-auto text-sm font-normal text-primary block mt-[10px!important] p-0"
                    >Already have an account? <a
                        class="underline font-medium"
                        href="/login">Login</a
                    ></span
                >
            </div>
        </div>
        <div
            class="xl:h-[85vh] h-fit xl:max-h-[40rem] max-w-[30rem] ms-auto bg-accent rounded-lg p-8 flex-col gap-2 hidden lg:flex"
        >
            <div class="flex flex-col gap-2">
                <span
                    class="text-primary text-3xl font-semibold block w-[340px] leading-normal xl:4xl 2xl:w-full"
                    >Start Your Journey With Us</span
                >
                <span class="text-primary leading-relaxed"
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
