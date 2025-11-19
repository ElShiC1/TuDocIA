import { getPaginationRange } from "@/lib/utils/getPaginationRange";
import Link from "next/link";

export const Pagination = ({ limit, currentPage }: { limit: number, currentPage: number }) => {
    const pages = getPaginationRange(limit, currentPage)

    return (
        <div className="flex justify-center items-center gap-2">
            {pages.map((page, idx) =>
                typeof page === "number" ? (
                    <Link href={`?page=${page}`} className="no-underline" key={page}>
                        <div
                            key={page}
                            className={`page w-8 h-8 flex items-center justify-center rounded-4xl font-semibold ${page === currentPage
                                ? "bg-blue-500 text-white dark:bg-blue-800"
                                : "bg-gray-400 text-white dark:bg-gray-600/50"
                                }`}
                        >
                            {page}
                        </div>
                    </Link>

                ) : (
                    <div key={`dots-${idx}`} className="page w-8 h-8 flex items-center justify-center text-gray-400">
                        ...
                    </div>
                )
            )}
        </div>
    );
};