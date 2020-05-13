<script>
	import Checkbox from './../input/Checkbox.svelte';
	import InputField from './../input/InputField.svelte';
  import Alert from './../misc/Alert.svelte';
  import uuid from './../../script/uuid.js';
	import { language } from './../../store/language.js';
  export let validate;
  export let submit;
  export let login;
  export let image = "";
  let id = uuid();
  let username="",email="",password="",confirm="",terms=false;
  let error = "";
  function check(){
      error = "";
      const validation = validate({username:username,email:email,password:password,confirm:confirm,terms:terms});
      if(validation === true)
        submit({username:username,email:email,password:password,confirm:confirm,terms:terms})
      else if(validation === false)
        error = $language.unknownValidationError;
      else
        error = validation;
  }
</script>
<div class="container">
	<div class="row">
		<div class="col-lg-10 col-xl-9 mx-auto">
			<div class="card card-signin flex-row my-5">
				<div class="card-img-left d-none d-md-flex" style="background: scroll center url('{image}');">
					<!-- Background image for card set in CSS! -->
				</div>
				<div class="card-body">
				<h5 class="card-title text-center">{$language.register}</h5>
				<form class="form-signin" on:submit={e=>{e.preventDefault();check();}}>
          <InputField bind:value={username} type={"text"} label={$language.username}/>
          <InputField bind:value={email} type={"text"} label={$language.emailAddress}/>
          <hr>
          <InputField bind:value={password} type={"text"} label={$language.password}/>
          <InputField bind:value={confirm} type={"text"} label={$language.confirmPassword}/>

          <Checkbox bind:checked={terms} label={$language.iReadTheTermsOfUse}/>
          {#if error !== ""}
          <Alert text={error} level="danger"/>
          {/if}
					<button type="submit" class="btn btn-lg btn-primary btn-block text-uppercase">{$language.register}</button>
					<hr class="my-4">
					<span on:click={e=>login()} class="d-block text-center mt-2 small text-primary">{$language.login}</span>
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
    overflow: hidden;
  }

  .card-signin .card-title {
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 1.5rem;
  }

  .card-signin .card-img-left {
    width: 45%;
    /* Link to your background image using in the property below! */
    /*background: scroll center var(--img);*/
    background-size: cover;
  }

  .card-signin .card-body {
    padding: 2rem;
  }

  .form-signin {
    width: 100%;
  }
</style>