"use client";
import { useStickySidebar } from "@/hooks/useStickySidebar";

export default function ServiceLayout({
    left,
    right,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
}) {
    useStickySidebar();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <div
                id="serviceLayout"
                className="relative flex gap-10"
            >
                <div className="flex-1">
                    {left}
                </div>

                <aside className="hidden lg:block w-[300px] flex-shrink-0 relative">
                    <div
                        id="stickySidebar"
                        className="bg-gray-100 p-6 rounded-lg border shadow-sm"
                    >
                        {right}
                    </div>
                </aside>

                <div
                    id="stickyStop"
                    className="absolute bottom-0 left-0 w-[300px] h-0"
                />
            </div>
        </div>
    );
}