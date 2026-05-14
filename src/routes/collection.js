import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { shopifyFetch } from '../lib/utils';
import { GQL_QUERY_COLLECTION } from '../lib/graphql';
import { PRODUCTS_PER_PAGE } from '../lib/CONST';
import CollectionLoader from '../components/CollectionLoader';
import ProductsGrid from '../components/ProductsGrid';
export default function Collection() {
    const { handle } = useParams();
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState({});
    useEffect(() => {
        const variables = {
            handle: handle,
            first: PRODUCTS_PER_PAGE,
            after: null,
        }
        getCollection(variables);
    }, [handle]);
    const getCollection = async (variables) => {
        try {
            setLoading(true);
            const query = GQL_QUERY_COLLECTION;
           
            const response = await shopifyFetch(query, variables);
            const {data,errors} = await response.json();

            console.log(data);
            setCollection(data.collection);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
        // console.log(data);
    }
    const handlePrevious = async () => {
        if (!pageInfo?.hasPreviousPage) return;
        const variables = {
            handle: handle,
            last: PRODUCTS_PER_PAGE,
            before: collection.products.pageInfo.startCursor,
        }
        getCollection(variables);
    }
    const handleNext = async () => {
        if (!pageInfo?.hasNextPage) return;
        const variables = {
            handle: handle,
            first: PRODUCTS_PER_PAGE,
            after: collection.products.pageInfo.endCursor,
        }
        getCollection(variables);
    }
    

    if(loading) return <CollectionLoader />;
    if(!collection?.title) return <div>Collection not found</div>;
    const { products, title } = collection;
    const { pageInfo } = products;
    return (
        <div className='py-8 max-w-7xl mx-auto'>
            <h1 className='text-2xl font-bold mb-8'>{collection.title}</h1>
        
             <ProductsGrid products={products.edges} />

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