<script>
	import Main from '../Main.svelte';
	import Printing from './page/Printing.svelte';
	import SideMenu from './component/menu/SideMenu.svelte';
	import {printer} from './store/printer.js';

	//jquery
	//import './libs/jquery/jquery.min.js'; ====> imported directly in index.html

	//popper
	//import './libs/popper/popper.min.js'; ====> imported directly in index.html

	//bootstrap
	//import './libs/bootstrap/bootstrap.min.js' ====> imported directly in index.html;
	//import './libs/bootstrap/bootstrap.min.css'; ====> imported directly in index.html
	

	//datatables
	//import './libs/datatables/datatables.js'; ====> imported directly in index.html
	//import './libs/datatables/datatables.css'; ====> imported directly in index.html
	

	//datepicker
	import './libs/datepicker/datepicker.js';
	import './libs/datepicker/datepicker.css';

	//others
	import './style/fontawesome/css/all.min.css';
	import './style/extra.css';
	import './style/printable.css';
	
	export let url = window.location.pathname;
	const getSidemenuData=async ()=>{
		let response = await fetch("/json/sidemenu.json");
		response = await response.json();
		return response;
	}
	let sidemenuData = getSidemenuData();
</script>
{#if sidemenuData}
	{#await sidemenuData}
		<span></span>
	{:then data}
		{#if data.enabled}
			<SideMenu title={data.title} user={data.user} sections={data.sections}/>
		{/if}
	{:catch error}
		<span></span>
	{/await}
{/if}
{#if !$printer.showing}
	<Main url={url} />
{:else}
	<Printing />
{/if}