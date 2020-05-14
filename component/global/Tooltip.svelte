<script>
	import { fly } from 'svelte/transition';
	import {onMount} from 'svelte';
	export let preferred = "top";
	let text = "";
	let x=0,y=0;
	let rect;
	let tooltip;
	onMount(()=>{
		window.document.addEventListener("mousemove",e=>{
			for(let element of e.path){
				if(element.hasAttribute && element.hasAttribute("tooltip")){
					text = element.getAttribute("tooltip");
					if(!tooltip) return;
					rect = element.getBoundingClientRect();

					switch(preferred){
						case "top":
							x = rect.x + rect.width/2 - tooltip.offsetWidth/2;
							y = rect.y - tooltip.offsetHeight; //POSITION
							if(y < 0)
								y = rect.y + rect.height; //revert to preferred "bottom" POSITION
							break;
						case "bottom":
							x = rect.x + rect.width/2 - tooltip.offsetWidth/2;
							y = rect.y + rect.height; //POSITION
							if(y > window.main.offsetHeight)
								y = rect.y - tooltip.offsetHeight; //revert to preferred "top" POSITION
							break;
					}
					
					break;
				}else{
					text = "";
					x = 0;
					y = 0;
				}
			}
		});
	});
</script>
{#if text !== ""}
<div transition:fly={{y:30,duration:70}} bind:this={tooltip} class="custom-tooltip" style="left:{x}px;top:{y}px">
{text}
</div>
{/if}

<style>
	.custom-tooltip{
		pointer-events: none;
		position: fixed;
		display: grid;
		z-index: 99999;
		background: rgba(50,50,50,0.5);
		padding: 0.3rem;
		border: 1px solid #333333;
		color: #f1f1f1;
	}
</style>