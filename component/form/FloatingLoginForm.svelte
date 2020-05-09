<script>
	import Checkbox from './../input/Checkbox.svelte';
	import InputField from './../input/InputField.svelte';
	import uuid from './../../script/uuid.js';
	export let submit;
	export let forgotPassword;
	let id = uuid();
	let email="",password="",rememberMe=false;
</script>
<div class="container">
	<div class="row">
		<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
			<div class="card card-signin my-5">
				<div class="card-body">
				<h5 class="card-title text-center">Login</h5>
				<form class="form-signin" on:submit={e=>{e.preventDefault();submit({email:email,password:password,rememberMe:rememberMe})}}>
					<InputField bind:value={email} type={"text"} label={"Email address"}/>
					<InputField bind:value={password} type={"password"} label={"Password"}/>
					<Checkbox bind:checked={rememberMe} label={"Remember me"} />
					<button type="submit" class="btn btn-lg btn-primary btn-block text-uppercase">Login</button>
					<hr class="my-4">
					<div class="text-center">
						<span on:click={e=>forgotPassword(email)} class="small text-primary">Forgot password?</span>
					</div>
				</form>
				</div>
			</div>
		</div>
	</div>
</div>
<style>

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