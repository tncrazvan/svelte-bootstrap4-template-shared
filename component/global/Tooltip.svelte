<script>
	import { fly } from 'svelte/transition';
	import {onMount,onDestroy} from 'svelte';
	export let position = "top";
	export let target;
	let x=0,y=0;
	let tooltip;
	let show = false;
	const defaultStyle = "max-width: 300px;max-height: 200px;";
	let customStyle = ""; export {customStyle as style};
	let forceEndPoll = false;
	onMount(async ()=>{
		(function poll(){
			if(target){
				target.addEventListener("mouseover",enter);
				target.addEventListener("mouseout",leave);
				return;
			}
			if(forceEndPoll) return;
			setTimeout(poll,100);
		})();
	});
	
	onDestroy(()=>{
		forceEndPoll = true;
	});

	function enter(selfcall){
		show = true;
	}

	function leave(){
		show = false;
	}
	
	function manage(tooltip){
		const rect = target.getBoundingClientRect();
		switch(position){
			case "top":
				x = rect.x + rect.width/2 - tooltip.offsetWidth/2;
				y = rect.y - tooltip.offsetHeight - 10; //POSITION
				if(y < 0)
					y = rect.y + rect.height - 10; //revert to preferred "bottom" POSITION

				//make sure x is within bounds
				if(x < 0) x = 0;
				if(x + tooltip.offsetWidth > window.main.offsetWidth)
					x = window.main.offsetWidth - tooltip.offsetWidth;
				break;
			case "bottom":
				x = rect.x + rect.width/2 - tooltip.offsetWidth/2;
				y = rect.y + rect.height + 10; //POSITION
				if(y + tooltip.offsetHeight >= window.main.offsetHeight)
					y = rect.y - tooltip.offsetHeight + 10; //revert to preferred "top" POSITION

				//make sure x is within bounds
				if(x < 0) x = 0;
				if(x + tooltip.offsetWidth > window.main.offsetWidth)
					x = window.main.offsetWidth - tooltip.offsetWidth;
				break;

			case "left":
				y = rect.y + rect.height / 2 - tooltip.offsetHeight / 2; //center the tooltip
				x = rect.x - tooltip.offsetWidth - 10; //move it to the left side
				if(x < 0){
					x = 0;
				}
				break;
			case "right":
				y = rect.y + rect.height / 2 - tooltip.offsetHeight / 2; //center the tooltip
				x = rect.x + rect.width + 10; //move it to the left side
				if(x + tooltip.offsetWidth > window.main.offsetWidth){
					x = window.main.offsetWidth - tooltip.offsetWidth;
				}
				break;
		}
	}
	function getTransition(){
		switch(position){
			case "top":
				return {y:30,duration:100};
				break;
			case "bottom":
				return {y:-30,duration:100};
				break;

			case "left":
				return {x:30,duration:100};
				break;
			case "right":
				return {x:-30,duration:100};
				break;
		}
	}
</script>
{#if show}
<div use:manage class="card" transition:fly={getTransition()} style="left:{x}px;top:{y}px;{defaultStyle}{customStyle}">
	<div class="card-body">
		<div class="arrow-wrapper">
			<div class="arrow"></div>
		</div>
		<slot></slot>
	</div>
</div>
{/if}

<style>
	.card{
		pointer-events: none;
		pointer-events: none;
		position: absolute;
		display: block;
		z-index: 99999;
		border-color: #e3e3e3;
		background: #ffffff;
	}
	.card-body{
		position: relative;
	}
	.arrow-wrapper{
		position: absolute;
		top: -0.4rem;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		justify-items: center;
	}
	.arrow{
		position: relative;
		background: #ffffff;
		border-left: 1px solid #e3e3e3;
		border-top: 1px solid #e3e3e3;
		width: 1rem;
		height: 1rem;
		transform: rotateZ(45deg)
	}
</style>