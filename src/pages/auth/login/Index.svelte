<script lang="ts">
    import Navbar from "@src/components/navbar/Index.svelte";
    import Input from "@src/components/Input/index.svelte";
    import man_on_pc from "@src/assets/signup/man_on_pc.png";
    import user from "@src/assets/user.png";
    import padlock from "@src/assets/padlock.png";
    import Arrow from "@src/assets/svg/Arrow.svelte";
    import { Notification } from "@src/utils/notification";
    import { Login } from "@src/core/api/auth";
    import { navigate } from "svelte-routing";
    import Action from "@src/components/action/action.svelte";
    import { store } from "@src/lib/store";

    localStorage.clear();

    $: login_status = "not_logged_in";
    let inputValues: Map<string, string> = new Map();

    async function handleLogin() {
        const notification = new Notification();

        const user = inputValues.get("Username or Email");
        const password = inputValues.get("Password");

        if (!user) {
            notification.error({ text: "Username or email must be provided" });
            return;
        }

        if (!password) {
            notification.error({ text: "Password cannot be empty" });
            return;
        }
        login_status = "pending";
        try {
            const response = await Login({ user, password });

            if (response.status !== 200) {
                login_status = "failure";
                notification.error({
                    text: response.data?.message ?? "Please try again later",
                });
                return;
            }
            login_status = "success";
            notification.success({ text: `Welcome back, ${user}` });
            localStorage.setItem("token", response.data.data.token);
            const { id, firstName, lastName, role, email, userName } =
                response.data.data;

            localStorage.setItem(
                "user",
                JSON.stringify({
                    id,
                    firstName,
                    role,
                    lastName,
                    email,
                    userName,
                }),
            );

            setTimeout(() => {
                if (["sub-admin", "admin"].includes(role)) {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/home");
                }
            }, 2000);
        } catch (error: any) {
            login_status = "failure";
            if (error.response) {
                notification.error({ text: error.response?.data?.message });
            } else {
                notification.error({ text: "Please try again later" });
            }
        }
    }

    $: {
        if (login_status === "failure") {
            setTimeout(() => {
                login_status = "not_logged_in";
            }, 2000);
        }
    }
</script>

<section class="space-y-8 lg:space-y-0">
    {#if $store.device === "mobile"}
        <div class="flex items-center gap-6 mx-4 mt-10">
            <Action custom_path="/home" title="Sign in your account" />
        </div>
    {/if}
    <Navbar>
        <div></div>
    </Navbar>
    <div
        class="px-6 py-5 mx-4 flex flex-col gap-4 bg-orange-50 rounded-[1.6rem] lg:w-[30vw] lg:mx-auto lg:translate-y-32"
    >
        <img class="w-[50%] mx-auto rounded-3xl" src={man_on_pc} alt="" />
        <Input
            on:input={(data) => {
                const { label, value } = data.detail;
                inputValues.set(label, value);
            }}
            type="text"
            placeholder="Username or Email"
            label="Username or Email"
            icon={user}
        />
        <Input
            on:input={(data) => {
                const { label, value } = data.detail;
                inputValues.set(label, value);
            }}
            type="password"
            placeholder="Password"
            label="Password"
            icon={padlock}
            icon_class="w-4"
        />

        <button
            on:click={handleLogin}
            style="background-color: {login_status === 'pending'
                ? '#6b7280'
                : login_status === 'success'
                  ? '#22c55e'
                  : login_status === 'failure'
                    ? '#ef4444'
                    : '#ea580c'}"
            class="p-4 w-full transition-all block rounded-xl bg-orange-600 font-medium mt-5 text-white"
            type="button"
            >{login_status === "pending"
                ? "Authenticating"
                : login_status === "success"
                  ? "Login Successful!"
                  : login_status === "failure"
                    ? "Login Failed"
                    : "Login"}</button
        >
        <span class="text-sm text-center"
            >Don't have an account? <a
                class="font-medium text-orange-600"
                href="/signup">Sign up</a
            ></span
        >
    </div>
</section>

<svelte:head>
    <title>Login To Your Account</title>
</svelte:head>
