<script>
	import { onMount,onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	export let logoAction;
	export let logo = "/assets/images/logo.png";
	let fullscreenMenuVisible = false;
	export function show(){
		fullscreenMenuVisible = true;
	}
	export function hide(){
		fullscreenMenuVisible = false;
	}
	let width = 0;
	let stop = false;
	let navbar;
	onMount(()=>{
		(function poll(){
			if(window.main && window.main.offsetWidth !== width)
				width = window.main.offsetWidth;
			if(width > 980)
				fullscreenMenuVisible = false;
			if(stop) return;
			setTimeout(poll,100);
		})();
	});
	onDestroy(()=>{
		stop = false;
	});
</script>
<nav bind:this={navbar} class="navbar navbar-light bg-light">
	{#if width > 980}
	<div transition:fade={{ duration: 200 }} class="logo">
		<img width=100% on:click={logoAction} src={logo} alt="logo"/>
	</div>
	{/if}
	
	<div class="buttons-wrapper">
		<div class="buttons {width <= 980?'buttons-sm':''} {fullscreenMenuVisible?'show':''}">
			<slot>Caricamento bottoni...</slot>
		</div>
	</div>
	
	{#if width <= 980}
	<div></div>
	<div on:click={fullscreenMenuVisible?hide:show} class="toggle">
		<i class="fa fa-{fullscreenMenuVisible?'times':'bars'}"></i>
	</div>
	{/if}
</nav>

<style>
	.logo,.toggle{
		position: relative;
		cursor: pointer;
	}

	.logo{
		margin-right: 1rem;
		width: 3rem;
	}

	.toggle{
		margin: auto;
	}

	.navbar{
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		z-index: 3;
		border-bottom: 1px solid #f1f1f1;
		display: grid;
		grid-template-columns: auto 1fr auto;
	}
	
	.navbar .buttons{
		display: inline-block;
		width: 100%;
		position: relative;
	}

	.navbar .buttons.buttons-sm{
		position: fixed;
		display: none;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(255,255,255,0.95);
		grid-template-columns: 1fr 1fr 1fr 1fr;
		justify-items: center;
		align-items: center;
		transition: opacity 200ms;
		overflow-y: auto;
	}

	.navbar .buttons.buttons-sm.show{
		display: grid;
	}
</style>