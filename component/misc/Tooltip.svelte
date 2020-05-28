<script>
	import {onMount} from 'svelte';
	import uuid from './../../script/uuid.js';
	import { fade } from 'svelte/transition';
	const defaultStyle = "max-width:300px;max-height:200px;";
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

<style>
	.card{
		position: fixed;
		display: block;
		pointer-events: none;
		z-index: 99999;
		border-color: #e3e3e3;
		background: #ffffff;
	}
	.card-body{
		padding: 0.5rem;
		position: relative;
		font-size: 0.8rem;
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
	}
</style>