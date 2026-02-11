"use client";
import { useEffect } from "react";

export function useStickySidebar() {
    useEffect(() => {
        if (window.innerWidth < 1024) return; // disable on mobile

        const sidebar = document.getElementById("stickySidebar");
        const container = document.getElementById("serviceLayout");
        const stopEl = document.getElementById("stickyStop");

        if (!sidebar || !container || !stopEl) return;

        const offsetTop = 160;

        const onScroll = () => {
            const sidebarHeight = sidebar.offsetHeight;
            const containerRect = container.getBoundingClientRect();
            const stopRect = stopEl.getBoundingClientRect();

            if (
                containerRect.top <= offsetTop &&
                stopRect.top > sidebarHeight + offsetTop
            ) {
                sidebar.className =
                    "fixed top-[140px] w-[300px] bg-gray-100 p-6 rounded-lg border shadow-sm";
            } else if (stopRect.top <= sidebarHeight + offsetTop) {
                sidebar.className =
                    "absolute bottom-0 w-[300px] bg-gray-100 p-6 rounded-lg border shadow-sm";
            } else {
                sidebar.className =
                    "bg-gray-100 p-6 rounded-lg border shadow-sm";
            }
        };

        onScroll(); // Run once on mount in case we start scrolled
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
}