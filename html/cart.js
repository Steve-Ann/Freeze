class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        existingItem 
            ? existingItem.quantity++
            : this.items.push({ ...product, quantity: 1 });
        
        this.save();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    }

    get total() {
        return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    get itemCount() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }
}

class UI {
    constructor() {
        this.cart = new Cart();
        this.products = [
            { id: 1, name: 'Ice Block', price: 750.99, summary: '<p>Premium Ice Blocks – Long-Lasting, Crystal Clear, and Ultra-Cool! ❄️</p>', 
                image: '<img src="ice_block.jpg" alt="Ice_block" width=227px>',
                description: `<p>Keep your beverages, food, and events chilled for longer with our high-quality ice blocks! Designed to melt 
                slower than regular ice, our solid ice blocks are perfect for coolers, seafood displays, industrial cooling, and event decorations.</p>
            `, features: `
                <ul class="product-features rubik">
                    <li>✅ Slow-Melting & Long-Lasting – Keeps food and drinks cold for extended periods. </li>
                    <li>✅ Crystal Clear & Pure – Made from filtered water for a clean, fresh freeze.  </li>
                    <li>✅ Perfect for Coolers & Storage – Ideal for outdoor trips, catering, and bulk chilling.</li>
                    <li>✅ Food-Grade & Safe – Hygienically produced for safe use with food and beverages.  </li>
                    <li>✅ Available in Various Sizes – Custom block sizes for home, business, or industrial use.   </li>                
                </ul>
              <p>Whether you need durable ice blocks for camping, commercial cooling, or event 
                displays, we've got you covered. ❄️ Order now and keep things ice-cold for longer!</p>`, 
                whyUs: `<span>Why Choose Our Ice Blocks?</span> ` },
            { id: 2, name: 'Ice Cube', price: 445.99, summary: 'Premium Crystal-Clear Ice Cubes – Stay Cool, Stay Fresh! ❄️', 
                image: '<img src="Ice_cube_4.jpg" alt="ice_cube_4" width=227px>',
                description: `<p class="rubik">Keep your drinks perfectly chilled with our high-quality, crystal-clear ice cubes! 
                Whether you're hosting a party, running a restaurant, or just enjoying a refreshing 
                beverage at home, our pure, long-lasting ice cubes are the perfect solution.</p>
            `, features: `<ul class="product-features">  
                <li>✅ Crystal Clear & Pure – Made from filtered water for a clean, fresh taste.</li>
                <li>✅ Slow-Melting – Keeps drinks colder for longer without excessive dilution.</li>
                <li>✅ Perfectly Sized – Ideal for cocktails, sodas, juices, and smoothies.</li>
                <li>✅ Food-Safe & Hygienic – Packaged with strict quality standards for safety.</li>
                <li>✅ Bulk & Retail Options Available – Perfect for home use, bars, restaurants, and events.</li>
              </ul>
              <p>Upgrade your cooling game with the best ice cubes in town! ❄️ Order now and keep every sip chilled & refreshing.</p>`, 
              whyUs: `<span>Why Choose Our Ice Cubes?</span>`  },
            { id: 3, name: 'Freeze Fruity Pop', price: 300.99, summary: '<p>Fruity Ice Pops – Bursting with Real Fruit Flavor! 🍓🍊❄️</p>', 
                image: '<img src="fruity_pop_8.jpg" alt="fruity_pop_8" width=227px>',
                description: `<p>Cool down with the refreshing taste of real fruit in every bite! Our fruity ice pops are made with natural fruit juices and flavors, 
                giving you a delicious, icy treat that's both tasty and refreshing. Perfect for hot days, parties, or anytime you need a fruity pick-me-up!</p>`,
                features: `<ul>
                <li>✅ Made with Real Fruit Juice – Enjoy the natural sweetness of strawberries, oranges, mangoes, and more!</li>
                <li>✅ Cool & Refreshing – The perfect frozen treat for any occasion.</li>
                <li>✅ No Artificial Flavors or Colors – Just pure, fruity goodness in every bite.</li>
                <li>✅ Individually Wrapped – Easy to grab, share, and enjoy on the go.</li>
                <li>✅ Great for Kids & Adults – A fun and delicious way to stay cool all summer!  </li>
              </ul>
              <p>Taste the fruity fun with our delicious, naturally flavored ice pops! ❄️ 
                Order now and enjoy the perfect balance of sweetness and refreshment in every bite!</p>`, 
                whyUs: `<span>Why You'll Love Our Fruity Ice Pops:</span>`  },
            { id: 4, name: 'Crushed Ice', price: 329.99, summary: '<p>Premium Crushed Ice – Perfectly Chilled, Instantly Refreshing! ❄️</p>', 
                image: '<img src="crushed_ice_1.jpg" alt="crush_ice_1" width=227px>',
                description: `
                    <p>Looking for the ultimate way to keep your drinks icy cold? 
                        Our high-quality crushed ice is the perfect solution for cocktails, smoothies, sodas, seafood displays, 
                        and more! With its fine, fast-cooling texture, it blends effortlessly into beverages and keeps everything refreshingly crisp.
                    </p>`, 
                features: `
                <ul class="product-features">
                    <li>✅ Instant Cooling – Quickly chills drinks and keeps them frosty. </li>
                    <li>✅ Perfect for Cocktails & Smoothies – Ideal for margaritas, mojitos, and blended drinks.  </li>
                    <li>✅ Fresh & Hygienic – Made from purified water and packed under strict quality standards. </li>
                    <li>✅ Great for Food Display – Keeps seafood, salads, and desserts at the perfect temperature. </li>
                    <li>✅ Available in Bulk or Retail Bags – Perfect for home, restaurants, and events.  </li>
                </ul>
                <p>Whether you're hosting a party, running a bar, or just need the best ice for your drinks, our premium crushed ice is the coolest choice! 
                ❄️ Order now and keep every sip refreshing!</p>`, 
                whyUs: `<span>Why Choose Our Crushed Ice?</span>`}
        ];
        
        this.init();
    }

