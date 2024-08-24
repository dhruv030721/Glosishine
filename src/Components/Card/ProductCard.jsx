
const ProductCard = () => {
    return (
        <div key={product.product_id} className="w-full  rounded overflow-hidden shadow-lg border">
            <Link to={`/cart/${product.product_id}`}>
                <img className="w-full" src={product.images[0] || cartimage3} alt="Men Striped Casual Shirt" />
            </Link>
            <div className="px-4 py-4">
                <div className='flex'>
                    <h1 className="font-bold w-full flex justify-start font-poppins text-md mb-2">
                        {product.product_name}
                    </h1>
                    <button className='' onClick={() => { addToCart(product.product_id) }}><RiShoppingBag4Fill size={30} className='' /></button>
                </div>
                <p className="text-gray-700 font-montserrat text-sm mb-2">{product.brand_name}</p>
                <div className="mt-2">
                    <span className="text-md font-semibold font-poppins text-black">{product.sale_price}</span>
                    <span className="text-sm text-gray-500 font-poppins line-through ml-2">{product.regular_price}</span>
                    <span className="text-sm text-red-500 font-poppins ml-2">({product.discount}% OFF)</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
