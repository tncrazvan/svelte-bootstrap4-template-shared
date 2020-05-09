<script>
	export let text;
	export let icon="";
	export let selected = false;
	export let submit = false;
	export let size = "";
	let css; export {css as style};
	let idd; export {idd as id};
	let cls = " btn-primary";
	let clk;
	export {clk as click};
	export {cls as class};
</script>

<button style={css} id={idd} on:click={clk} type={submit?"submit":"button"} class="btn{cls}{selected?" selected":""}{size==="large"?" btn-lg":size==="small"?" btn-sm":""}">
	{#if icon !== ""}
		<i class="fa fa-{icon}"></i>
	{/if}
  	<span class={icon !== ""?"adjust":""}>{text}</span>
</button>

<style>
	i.adjust{
		position: relative;
		top: 3px;
	}
	span.adjust{
		position: relative;
	}
	*:not(.selected){
		border-color: transparent;
	}
</style>