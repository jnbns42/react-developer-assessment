
import { useState, useEffect, createRef, useMemo, ChangeEvent, SetStateAction } from 'react';
import { useSearchParams } from 'react-router';
import { styled, css } from 'styled-components';

import Header from './Header';
import Book from './Book';

import Paginate from '../util/paginate';

import { Post, PaginatedPosts } from '../interface';
import { getCategories, filterPosts } from '../util/filters';

// Simple CSS reset for lists
const listReset = css`
  list-style: none;
  padding: 0;
  margin: 0;
  text-indent: 0;
`

const List = styled.ul`
  ${listReset}
  list-style: none;
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1024px;
  gap: 10px;
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 480px) {
    grid-template-columns: auto;
  }
`

const ListItem = styled.li`
  box-sizing: border-box;
`

const Pager = styled.ul`
  ${listReset}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PagerItem = styled.button`
  background: none;
  border: none;
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
`

const Filters = styled.div`
  margin: 30px auto;
  display: block;
  width: fit-content;
  background: #487BB5;
  border: 1px solid var(--white);
  border-radius: .5em;
  position: relative;
  select {
    background: transparent;
    color: var(--white);
    appearance: none;
    padding: 5px 30px 5px 10px;
    border: none;
    font-weight: 600;
    option {
      color: var(--black);
    }
  }
  &::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: #fff;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
`

const App: React.FC = () => {
  
  const PAGE_SIZE = 6;

  const [paginatedData, setPaginatedData] = useState<PaginatedPosts>(); // Paginated data
  const [params, setParams] = useSearchParams({});

  // Retrieve page query param and store it...properly 
  const [currentPage, setCurrentPage] = useState<number>(parseInt(params.get("p") || "1"));
  const [category, setCategory] = useState<string>(params.get("cat") || "");
  const [filterOptions, setFilterOptions] = useState<Array<string>>();
  
  const listRef = createRef<any>();

  const pagerClickHandler = (page: number) => {
    const list = listRef.current;

    list.classList.add('hide');
    setParams({p: page.toString()});
    
    setTimeout(() => {
      setCurrentPage(page);
      list.classList.remove('hide');
    }, 500)
  }

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setParams({cat: e.target.value});
    setCategory(e.target.value)
  }

  const pagerItems = () => {
    const elems: Array<React.ReactNode> = [];
    
    if (paginatedData) {
      for (let i = 0; i <= paginatedData?.totalPages - 1; i++) {
        elems.push( <li>
          <PagerItem data-testid={`data-testid="button-page-${i+1}"`} onClick={(event: any) => pagerClickHandler(i + 1)}>{ i + 1 }</PagerItem>
        </li>)
      }
    }
    return elems;
  }

  /**
   * So, big comment here as I imagine you are going to check through commits and ask "why this massive change"?
   * 
   * Originally I defined fetchData() and ran it in useEffect, using a boolean
   * to check if it had run, but couldn't shake the feeling it felt off...
   * 
   * Remembered useMemo might be a better option to cache the data after filtering,
   * and that an effect is not needed at all for the initial fetch.
   * 
   **/ 

  const fetchData = async () => {
    try {
      const resp = await fetch('/api/posts');
      if(!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }
      const bookData = await resp.json();
      return bookData.posts;
    } catch {
      console.error('Data fetch failed');
      return false;
    }
  };

  const data = useMemo(() => fetchData(), []);
  
  const filteredData = useMemo(async () => {
    //setCurrentPage(0); // reset to page one in case we try to accidentally navigate to a page that does not exist...
    let filteredData = await data;
    if (category !== "") {
      filteredData = filterPosts(filteredData, category);
    }
    return filteredData;
  }, [category])

  const filters = useMemo(async () => {
    const categories = getCategories(await data)
    return categories
  }, [data])

  useEffect(() => {
    filteredData.then(data => setPaginatedData(Paginate(data, PAGE_SIZE)));
    filters.then(data => setFilterOptions(data));
  }, [filteredData, currentPage])

  return (
    <div>
      <Header/>
      <Filters>
        <select onChange={(e) => handleFilterChange(e)}>
          <option>-- Select Category --</option>
          {
            filterOptions?.map(option => <option selected={option == category} value={option}>{option}</option>)
          }
        </select>
      </Filters>  
      <List ref={listRef}>
        {paginatedData?.pages[currentPage - 1]?.map((book, index) => <ListItem className='library__book' key={index}><Book delay={index} title={book.title} author={book.author.name} categories={book.categories}/></ListItem>)}
      </List>
      <Pager>
          {pagerItems()}
      </Pager>
    </div>
  );
};

export default App;
