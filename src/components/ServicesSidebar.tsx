import Link from "next/link";
import { services } from "@/data/services";

export default function ServicesSidebar({
    activeId,
}: {
    activeId: number;
}) {
    return (
        <>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-[#9b0000] pl-4">
                Our Services
            </h3>

            <ul className="space-y-3">
                {services.map((s) => {
                    const Icon = s.icon;
                    return (
                        <li key={s.id}>
                            <Link
                                href={`/services/${s.id}`}
                                className={`flex items-center gap-3 p-4 rounded-lg transition ${s.id === activeId
                                    ? "bg-[#9b0000] text-white"
                                    : "bg-white hover:bg-[#9b0000] hover:text-white"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {s.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}