    init() {
        this.renderProducts();
        this.renderCart();
        this.addEventListeners();
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        container.innerHTML = this.products.map(product => `
            <article class="product-card">
                <h3>${product.name}</h3>
                ${product.image}
                ${product.summary}
                <p>${product.price.toFixed(2)}</p>
                <button 
                    class="btn btn-primary" 
                    data-id="${product.id}"
                    data-action="add-to-cart"
                >
                    Add to Cart
                </button>
                ${product.description}
                ${product.features}
                
            </article>
        `).join('');
    }

    renderCart() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }

    updateCartCount() {
        document.getElementById('cart-count').textContent = this.cart.itemCount;
    }

    updateCartTotal() {
        document.getElementById('cart-total').textContent = this.cart.total.toFixed(2);
    }

    updateCartItems() {
        const container = document.getElementById('cart-items');
        container.innerHTML = this.cart.items.length > 0
            ? this.cart.items.map(item => `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <button 
                        class="btn btn-danger" 
                        data-id="${item.id}"
                        data-action="remove-from-cart"
                    >
                        &times;
                    </button>
                </div>
            `).join('')
            : '<p>Your cart is empty</p>';
    }

    addEventListeners() {
        document.body.addEventListener('click', event => {
            const { action, id } = event.target.dataset;
            
            if (action === 'add-to-cart') {
                const product = this.products.find(p => p.id === Number(id));
                if (product) {
                    this.cart.addItem(product);
                    this.renderCart();
                }
            }
            
            if (action === 'remove-from-cart') {
                this.cart.removeItem(Number(id));
                this.renderCart();
            }
        });

        document.getElementById('checkout-btn').addEventListener('click', () => {
            if (this.cart.items.length === 0) return;
            alert('Redirecting to checkout...');
            // window.location.href = '/checkout';
        });
    }
}

// Initialize application
new UI();