<script>

	import {
			onMount
		} from "svelte";
		
		import {
			pop
		} from "svelte-spa-router";
		import Table from "sveltestrap/src/Table.svelte";
		import Button from "sveltestrap/src/Button.svelte";
		import Input from "sveltestrap/src/Input.svelte";
		
		import Label from "sveltestrap/src/Label.svelte";
		import FormGroup from "sveltestrap/src/FormGroup.svelte";

		import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';


	
	let currentCountry = "";

	let showPagination = true;

	let divorces = [];
	let newDivorce={
		country: "",
		year: parseInt(""),
		divorce: parseInt(""),
		crude_rate: parseFloat(""),
		variation: parseFloat("")

	};


	let numberElementsPages = 10;
	let offset = 0;
	let currentPage = 1; 
	let moreData = true;

	onMount(getDivorces);

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////GET globalDivorces  //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

	async function getDivorces() {

		const res = await fetch("/api/v2/global-divorces?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages); 

		console.log("Fetching divorces...");

		if(res.ok){
			console.log("Ok: ");
			const json = await res.json();
			divorces = json;
			console.log("Received " + divorces.length + " divorces.");

			if (divorces.length!=10){
				moreData=false
			} else{
						const next = await fetch("/api/v2/global-divorces?offset=" + numberElementsPages * (offset+1) + "&limit=" + numberElementsPages); 
						console.log("La variable NEXT tiene el estado: " + next.status)
						const jsonNext = await next.json();
						
						if (jsonNext.length == 0 || next.status==404) {  
							moreData = false;
						} 
						else {
							moreData = true; 
						}
					}
		} 
		
		else{console.log("ERROR!");
			errorResponse(res);}

	}


	function addOffset (increment) {
		offset += increment;
		currentPage += increment;
		getDivorces();
	}

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////GET globalDivorces  loadInitialData///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

	async function loadInitialData(){
		console.log("Loading Initial Data...");

		const res = await fetch("/api/v2/global-divorces/loadInitialData").then(function (res) {
			if(res.ok){
			console.log("Ok: ");
			successAlert("Datos insertados correctamente.");
			getDivorces();

		}
		else{console.log("ERROR!");
			errorResponse(res);
	}

				});

		

	}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////    Función de busqueda    /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

	async function search(country) {
		console.log("Searching data: " + country );

		var url = "/api/v2/global-divorces";
			url = url + "?country=" + country ; 
		const res = await fetch(url);
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			divorces = json;			
			console.log("Found " + divorces.length + " global divorces stats.");
			showPagination = false;
		} else {
			console.log("ERROR!");
			errorAlert("País " + country +" no encontrado.");
		}
		
	}
