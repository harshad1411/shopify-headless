const ProductCard = ({ product }) => {
    return (
        <div data-id={product.id}>
        <a href={`/products/${product.handle}`}>
            {product?.images?.edges?.length > 0 && <img src={product.images.edges[0].node.url} alt={product.title} />}
            
            <h2>{product.title}</h2>
        </a>
        </div>
    );
};

export default ProductCard;