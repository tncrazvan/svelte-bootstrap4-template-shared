<script>
	import { tooltip } from './../../store/tooltip.js';
	import uuid from './../../script/uuid.js';
	import { fade } from 'svelte/transition';
	import { onMount,onDestroy } from 'svelte';
	export let position = "top";
	export let type = "mouseover";
	export let target;
	let id = uuid();
	let x=0,y=0;
	let deltaForArrowX = 0;
	let arrowWrapper;
	const defaultStyle = "max-width:300px;max-height:200px;";
	let customStyle = ""; export {customStyle as style};
	let forceEndPoll = false;
	let arrowEl;

	onMount(async ()=>{
		(function poll(){
			if(target){
				if(type === "mouseover"){
					if(target.setAttribute)
						target.setAttribute("id",id);
					target.addEventListener("mouseover",enter);
					target.addEventListener("mouseout",leave);
				}else{
					if(type.includes("click")){
						if(target.setAttribute)
							target.setAttribute("id",id);
						target.addEventListener("click",enter);
					}
					if(type.includes("focus")){
						if(target.setAttribute)
							target.setAttribute("id",id);
						target.addEventListener("focus",enter);
					}
				}
				return;
			}
			if(forceEndPoll) return;
			setTimeout(poll,200);
		})();
	});
	
	onDestroy(()=>{
		forceEndPoll = true;
	});

	function enter(selfcall){
		$tooltip = id;
	}

	function leave(){
		$tooltip = "";
	}
	
	function manageArrow(arrow){
		arrowEl = arrow;
		switch(position){
			case "top":
				arrow.style.left = "auto";
				arrow.style.right = "auto";
				arrow.style.top = "auto";
				arrow.style.bottom = "-0.4rem";
				arrow.style.transform = "rotateZ(-135deg)";
				break;
			case "bottom":
				arrow.style.left = "auto";
				arrow.style.right = "auto";
				arrow.style.top = "-0.4rem";
				arrow.style.bottom = "auto";
				arrow.style.transform = "rotateZ(45deg)";
				break;
			case "left":
				arrow.style.left = "auto";
				arrow.style.right = "-0.4rem";
				arrow.style.top = "auto";
				arrow.style.bottom = "auto";
				arrow.style.transform = "rotateZ(130deg)";
				break;
			case "right":
				arrow.style.left = "-0.4rem";
				arrow.style.right = "auto";
				arrow.style.top = "auto";
				arrow.style.bottom = "auto";
				arrow.style.transform = "rotateZ(-45deg)";
				break;
		}
	}

	function manageTooltip(tooltip){
		const rect = target.getBoundingClientRect();
		switch(position){
			case "top":
				x = rect.x + rect.width/2 - tooltip.offsetWidth/2;
				y = rect.y - tooltip.offsetHeight - 10; //POSITION
				if(y < 0){
					y = rect.y + rect.height - 10; //revert to preferred "bottom" POSITION
					position = "bottom";
					if(arrowEl) manageArrow(arrowEl);
				}

				//make sure x is within bounds
				if(x < 0){
					deltaForArrowX = x;
					x = 0;
				}
				if(x + tooltip.offsetWidth > window.main.offsetWidth){
					x = window.main.offsetWidth - tooltip.offsetWidth;
				}
				break;
			case "bottom":
				x = rect.x + rect.width/2 - tooltip.offsetWidth/2;
				y = rect.y + rect.height + 10; //POSITION
				if(y + tooltip.offsetHeight >= window.main.offsetHeight){
					y = rect.y - tooltip.offsetHeight + 10; //revert to preferred "top" POSITION
					position = "top";
					if(arrowEl) manageArrow(arrowEl);
				}

				//make sure x is within bounds
				if(x < 0){
					deltaForArrowX = x;
					x = 0;
				}
				if(x + tooltip.offsetWidth > window.main.offsetWidth){
					x = window.main.offsetWidth - tooltip.offsetWidth;
				}
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
				return {duration:50};
				break;
			case "bottom":
				return {duration:50};
				break;

			case "left":
				return {duration:50};
				break;
			case "right":
				return {duration:50};
				break;
		}
	}
</script>
{#if $tooltip === id}
<div use:manageTooltip class="card" transition:fade={getTransition()} style="left:{x}px;top:{y}px;{defaultStyle}{customStyle}">
	<div class="card-body">
		<div class="arrow-wrapper">
			<div use:manageArrow style="margin-left:{deltaForArrowX*2}px" class="arrow"></div>
		</div>
		<slot></slot>
	</div>
</div>
{/if}

<style>
	.card{
		pointer-events: none;
		position: fixed;
		display: block;
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