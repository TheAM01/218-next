import { createUser } from "@/actions/auth";

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                        Create an account
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Enter your details to get started
                    </p>
                </div>

                <form action={createUser} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none text-neutral-900"
                        >
                            Full name
                        </label>
                        <input
                            name="fullName"
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none text-neutral-900"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium leading-none text-neutral-900"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                    >
                        Create account
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-neutral-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-neutral-400">Or continue with</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex h-10 w-full items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                >
                    Google
                </button>

                <p className="text-center text-sm text-neutral-500">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}