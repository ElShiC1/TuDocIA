export const getPaginationRange = (limit: number, currentPage: number) => {
        const pages: (number | string)[] = [];
        if (limit <= 7) {
            // Si hay pocas páginas, muéstralas todas
            for (let i = 1; i <= limit; i++) pages.push(i);
        } else {
            // Siempre muestra la primera página
            pages.push(1);

            // Si currentPage está lejos del inicio, muestra ...
            if (currentPage > 5) pages.push("...");

            // Páginas alrededor del currentPage
            let start = Math.max(2, currentPage - 3);
            let end = Math.min(limit - 1, currentPage + 3);
            console.log({ start, end, currentPage, limit });
            // Ajusta para los extremos
            if (currentPage <= 5) {
                console.log('paso por aqui weones 1')
                start = 2;
                end = 7;
            }
            if (currentPage >= limit - 4) {
                console.log('paso por aqui weones 2')
                start = limit - 6;
                end = limit;
            }

            for (let i = start; i <= end; i++) {
                if (i > 1 && i < limit) pages.push(i);
            }

            // Si currentPage está lejos del final, muestra ...
            if (currentPage < limit - 4) pages.push("...");

            // Siempre muestra la última página
            pages.push(limit);
        }
        return pages;
    };