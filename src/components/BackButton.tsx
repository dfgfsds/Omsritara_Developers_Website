"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="inline-block px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition cursor-pointer"
        >
            Back
        </button>
    );
}
