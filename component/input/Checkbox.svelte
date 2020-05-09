<script>
	import uuid from './../../script/uuid.js';
	export let checked;
	export let label;
	let id = uuid();
</script>

<div class="custom-control custom-checkbox mb-3">
	<input bind:checked={checked} type="checkbox" class="custom-control-input" id="{id}-customCheck1">
	<label class="custom-control-label" for="{id}-customCheck1">{label}</label>
</div>