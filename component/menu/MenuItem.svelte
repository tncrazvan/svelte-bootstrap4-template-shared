<script>
	import Tooltip from './../misc/Tooltip.svelte';
	import { Link, Router } from "svelte-routing";
	import { pathname } from './../../store/pathname.js';
	export let text;
	export let icon;
	export let icon2;
	export let link;
	export let url;
	export let matchPartial = false;
	export let usetooltip = true;
	let item;
	function click(){
		if(!matchPartial)
			$pathname = link;
	}
	export function getElement(){
		return item;
	}
	function matchLink(pname){
		if(!pname || !link) return false;
		if(!matchPartial)
			return pname === link;
		const tmp = "^"+link.replace("\\","\\\\").replace("/","\\/");
		return pname.match(tmp);
	}
</script>

<div bind:this={item} on:click={click} class="menu-item{matchLink($pathname)?' selected':''}">
	{#if link && !matchPartial}
	<Router url="{url}">
		<Link to={link}>
			{#if icon}
			<i class="fa fa-{icon}"></i>
			{/if}
			<span>{text}</span>
			{#if icon2}
			<i class="fa fa-{icon2}"></i>
			{/if}
		</Link>
	</Router>
	{:else}
		<span>
			{#if icon}
			<i class="fa fa-{icon}"></i>
			{/if}
			<span>{text}</span>
			{#if icon2}
			<i class="fa fa-{icon2}"></i>
			{/if}
		</span>
	{/if}
</div>
{#if usetooltip}
<Tooltip target={item} position="bottom">
	<slot></slot>
</Tooltip>
{/if}

<style>
	:root{
		--inactive-color: #babbbb;
		--active-color: #f17010;
	}

	.menu-item *{
		color: var(--inactive-color);
	}

	.menu-item:hover *{
		color: var(--active-color);
	}
	.menu-item{
		display: inline-block;
		transition: transform 200ms;
		padding: 0.5rem;
		border-radius: 0.3rem;
		cursor: pointer;
	}
	.menu-item:hover{
		background: rgba(0,0,0,0.05);
	}
	.menu-item:active{
		transform: scale(0.9);
	}
	.selected *{
		color: var(--active-color);
	}
</style>
