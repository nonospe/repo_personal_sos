<script>

	import  {onMount} from "svelte";
	//import Table from "sveltestrap/src/Table.svelte";
	//import Button from "sveltestrap/src/Button.svelte";
	//import Label from "sveltestrap/src/Label.svelte";
	//import FormGroup from "sveltestrap/src/FormGroup.svelte";
	//import Input from "sveltestrap/src/Input.svelte";
	import  {pop} from "svelte-spa-router";
	import { Pagination, PaginationItem, PaginationLink, Table, Button, Label, FormGroup, Input} from 'sveltestrap';

	const URL_BASE = "api/v2/global-suicides";
	
	let elementsLimit = 10;
	let cont = elementsLimit;
	let offset = 0;
	let showed = 0;
	let numberOfPag = 0;
	let totalElements = 0;
	let nextButton = false;
	let backButton = false;
	let popSearch = false;
	

	let suicides = [];
	let newSuicide = {//Tenemos más abajo la función resetNewSuicide() que resetea los parámetros una vez se crea un pais.
		country: "...",
		lengthCoord: 0,
		latitudeCoord: 0,
		year: 0,
		men: 0,
		women: 0,
		average: 0
	};

	let searchCountry = "";

	onMount(getSuicides);

	async function getSuicides(){

		console.log("Fetching suicides...");
		const res  = await fetch(URL_BASE);//await Bloquea hasta que tienen un valor ESTE ES EL GET QUE HACE INICIAL
		
		if(res.ok){
			const json = await res.json();
			suicides = json;
			console.log("OK. getSuicides().");
			totalElements = suicides.length;
			console.log("Total de elementos: "+suicides.length+".");

			if(suicides.length > elementsLimit){
				nextButton = true;
				console.log("suicides.length > elementsLimit");
				const next = await fetch(URL_BASE+"?offset="+offset+"&limit="+elementsLimit)
				showed = elementsLimit+offset;
				console.log("showed get: "+showed);
				console.log("offset get: "+offset);
				if(showed >= totalElements){
					nextButton = false;
				}
				suicides = next.json();
			}else{
				nextButton = false;
				backButton = false;
			}
		}else{

			console.log("TABLA VACÍA!! No se puede cargar la tabla. Compruebe si está vacía.");
			window.location.href= "/#/empty";
			
		}
	}

	async function insertSuicide(){
		
		console.log("Inserting suicide...");
		popSearch = false;

		const res  = await fetch(URL_BASE, {
			method: "POST",
			body: JSON.stringify(newSuicide),
			headers:{
				"Content-type": "application/json"
			}
		}).then(function (res) {
			if(res.ok){
				responseAlert();
			resetNewSuicite();//función que resetea los parámetros de entrada
			getSuicides();
			location.reload();
			}else{
				errorResponse(res);
			}
			
		});
	}

	async function deleteSuicide(country){
		
		console.log("Deleting suicide...");
		popSearch = false;

		const res  = await fetch(URL_BASE +"/"+ country,{
			method: "DELETE",
			body: JSON.stringify(newSuicide),
			headers:{
				"Content-type": "application/json"
			}
		}).then(function (res) {
			responseAlert();			
			getSuicides();
			location.reload();
		});
	}

	async function deleteSuicides(){
		console.log("Deleting all suicides...");
		const res  = await fetch(URL_BASE, {
			method: "DELETE"}).then(function(res){
				responseAlert();
				getSuicides();
			});
	}

	async function reloadSuicides(){
		console.log("Reloading suicide...");
		const res  = await fetch(URL_BASE+"/loadInitialData", {
			method: "GET",
			body: JSON.stringify(),
			headers:{
				"Content-type": "application/json"
			}
		}).then(function (res) {
			getSuicides();
			responseAlert();
			location.reload();
		});
	}


	async function searchSuicides(searchCountry) {
		console.log("Searching suicides...");

		nextButton = false;
		backButton = false;

		if(searchCountry == ""){
			alert("Debe introducir un País.");
			location.reload();
		}else{
			
		const res  = await fetch(URL_BASE+"/"+searchCountry, {
		method: "GET"});
		if(res.ok) {
			popSearch = true;
			console.log("Ok:");
			const json = await res.json();
			suicides = json;
			console.log(suicides);
			responseAlert();
		}else{
			console.log("NO existe");
			errorResponse(res,searchCountry);
			getSuicides();
		}
		}	
	}

	async function resetNewSuicite(){

		console.log("Reset New Suicide...");
		newSuicide = {
				country: "...",
				lengthCoord: 0,
				latitudeCoord: 0,
				year: 0,
				men: 0,
				women: 0,
				average: 0
	};

	}

	async function nextPage(){

		console.log("Next Page...");
		console.log("Mostrados previo: "+showed);
		backButton = true;

		if(showed != totalElements){
			console.log("Mostrados actual: "+showed);
			offset +=cont;
			numberOfPag++;
			getSuicides();
			console.log("numero de pagina next1: "+numberOfPag);
		}
		console.log("numero de pagina next fin: "+numberOfPag);
	}

		async function backPage(){

		console.log("Back Page...");
		console.log("Mostrados: "+showed);
		nextButton = true;

		if(showed>elementsLimit){
			console.log("showed>elementsLimit");
			//nextButton = false;
			offset -= cont;
			showed -= cont;
			numberOfPag--;
			console.log("numero de paginas backpage 1: "+numberOfPag);
			//getSuicides();
			
		}
		if(showed<elementsLimit){
			nextButton = true;
			backButton = false;
			//getSuicides();
		}
		if(showed==elementsLimit){
			nextButton = false;
			backButton = false;
			//getSuicides();
		}
		console.log("numero de paginas backpage fin: "+numberOfPag);
		getSuicides();
	}

	function errorResponse(res, recurso) {
	var status = res.status
	switch (status) {
		case 400:
			alert("Codigo de error: " + status + '\n'+ "Error. Problema en la gestión de la petición. Parámetros no válidos.");
			break;
		case 401:
			alert("Codigo de error: " + status + '\n'+ "Error. Acción no autorizada.");
			break;
		case 404:
			alert("Codigo de error: " + status + '\n'+ "Error. Recurso '" +recurso+ "' no encontrado.");
			break;
		case 405:
			alert("Codigo de error: " + status + '\n'+ "Error. Acción no permitida.");
			break;
		case 409:
			alert("Codigo de error: " + status + '\n'+ "Error. Conflicto.");
			break;
		default:
			alert("Codigo de error: "+ status +'\n'+ "Error de desconocido.")
			break;
	}
}

function responseAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-success";
		alert_element.innerHTML = "<strong>¡Éxito!</strong> Acción realizada correctamente.";
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}

function clearAlert() {
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "display: none; ";
		alert_element.className = "alert alert-dismissible in";
		alert_element.innerHTML = "";
	}

function resetPopSearch() {
	popSearch = false;
	location.reload();
	//getSuicides();
	//window.location.href= "/#/global-suicides_API";
	}

function toGraph1(){
	window.location.href= "/#/suicidesGraph";
}

function toGraph2(){
	window.location.href= "/#/suicidesGraph2";
}

function toHome(){
	window.location.href= "/#/";
}

function toIntegrations(){
	window.location.href= "/#/integrations_suicides";
}

</script>

<main>
	<p></p>
	<div role="alert" id="div_alert" style="display: none;">
	</div>
	
	

	{#await suicides}

		Loading suicides...

	{:then suicides}
	<p></p>
	<h6>Acciones Especiales:</h6>
	<Button color="success" on:click="{reloadSuicides}">Reiniciar API</Button>
	<Button color="danger" on:click="{deleteSuicides}">Borrar API</Button>
	<Button color="primary" on:click="{toGraph1}">Grafico1</Button>
	<Button color="primary" on:click="{toGraph2}">Grafico2</Button>
	<Button color="success" on:click="{toHome}">Inicio</Button>
	<Button color="dark" on:click="{toIntegrations}">Integraciones</Button>
	<p></p>
	<FormGroup>
			<Label for="exampleEmail">Buscar País:</Label>
		<Input type="country" placeholder="Introducir País..." bind:value="{searchCountry}"/>
	</FormGroup>

	<Button color="success" on:click="{searchSuicides(searchCountry)}">Buscar</Button>
	<p></p>
	<h6>Total de recursos: {totalElements}</h6> 
	<Table bordered>
			<thead>
				<tr>
					<th>Acción</th>
					<th>País</th>
					<th>Coord. Longitud</th>
					<th>Coord. Latitud</th>
					<th>Año</th>
					<th>Hombre</th>
					<th>Mujer</th>
					<th>Media</th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<td><Button color="primary" on:click="{insertSuicide}">Añadir</Button> </td>
						<td><input bind:value="{newSuicide.country}"> </td>
						<td><input bind:value="{newSuicide.lengthCoord}"> </td>
						<td><input bind:value="{newSuicide.latitudeCoord}"> </td>
						<td><input bind:value="{newSuicide.year}"> </td>
						<td><input bind:value="{newSuicide.men}"> </td>
						<td><input bind:value="{newSuicide.women}"> </td>
						<td><input bind:value="{newSuicide.average}"> </td>
				</tr>
				{#each suicides as suicide}
					<tr>
						<td><Button outline color="danger" on:click="{deleteSuicide(suicide.country)}">Eliminar</Button> </td>
						<td><a href="#/suicide/{suicide.country}">{suicide.country}</a></td>
						<td>{suicide.lengthCoord}</td>
						<td>{suicide.latitudeCoord}</td>
						<td>{suicide.year}</td>
						<td>{suicide.men}</td>
						<td>{suicide.women}</td>
						<td>{suicide.average}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
	{#if backButton}
	<Button outline color="primary" on:click="{backPage}">Página Anterior</Button>
	{/if}
	{#if nextButton}
	<Button color="primary" on:click="{nextPage}">Siguiente página</Button>
	{/if}
	{#if popSearch}
	<Button color="primary" on:click="{getSuicides}" on:click="{resetPopSearch}">Inicio</Button>
	{/if}

</main>