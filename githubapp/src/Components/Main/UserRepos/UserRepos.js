import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './UserRepos.css';

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
            currentItems.map((item, index) => (
                <div className='user-repo'
                     key={index}>
                    {item}
                </div>
            ))}
        </>
    );
}

export default function UserRepos({ itemsPerPage, userRepos }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const items = [...userRepos].reverse().map((repo) => {
        return (
            <>
                <a href={repo.html_url}
                   target='_blank'
                   rel="noopener noreferrer"
                   title='Open User repository'>
                    <h2>{repo.name}</h2>
                </a>
                <p>{repo.description}</p>
            </>
        )
    });

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
        // eslint-disable-next-line
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    const pages = `${itemOffset} - ${itemOffset + itemsPerPage > userRepos.length ? userRepos.length : itemOffset + itemsPerPage} of ${userRepos.length} items`;

    return (
        <>
            <div className='repos-list'>
                <Items currentItems={currentItems} />
            </div>
            <div className='pagination'>
                <div className='pages'>
                    {pages}
                </div>
                <ReactPaginate
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="< "
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="page-item-active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}