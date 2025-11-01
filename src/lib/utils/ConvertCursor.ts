export const ConvertCursor = ({ total, limit }: { total: number, limit: number }, page: number) => {
    const limitPage = Math.ceil(total / limit)

    return {
        limit: limitPage,
        currentPage: page,
        next: page < limitPage
    }
}