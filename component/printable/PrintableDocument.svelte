<script>
	import IconButton from './../button/IconButton.svelte';
	import { onMount } from 'svelte';
	import {fly} from 'svelte/transition';
	import uuid from './../../script/uuid.js';
	import {printer} from './../../store/printer.js';
	export let title = "Printing";
	let content;
	export function show(){
		$printer.title = title;
		$printer.html = content.innerHTML;
		$printer.showing = true;
	}
</script>
<div bind:this={content} transition:fly={{ x: -100, duration: 200 }} class="root">
	<slot></slot>
</div>
<style>
	.root{
		display: none;
	}
</style>