<script>
	import Checkbox from './../input/Checkbox.svelte';
	import InputField from './../input/InputField.svelte';
	import uuid from './../../script/uuid.js';
	import {language} from './../../store/language.js';
	export let submit;
	export let forgotPassword;
	export let image;
	let id = uuid();
	let email="",password="",rememberMe=false;
	function submitEvent(e){
		e.preventDefault();
		submit({email:email,password:password,rememberMe:rememberMe});
	}
</script>

<div class="card card-signin my-5">
	{#if image && image !== ""}
		<img src={image} alt="logo" class="logo" />
	{/if}
	<div class="card-body">
	<h5 class="card-title text-center">{$language.login}</h5>
	<form class="form-signin" on:submit={submitEvent}>
		<InputField bind:value={email} type={"text"} label={$language.emailAddress}/>
		<InputField bind:value={password} type={"password"} label={$language.password}/>
		<Checkbox bind:checked={rememberMe} label={$language.rememberMe} />
		<button type="submit" class="btn btn-lg btn-primary btn-block text-uppercase">{$language.login}</button>
		<hr class="my-4">
		<div class="text-center">
			<span on:click={e=>forgotPassword(email)} class="small text-primary">{$language.forgotPasswordQ}</span>
		</div>
	</form>
	</div>
</div>

<style>
	.logo{
		max-width: 100%;
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}
  .card-signin {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }

  .card-signin .card-title {
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 1.5rem;
  }

  .card-signin .card-body {
    padding: 2rem;
  }

  .form-signin {
    width: 100%;
  }
</style>