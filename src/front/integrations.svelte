<script>

 import Button from "sveltestrap/src/Button.svelte";
 import  {pop} from "svelte-spa-router";

</script>

<main>
	
    <h2>Integraciones del grupo SOS1920-10</h2>
    <Button color="info" on:click="{pop}">Atrás</Button>
	<body>

	<p></p>
    <p></p>
    <p></p>
    <h4>Integraciones de Suicidios Globales</h4>
	<div class="div-home">
		<button type="button"   class="btn btn-primary"  onclick="window.location.href='#/integrations_suicides'">Int. G02</button>
		<button type="button"   class="btn btn-primary"  onclick="window.location.href='#/integrations_suicides2'">Int. G01</button>
        <button type="button"   class="btn btn-primary"  onclick="window.location.href='#/integrations_suicides3'">Int. G26</button>
        <button type="button"   class="btn btn-primary"  onclick="window.location.href='#/integrations_suicides4'">Int. G22</button>
        <button type="button"   class="btn btn-primary"  onclick="window.location.href='#/integrations_suicides_external'">Int. Ext_1</button>
	</div>

</body>
</main>