import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import Heading from './Heading';

const Header = () => {
    const [params, setParams] = useSearchParams({});
    const [currentPage, setCurrentPage] = useState<string|null>();
    useEffect(()=> {
        setCurrentPage(params.has("p") ? params.get("p") : "1");
    }, [params])
    return (
        <>
            <Heading level="1" text="A big list of books" />
            <Heading level="2" text={`Page ${currentPage}`} />
        </>
    );
};

export default Header;