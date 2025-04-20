import { Post } from '../interface';

/**
 * Utility to work out unique categories for our list of selectable filters.
 * @param data Our API data
 */
export const getCategories = (data: Post[]) => {
    // Use a set, not an array, so we make sure these are unique....
    const categorySet: Set<string> = new Set();
    
    data.forEach(data => {
        data.categories.forEach(category => {
            categorySet.add(category.name);
        });
    });
    // return our set as an array
    return Array.from(categorySet);
}