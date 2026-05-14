import ProductCard from './ProductCard';
const Categories = ({categories, addToCart}) => {

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <div className='grid grid-cols-4 gap-4'>
        {categories.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
          
        ))}
      </div>
    </div>
  );
};

export default Categories;