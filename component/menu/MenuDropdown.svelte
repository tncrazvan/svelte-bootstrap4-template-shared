<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import uuid from './../../script/uuid.js';
	import MenuItem from './MenuItem.svelte';
	import Tooltip from './../misc/Tooltip.svelte';
	export let tooltip;
	export let text;
	export let icon;
	export let usetooltip=true;
	export let url;
	export let link;
	let id = uuid();
	let show = false;
	let self;
	function click(){
		show = !show;
	}
	onMount(()=>{
		window.main.addEventListener("click",e=>{
			if(!e.path.includes(self)){
				show = false;
			}
		});
	});
</script>
<div bind:this={self} on:click={click} class="custom-dropdown">
	<MenuItem matchPartial={true} link={link} url={url} text={text} icon={icon} icon2={"sort-down"} usetooltip={usetooltip}>
		{@html tooltip}
	</MenuItem>
	{#if show}
	<div transition:fly={{ y: -20, duration: 200 }} class="card custom-dropdown-menu">
		<div class="arrow-wrapper-wrapper">
			<div class="arrow-wrapper">
				<div class="arrow"></div>
			</div>
		</div>
		<slot></slot>
	</div>
	{/if}
</div>

<style>
	.custom-dropdown{
		display: inline-block;
	}
	.custom-dropdown-menu{
		position: absolute;
		max-width: 11rem;
		padding: 0.5rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		display: grid;
		grid-template-columns: auto;
		justify-items: left;
	}
	.arrow-wrapper-wrapper{
		position: relative;
		height: 0;
		width: 100%;
	}
	.arrow-wrapper{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		justify-items: center;
		align-items: center;
	}
	.arrow{
		position: absolute;
		background: #ffffff;
		border-left: 1px solid #e3e3e3;
		border-top: 1px solid #e3e3e3;
		width: 0.7rem;
		height: 0.7rem;
		margin-top: -1rem;
		transform: rotateZ(45deg);
	}
</style>