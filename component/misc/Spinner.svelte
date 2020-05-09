<script>
	export let type="primary";
	let cls="";
	switch(type.toLocaleLowerCase()){
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
<div class="spinner-border {cls}" role="status">
  <span class="sr-only">Loading...</span>
</div>