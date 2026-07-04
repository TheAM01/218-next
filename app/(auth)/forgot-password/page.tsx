export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                        Forgot password
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Enter your email and we&apos;ll send you a reset link
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none text-neutral-900"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                        />
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                    >
                        Send reset link
                    </button>
                </div>

                <p className="text-center text-sm text-neutral-500">
                    Remember your password?{" "}
                    <a
                        href="/login"
                        className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                    >
                        Back to sign in
                    </a>
                </p>
            </div>
        </div>
    );
}