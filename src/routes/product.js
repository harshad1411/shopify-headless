import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { shopifyFetch, addToCart } from '../lib/utils';
import { GQL_QUERY_PRODUCT, CART_LINE_ADD } from '../lib/graphql';

function Product({renderCartData, cartId, setShowCart}) {
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { handle } = useParams();
    console.log(handle);

    useEffect(() => {
        const variables = {
            handle: handle
        }
        getProduct(variables);
    }, [handle]);
    const getProduct = async (variables) => {
        const response = await shopifyFetch(GQL_QUERY_PRODUCT, variables);
        const { data, errors } = await response.json();
        console.log(data);
        const selectedFirstAvailableVariant = data.product?.availableForSale ? data.product.variants.edges.find(({ node }) => node.availableForSale) : data.product.variants.edges[0];
        console.log("selectedFirstAvailableVariant", selectedFirstAvailableVariant);
        setProduct(data.product);
        setSelectedVariant(selectedFirstAvailableVariant.node);
    }

    const handleVariantChange = (value, index) => {
        if (product.options.length == 1) {
            const newSelectedVariant = product.variants.edges.find(({ node }) => node.selectedOptions[0].value == value);
            setSelectedVariant(newSelectedVariant.node);
        } else if (product.options.length == 2) {

            let option1Value = selectedVariant.selectedOptions[0].value;
            let option2Value = selectedVariant.selectedOptions[1].value;

            if (index == 0) {
                option1Value = value;
            } else {
                option2Value = value;
            }
            const newSelectedVariant = product.variants.edges.find(({ node }) => node.selectedOptions[0].value == option1Value && node.selectedOptions[1].value == option2Value);
            setSelectedVariant(newSelectedVariant.node);
            // const newSelectedVariant = product.variants.edges.find(({node}) =>  node.selectedOptions[0].value == value && node.selectedOptions[1].value == value);

        } else if (product.options.length == 3) {

            let option1Value = selectedVariant.selectedOptions[0].value;
            let option2Value = selectedVariant.selectedOptions[1].value;
            let option3Value = selectedVariant.selectedOptions[2].value;


            if (index == 0) {
                option1Value = value;
            } else if (index == 1) {
                option2Value = value;
            } else {
                option3Value = value;
            }
            const newSelectedVariant = product.variants.edges.find(({ node }) => node.selectedOptions[0].value == option1Value && node.selectedOptions[1].value == option2Value && node.selectedOptions[2].value == option3Value);
            setSelectedVariant(newSelectedVariant.node);

        }
        // setSelectedVariant({...selectedVariant, selectedOptions: [...selectedVariant.selectedOptions, {name: index, value: value}]});
    }
    const handleAddToCart = async() => {
        const payload = {cartId: cartId, lines: [{merchandiseId: selectedVariant.id, quantity: 1}]}
        const data = await addToCart(payload);
        renderCartData(data.data.cartLinesAdd.cart.id);
        setShowCart(true);
    }
    if (!product || !selectedVariant) return <div>Loading...</div>;
    return (
        <div className='py-8 max-w-7xl mx-auto'>
            <div className='flex gap-8'>
                <div className='w-1/2'>
                    <div className="flex gap-2">
                        <div className='flex'>
                            <div>
                                <div className='w-[104px] flex flex-wrap gap-2'>
                                    {product?.images?.edges?.length > 0 &&

                                        product.images.edges.map((image) => {
                                            return (
                                                <div className='w-[48px]'>
                                                    <img src={image.node.url} alt={image.node.altText} className='w-full h-auto' />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>

                        <div>
                            {product?.images?.edges?.length > 0 && <img src={product.images.edges[0].node.url} alt={product.title} />}
                        </div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <h1 className='text-2xl font-bold mb-4'>{product.title}</h1>
                    <p>{product.price}</p>
                    <p>{product.compareAtPrice}</p>

                    <div className='variants'>
                        {product.options.map((option, index) =>
                            <div className='option mb-4'>
                                <h2 className='text-sm font-bold mb-2'>{option.name}</h2>
                                <div className='swacthes flex gap-2'>
                                    {option.optionValues.map((item) => {
                                        return (
                                            <div onClick={() => handleVariantChange(item.name, index)} className={`swatch cursor-pointer border-[1px] border-gray-300 rounded-md px-4 p-1 ${selectedVariant.selectedOptions[index].value == item.name ? 'border-black bg-black text-white' : 'border-gray-300'}`} key={item.id}>
                                                {item.name}

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedVariant ?
                        <>
                            {selectedVariant.availableForSale ?
                                <button className='bg-black text-white px-4 py-2 rounded-md' onClick={() => handleAddToCart()}>Add to Cart</button>
                                :
                                <button className='bg-gray-300 text-gray-500 px-4 py-2 rounded-md'>Soldout</button>
                            }
                        </>
                        :
                        <button className='bg-gray-300 text-gray-500 px-4 py-2 rounded-md'>Unavailable</button>
                    }
                    {product.descriptionHtml && (
                        <div className='description mt-4'>
                            <h3 className='text-lg font-bold mb-2'>Description</h3>
                            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
}

export default Product;