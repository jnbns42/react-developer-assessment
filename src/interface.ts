export interface Root {
    posts: Post[]
}
  
export interface Post {
    id: string
    title: string
    publishDate: string
    author: Author
    summary: string
    categories: Category[]
}

export interface Author {
    name: string
    avatar: string
}

export interface Category {
    id: string
    name: string
}

export interface PaginatedPosts { 
    totalPages: number, 
    pages: Post[][] 
} 