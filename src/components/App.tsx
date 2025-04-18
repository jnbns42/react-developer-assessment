
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { styled, css } from 'styled-components';

import Header from './Header';
import Book from './Book';

import Paginate from '../util/paginate';

import { Post, PaginatedPosts, Author, Category } from '../interface';

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

const PagerItem = styled.li``

const App: React.FC = () => {
  
  const PAGE_SIZE = 6;

  const [data, setData] = useState<Post[]>(); // Original data from API
  const [dataFetched, setDataFetched] = useState<boolean>(false); // Bool
  const [paginatedData, setPaginatedData] = useState<PaginatedPosts>(); // Paginated data
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const pagerClickHandler = (page: number) => {
    setParams({p: page.toString()});
    setCurrentPage(page);
  }

  const pagerItems = () => {
    const elems: Array<any> = [];
    
    if (paginatedData) {
      for (let i = 0; i < paginatedData?.totalPages - 1; i++) {
        elems.push( <li>
          <button onClick={(event: any) => pagerClickHandler(i + 1)}>{ i + 1 }</button>
        </li>)
      }
    }
    return elems;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('/api/posts');
        if(!resp.ok) {
          setData([]);
          throw new Error(`Error: ${resp.status}`);
        }
        const bookData = await resp.json();
        setData(bookData.posts);
        setDataFetched(true); // set boolean stating data fetched
      } catch {
        setData([]);
        console.error('Data fetch failed');
      }
    };

    // if we have not yet retrieved data, get it...
    if (!dataFetched) {
      fetchData();

    // if we have retrieved data, paginate it...
    } else if (paginatedData == undefined) {
      setPaginatedData(Paginate(data, PAGE_SIZE));
      setCurrentPage(params.has('p') ? parseInt(params.get('p') || '1') : 1);
      setParams({p: currentPage.toString()});
    }
  }, [location, data])

  return (
    <div>
      <Header/>
        <List>
            {paginatedData?.pages[currentPage]?.map((book, index) => <ListItem key={index}><Book delay={index} title={book.title} /></ListItem>)}
          </List>
          <Pager>
              {pagerItems()}
          </Pager>
    </div>
  );
};

export default App;
