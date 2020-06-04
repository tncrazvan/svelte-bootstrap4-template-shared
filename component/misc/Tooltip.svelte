<script>
	import {onMount} from 'svelte';
	import uuid from './../../script/uuid.js';
	import { fade } from 'svelte/transition';
	const defaultStyle = "";
	let customStyle = ""; export {customStyle as style};
	export let value;
	export let html=false;
	let self;
	onMount(()=>{
		window.$(self).tooltip();
	});
	
</script>

<div bind:this={self} data-toggle="tooltip" data-html={html} title={value} style="{defaultStyle}{customStyle}">
	<slot></slot>
</div>