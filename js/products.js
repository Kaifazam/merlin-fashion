fetch('http://localhost:5000/api/products')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const container = document.querySelector('.' + product.category);
      if (container) {
        const img = document.createElement('img');
        img.src = "/" + product.image; // Make sure db paths match actual image location!
        img.alt = product.name;
        img.id = product.name + " || Rs." + product.price;
        img.onclick = function() { 
    addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image
    });
};

        container.appendChild(img);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
