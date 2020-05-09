<script>
	import {onMount} from 'svelte';
	import Spinner from './../component/misc/Spinner.svelte';
	import IconButton from './../component/button/IconButton.svelte';
	import { fly } from 'svelte/transition';
	import uuid from './../script/uuid.js';
	import {printer} from './../store/printer.js';
	let visible = false,scrollable=true;
	function print(){
		if($printer.waiting) return;
		if($printer.showing && $printer.html !== ""){
			scrollable = false;
			const originalTitle = window.document.title;
			window.document.title = $printer.title;
			$printer.waiting = true;
			setTimeout(()=>{
				window.print();
				$printer.waiting = false;
				scrollable = true;
				window.document.title = originalTitle;
			},1000);
		}
	}
	onMount(()=>{
		setTimeout(()=>{
			visible = true;
		},300);
	});
</script>
<div transition:fly={{ x: -100, duration: 200 }} class="root{visible?" visible":" invisible"}{scrollable?" scrollable":""}">
	<div class="printable-menu">
		{#if $printer.waiting}
			<div class="spinner-wrapper">
				<Spinner />
			</div>
		{/if}
		<IconButton click={e=>{print()}} text="Print" icon="print"/>
		<IconButton click={e=>{$printer.showing = false;}} text="Close" icon="times"/>
	</div>
	{@html $printer.html}
</div>
<style>
	.root{
		transition: opacity 200ms;
		position: relative;
		overflow-y: hidden;
	}
	.spinner-wrapper{
		position: fixed;
		display: grid;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.7);
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.scrollable{
		overflow-y: auto;
	}
	.invisible{
		opacity: 0;
	}
	.visible{
		opacity: 1;
	}
</style>