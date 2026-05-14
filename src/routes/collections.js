import { useState, useEffect } from 'react';
import { shopifyFetch } from '../lib/utils';
import { GQL_QUERY } from '../lib/graphql';
import { Link } from 'react-router-dom';
import { COLLECTIONS_PER_PAGE } from '../lib/CONST';
function Collections() {

    // const [after, setAfter] = useState(null);
    // const [hasNextPage, setHasNextPage] = useState(false);
    const [collections, setCollections] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);

    useEffect(() => {
          const  variables = {
            first: COLLECTIONS_PER_PAGE,
            after: null,
          }

          getCollections(variables);
    }, []);
    const getCollections = async (variables) => {
        try {
            const query = GQL_QUERY;
            const response = await shopifyFetch(query, variables);
            const {data,errors} = await response.json();
            console.log(data);
            if (errors) {
                console.error('Errors:', errors);
            }
            if (data) {
                setCollections(data.collections.edges);
                setPageInfo(data.collections.pageInfo);
                // setHasNextPage(data.collections.pageInfo.hasNextPage);
                // setAfter(data.collections.pageInfo.endCursor);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handlePrevious = async () => {
        if (!pageInfo?.hasPreviousPage) return;
        const variables = {
            last: COLLECTIONS_PER_PAGE,
            before: pageInfo?.startCursor,
        }
        getCollections(variables);
    }
    const handleNext = async () => {
        if (!pageInfo?.hasNextPage) return;
        const variables = {
            first: COLLECTIONS_PER_PAGE,
            after: pageInfo?.endCursor,
        }
        getCollections(variables);
    }
    return (
        <div className='py-8 max-w-7xl mx-auto'>
            <h1 className='text-2xl font-bold mb-8'>Collections</h1>
            <div className='grid grid-cols-4 gap-4'>
                {collections.map(({node}) => (
                    <div key={node.id} className='border border-gray-200 rounded-md p-4'>
                        <Link to={`/collections/${node.handle}`}>   
                        <img src={node?.image?.url} alt={node.title} />
                        <h2>{node.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
            {pageInfo && (
            <div className='flex justify-center items-center gap-4 mt-4'>

                <div className='flex justify-center mt-4'>
                    <button className={`min-w-24 bg-blue-500 text-white p-2 rounded-md ${!pageInfo?.hasPreviousPage ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePrevious} disabled={!pageInfo?.hasPreviousPage}>Previous</button>
                </div>
                <div className='flex justify-center mt-4'>
                    <button className={`min-w-24 bg-blue-500 text-white p-2 rounded-md ${!pageInfo?.hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleNext} disabled={!pageInfo?.hasNextPage}>Next</button>
                </div>
            </div>
            )}
        </div>
    );
}

export default Collections;