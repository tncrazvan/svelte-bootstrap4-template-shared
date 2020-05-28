<script>
	import MenuItem from './MenuItem.svelte';
	import Tooltip from './../misc/Tooltip.svelte';
	import { Link, Router } from "svelte-routing";
	import { pathname } from './../../store/pathname.js';
	export let text;
	export let icon = "";
	export let icon2 = "";
	export let link;
	export let url;
	export let matchPartial = false;
	export let usetooltip = true;
	export let tooltip = "";
	export let action;
</script>

<div class="dropdown-item">
	<MenuItem {text} {icon} {icon2} {link} {url} {matchPartial} {usetooltip} {action} {tooltip} />
</div>

<style>
	.dropdown-item:hover{
		background: transparent;
	}
	.dropdown-item:active{
		background: transparent;
	}
</style>