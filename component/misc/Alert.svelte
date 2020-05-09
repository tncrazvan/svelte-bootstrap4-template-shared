<script>
	export let text;
	export let level="primary";
	let cls="";
	switch(level.toLocaleLowerCase()){
		case "primary":
			cls = "text-primary";
			break;
		case "secondary":
			cls = "text-secondary";
			break;
		case "success":
			cls = "text-success";
			break;
		case "danger":
			cls = "text-danger";
			break;
		case "warning":
			cls = "text-warning";
			break;
		case "info":
			cls = "text-info";
			break;
		case "light":
			cls = "text-light";
			break;
		case "dark":
			cls = "text-dark";
			break;
	}
</script>

<div class="alert {cls}" role="alert">
	<i class="fa fa-info-circle"></i>
	<span>{@html text}</span>
</div>

<style>
	i{
		position: relative;
		top: 1px;
	}
</style>