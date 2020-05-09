<script>
	import IconButton from './../button/IconButton.svelte';
	export let title;
	export let subtitle;
	export let pages;
	export let index;
	const setPage = function(i){
		return function(){
			index = i;
		};
	};
	const previous = function(){
		if(--index < 0)
			index = 0;
	};

	const next = function(){
		if(++index > pages.length - 1)
			index = pages.length - 1;
	};
</script>
<div class="container">

	<!-- Page Heading -->
	<h1 class="my-4">{title}
		<small>{subtitle}</small>
	</h1>
	{#each pages as projects,p}
		<!-- Projects -->
		{#each projects as project,i}
			{#if index === p}
				{#if i > 0}
					<hr />
				{/if}
				<div class="row">
					<div class="col-md-7">
						<img class="img-fluid rounded mb-3 mb-md-0" src={project.imageSrc} alt="">
					</div>
					<div class="col-md-5">
						<h3>{project.title}</h3>
						<p>{project.description}</p>
						<IconButton text="View Project" icon="" />
					</div>
				</div>
			{/if}
		{/each}
	{/each}
	

	<!-- Pagination -->
	<ul class="pagination justify-content-center">
		<li on:click={previous} class="page-item">
			<span class="page-link" aria-label="Previous">
				<span aria-hidden="true">&laquo;</span>
				<span class="sr-only">Previous</span>
			</span>
		</li>
		{#each pages as page,i}
		<li on:click={setPage(i)} class="page-item">
			<span class="page-link">{i+1}</span>
		</li>
		{/each}
		<li on:click={next} class="page-item">
			<span class="page-link" aria-label="Next">
				<span aria-hidden="true">&raquo;</span>
				<span class="sr-only">Next</span>
			</span>
		</li>
	</ul>

</div>