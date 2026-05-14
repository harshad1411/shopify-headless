import ProductCard from './ProductCard';
const ProductsGrid = ({ products }) => {
    return (
        <div className='grid grid-cols-4 gap-4'>
        {products.map((product) => (
            <ProductCard key={product.node.id} product={product.node} />
        ))}
    </div>
    );
};

export default ProductsGrid;