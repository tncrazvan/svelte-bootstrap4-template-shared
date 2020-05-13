<script>
	import InputField from './../input/InputField.svelte';
	import Checkbox from './../input/Checkbox.svelte';
	import uuid from './../../script/uuid.js';
	import { language } from './../../store/language.js';
	export let submit;
	export let image;
	export let forgotPassword;
	let id = uuid();
	let email="",password="",rememberMe=false;
	let doc;
</script>
<div class="container-fluid">
	<div class="row no-gutter">
		<div class="d-none d-md-flex col-md-4 col-lg-6 bg-image" style="background-image: url('{image}')"></div>
		<div class="col-md-8 col-lg-6">
			<div class="login d-flex align-items-center py-5">
				<div class="container">
					<div class="row">
						<div class="col-md-9 col-lg-8 mx-auto">
							<h3 class="login-heading mb-4">{$language.login}</h3>
							<form on:submit={e=>{e.preventDefault();submit({email:email,password:password,rememberMe:rememberMe})}}>
								<InputField bind:value={email} label={$language.emailAddress} />
								<InputField bind:value={password} label={$language.password} />
								<Checkbox bind:checked={rememberMe} label={$language.rememberMe} />
								<button type="submit" class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2">{$language.login}</button>
								<div class="text-center">
									<span on:click={e=>forgotPassword(email)} class="small text-primary">{$language.forgotPasswordQ}</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<style>

	.login{
		min-height: 100vh;
	}

	.bg-image {
		background-size: cover;
		background-position: center;
	}

	.login-heading {
		font-weight: 300;
	}
</style>