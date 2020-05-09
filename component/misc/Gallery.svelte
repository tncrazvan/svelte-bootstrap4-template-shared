<script>
	export let title;
	export let images;
</script>
<div class="container">
	<h1 class="font-weight-light text-center text-lg-left mt-4 mb-0">{title}</h1>
	<hr class="mt-2 mb-5" />
	<div class="row text-center text-lg-left">
		{#each images as image}
		<div class="col-lg-3 col-md-4 col-6">
			<div class="d-block mb-4 h-100">
				<img class="img-fluid img-thumbnail" src={image.src} alt={image.alt}>
			</div>
		</div>
		{/each}
	</div>
</div>