<script>
	export let items;
	export let title;
	export let description;
	export let discount = 0;
	export let shipping = 0;
	export let checkout;
	let delta = Date.now();
	$: subtotal = function(d){
		let result  = 0;
		items.forEach(item=>{
			result += item.cost * (item.quantity < 0?0:item.quantity);
		});
		return result;
	};

	const quantityChange=i=>{
		delta=Date.now() - delta;
		return e=>{
			if(items[i].quantity < 0){
				items[i].quantity = 0;
			}
		};
	}
	
</script>

<section class="shopping-cart dark">
	<div class="container">
		<div class="block-heading">
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
		<div class="content">
			<div class="row">
				<div class="col-md-12 col-lg-8">
					<div class="items">
						{#each items as item,i}
						<div class="product">
							<div class="row">
								<div class="col-md-3">
									<img class="img-fluid mx-auto d-block image" src={item.image} alt="item image">
								</div>
								<div class="col-md-8">
									<div class="info">
										<div class="row">
											<div class="col-md-5 product-name">
												<div class="product-name">
													<a href="#shopping-cart:{item.title}">{item.title}</a>
													<div class="product-info">
														{#each Object.keys(item.info) as key}
														<div>{key}: <span class="value">{item.info[key]}</span></div>
														{/each}
													</div>
												</div>
											</div>
											<div class="col-md-4 quantity">
												<label for="quantity">Quantity:</label>
												<input on:change={quantityChange(i)} id="quantity" type="number" bind:value={item.quantity} class="form-control quantity-input">
											</div>
											<div class="col-md-3 price">
												<span>{item.currency?item.currency:""}{item.cost * (item.quantity < 0?0:item.quantity)}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/each}
					</div>
				</div>
				<div class="col-md-12 col-lg-4">
					<div class="summary">
						<h3>Summary</h3>
						<div class="summary-item"><span class="text">Subtotal</span><span class="price">{subtotal(delta)}</span></div>
						<div class="summary-item"><span class="text">Discount</span><span class="price">{discount}</span></div>
						<div class="summary-item"><span class="text">Shipping</span><span class="price">{shipping}</span></div>
						<div class="summary-item"><span class="text">Total</span><span class="price">{subtotal(delta)-discount+shipping}</span></div>
						<button on:click={e=>checkout({
							subtotal: subtotal(delta),
							discount: discount,
							shipping: shipping,
							total: subtotal(delta)-discount+shipping
						})} type="button" class="btn btn-primary btn-lg btn-block">Checkout</button>
					</div>
				</div>
			</div> 
		</div>
	</div>
</section>

<style>
	.shopping-cart{
		padding-bottom: 50px;
		font-family: 'Montserrat', sans-serif;
	}

	.shopping-cart.dark{
		background-color: #f6f6f6;
	}

	.shopping-cart .content{
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
		background-color: white;
	}

	.shopping-cart .block-heading{
		padding-top: 50px;
		margin-bottom: 40px;
		text-align: center;
	}

	.shopping-cart .block-heading p{
		text-align: center;
		max-width: 420px;
		margin: auto;
		opacity:0.7;
	}

	.shopping-cart .dark .block-heading p{
		opacity:0.8;
	}

	.shopping-cart .block-heading h1,
	.shopping-cart .block-heading h2,
	.shopping-cart .block-heading h3 {
		margin-bottom:1.2rem;
		color: #3b99e0;
	}

	.shopping-cart .items{
		margin: auto;
	}

	.shopping-cart .items .product{
		margin-bottom: 20px;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.shopping-cart .items .product .info{
		padding-top: 0px;
		text-align: center;
	}

	.shopping-cart .items .product .info .product-name{
		font-weight: 600;
	}

	.shopping-cart .items .product .info .product-name .product-info{
		font-size: 14px;
		margin-top: 15px;
	}

	.shopping-cart .items .product .info .product-name .product-info .value{
		font-weight: 400;
	}

	.shopping-cart .items .product .info .quantity .quantity-input{
		margin: auto;
		width: 80px;
	}

	.shopping-cart .items .product .info .price{
		margin-top: 15px;
		font-weight: bold;
		font-size: 22px;
	}

	.shopping-cart .summary{
		border-top: 2px solid #5ea4f3;
		background-color: #f7fbff;
		height: 100%;
		padding: 30px;
	}

	.shopping-cart .summary h3{
		text-align: center;
		font-size: 1.3em;
		font-weight: 600;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.shopping-cart .summary .summary-item:not(:last-of-type){
		padding-bottom: 10px;
		padding-top: 10px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.shopping-cart .summary .text{
		font-size: 1em;
		font-weight: 600;
	}

	.shopping-cart .summary .price{
		font-size: 1em;
		float: right;
	}

	.shopping-cart .summary button{
		margin-top: 20px;
	}

	@media (min-width: 768px) {
		.shopping-cart .items .product .info {
			padding-top: 25px;
			text-align: left; 
		}

		.shopping-cart .items .product .info .price {
			font-weight: bold;
			font-size: 22px;
			top: 17px; 
		}

		.shopping-cart .items .product .info .quantity {
			text-align: center; 
		}
		.shopping-cart .items .product .info .quantity .quantity-input {
			padding: 4px 10px;
			text-align: center; 
		}
	}

</style>