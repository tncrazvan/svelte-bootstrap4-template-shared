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
</script>

<div class="dropdown">
  <div id="{id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		<MenuItem matchPartial={true} {link} {url} {text} {icon} icon2={"sort-down"} {usetooltip} {tooltip} />
  </div>
  <div class="dropdown-menu" aria-labelledby="{id}">
		<slot></slot>
  </div>
</div>

<style>
	.dropdown{
		display: inline-block;
	}
	.dropdown-menu{
		padding: 0.3rem;
	}
</style>