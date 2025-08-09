export default function ProductCard({ product, onAdd }) {
  return (
    <div className="rounded border p-3 flex flex-col gap-2">
      <img src={product.images?.[0] || 'https://via.placeholder.com/300x200'} alt={product.title} className="w-full h-40 object-cover rounded" />
      <h3 className="font-semibold line-clamp-1">{product.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold">${product.price}</span>
        {product.discount ? <span className="text-xs text-green-600">-{product.discount}%</span> : null}
      </div>
      <button className="mt-2 px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black" onClick={() => onAdd?.(product)}>
        Add to Cart
      </button>
    </div>
  )
}