//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////       Insert Divorce      ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
	async function insertDivorce() {
		console.log("Inserting divorce..." + JSON.stringify(newDivorce));
		if (newDivorce.country == "" || newDivorce.country == null || newDivorce.year == "" 
			|| newDivorce.year == null) {
			
			errorAlert("Se debe incluir el nombre del país y el año obligatoriamente");
		} else {
				const res = await fetch("/api/v2/global-divorces", {
					method: "POST",
					body: JSON.stringify(newDivorce),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function (res) {
					if(res.ok){
					getDivorces();
					successAlert("¡Dato insertado correctamente!");
					}
					else{errorResponse(res);}
				});
			}
	}


//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////       Delete Divorce      ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

	async function deleteDivorce(country,year) {
		console.log("Deleting divorce..." + JSON.stringify(country) + JSON.stringify(year) );
		const res = await fetch("/api/v2/global-divorces/" + country+"/"+year, {
			method: "DELETE"
		}).then(function (res) {
			if(res.ok){
			getDivorces();
			successAlert("¡Dato eliminado correctamente!")
		}
			else{errorResponse(res);}
		});
	}

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////         Delte All         ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

	async function deleteAll() {
		console.log("Deleting divorces...");
		const res = await fetch("/api/v2/global-divorces/" , {
			method: "DELETE"
		}).then(function (res) {
			location.reload();
		});
	}


//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////         Funciones de alertas         /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

	function errorAlert(error) {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong>¡ERROR!</strong> ¡Ha ocurrido un error! " + error;
		
		setTimeout(() => {
			clearAlert();
		}, 6000);
	}

	function successAlert(mensaje) {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-success ";
		alert_element.innerHTML = "<strong>¡Exito!</strong> "+ mensaje;
		
		setTimeout(() => {
			clearAlert();
		}, 6000);
	}
	
	function clearAlert () {
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "display: none; ";
		alert_element.className = "alert alert-dismissible in";
		alert_element.innerHTML = "";
	}
function errorResponse(res) {
	var status = res.status
	switch (status) {
		case 400:
			alert("Codigo de error: " + status + '\n'+ "Error de prueba");
			break;
		case 401:
			alert("Codigo de error: " + status + '\n'+ "Error de prueba 1");
			break;
		case 404:
			alert("Codigo de error: " + status + '\n'+ "Error de prueba 1");
			break;
		case 405:
			alert("Codigo de error: " + status + '\n'+ "Error de prueba 1");
			break;
		case 405:
			alert("Codigo de error: " + status + '\n'+ "Error de prueba 1");
			break;
		default:
			alert("Codigo de error: "+ status +'\n'+ "Error de desconocido")
			break;
	}
}



</script>

<main style = "padding: 10px;">
	<div role="alert" id="div_alert" style="display: none;">
	</div>
	{#await divorces}
		Loading divorces...
	{:then divorces}

		<FormGroup> 
			<Label for="selectCountry"> Búsqueda por país </Label>
			<Input type="text" placeholder="Introduce un país" bind:value="{currentCountry}">
			</Input>
		</FormGroup>
				
	

		<Button style="margin-bottom: 1%;" outline color="primary" on:click="{search(currentCountry)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>
		

		<Table bordered style="text-align: center;">
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Divorcios</th>
					<th>Tasa bruta</th>
					<th>Variación</th>
					<th>Actions</th>

				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newDivorce.country}"></td>
					<td><input type="number" bind:value="{newDivorce.year}"></td>
					<td><input type="number" bind:value="{newDivorce.divorce}"></td>
					<td><input type="number" bind:value="{newDivorce.crude_rate}">‰</td>
					<td><input type="number" bind:value="{newDivorce.variation}"></td>
					<td> <Button outline  color="primary" on:click={insertDivorce}>Insertar</Button> </td>
				</tr>
				{#each divorces as d}
					<tr>
						<td>  <a href="#/globalDivorcesAPI/{d.country}/{d.year}">{d.country}</a>  </td>
						<td>{d.year}</td>
						<td>{d.divorce}</td>
						<td>{d.crude_rate}‰</td>
						<td>{d.variation}</td>
						<td> <Button outline  color="danger" on:click={deleteDivorce(d.country,d.year)}>Eliminar</Button> </td>

					</tr>
				{/each}
			</tbody>
			

		</Table>
	{/await}
	{#if showPagination == true}
	<div><Pagination style = "text-align: center;"  ariaLabel="Cambiar de página">


	<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
	  <PaginationLink previous href="#/globalDivorcesAPI" on:click="{() => addOffset(-1)}" />
	</PaginationItem>
	
	<!-- If we are not in the first page-->
	{#if currentPage != 1}
	<PaginationItem>
		<PaginationLink href="#/globalDivorcesAPI" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
	</PaginationItem>
	{/if}
	<PaginationItem active>
		<PaginationLink href="#/globalDivorcesAPI" >{currentPage}</PaginationLink>
	</PaginationItem>

	<!-- If there are more elements-->
	{#if moreData}
	<PaginationItem >
		<PaginationLink href="#/globalDivorcesAPI" on:click="{() => addOffset(1)}">{currentPage + 1}</PaginationLink>
	</PaginationItem>
	{/if}

	<PaginationItem class="{moreData ? '' : 'disabled'}">
	  <PaginationLink next href="#/globalDivorcesAPI" on:click="{() => addOffset(1)}"/>
	</PaginationItem>

</Pagination></div>
	{/if}
	<div>
		
	<Button style="float: right;" outline  color="danger" on:click={deleteAll}>Eliminar todos los recursos</Button>
	<Button style="float: left;" outline  color="primary" on:click={loadInitialData} on:click={showPagination=true}>Recargar recursos</Button>

	</div>
	{#if showPagination==false}
	<Button style="float: left; margin-left: 20px;" outline  color="secondary" on:click={getDivorces} on:click={showPagination=true}>Atrás</Button>	
	{/if}

	{#if showPagination==true}
	<Button style="float: left; margin-left: 20px;" outline  color="secondary" on:click={pop} on:click={showPagination=true}>Atrás</Button>	
	{/if}
	
</main>
