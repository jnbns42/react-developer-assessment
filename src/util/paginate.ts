import { Post, PaginatedPosts } from '../interface';

const Paginate = (data: Post[] | undefined, pageSize = 9) => {
    const totalPages: number = Math.ceil((data?.length ?? 0) / pageSize);

    const paginatedData: PaginatedPosts = {
        totalPages: totalPages,
        pages: []
    };

    for (let i = 0; i < totalPages; i++) {
        const startIndex = i * pageSize;
        const endIndex = startIndex + pageSize;
        const page = data?.slice(startIndex, endIndex) ?? [];
        paginatedData.pages.push(page);
    }

    return paginatedData as PaginatedPosts;
};

export default Paginate;