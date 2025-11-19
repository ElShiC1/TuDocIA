export const getPaginationRange = (limit: number, currentPage: number) => {
        const pages: (number | string)[] = [];
        if (limit <= 7) {
            for (let i = 1; i <= limit; i++) pages.push(i);
        } else {

            pages.push(1);

            if (currentPage > 5) pages.push("...");

            let start = Math.max(2, currentPage - 3);
            let end = Math.min(limit - 1, currentPage + 3);
 
            if (currentPage <= 5) {
                start = 2;
                end = 7;
            }
            if (currentPage >= limit - 4) {
                start = limit - 6;
                end = limit;
            }

            for (let i = start; i <= end; i++) {
                if (i > 1 && i < limit) pages.push(i);
            }


            if (currentPage < limit - 4) pages.push("...");


            pages.push(limit);
        }
        return pages;
    };