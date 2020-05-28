<script>
	import {onMount} from 'svelte';
	import uuid from './../../script/uuid.js';
	export let color = "red";
	export let update;
	export let label;
	let cls = ""; export {cls as class};
	let val = ""; export {val as value};
	let self;
	let id = uuid();
	onMount(()=>{
		window.$(self).datepicker({
			weekStart: 1,
			color: color
		}).on('changeDate',ev=>{
			update(new Date(ev.date));
		});
	});
</script>
<div class="form-label-group {cls}">
	<input bind:this={self} bind:value={val} type="text" id="{id}-datePicker" class="datepicker form-control" placeholder={label}>
	<label for="{id}-datePicker">{label}</label>
</div>