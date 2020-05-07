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

	let marriages = [];
	let newMarriage = {
		country: "",
		year: parseInt("") ,
		marriages: "",
		avg_wm:"",
		avg_m:""
	};

//Usaremos estas variables para la paginacion y para la busqueda
	let countries = [];
	let years = [];
	let currentCountry = "-";
	let currentYear = "-";

	let numberElementsPages = 10;
	let offset = 0;
	let currentPage = 1; 
	let moreData = true; 

	let pageButton = true;

	onMount(getMarriages);
	onMount(getCountriesYears);



	async function ReloadTable() {
		const res = await fetch("/api/v2/global-marriages/loadInitialData")

		if (res.ok) {
			const initialMarriages = await res.json();
			console.log("Contados "+ initialMarriages.length +" datos de matrimonios")
			getMarriages();
			responseAlert("Se ha reiniciado la tabla correctamente con los valores iniciales")
		}else{
			console.log("No se han cargado correctamente los datos inicales")
			errorResponse(res)
		}
	}



//Funcion que devuelve array con los años y los paises existentes para poder hacer un select y usarlo para buscar
	async function getCountriesYears() {
		const res = await fetch("/api/v2/global-marriages"); //Recogemos los datos de /api/v2/global-marriages

		if (res.ok) {
			const json = await res.json();

			countries = json.map((d) => {
					return d.country;            //Guardamos los paises 
			});
			countries = Array.from(new Set(countries));   //Eliminamos los duplicados
			
			
			years = json.map((d) => {   
					return d.year;    //Guardamos los años en un array
			});
			years = Array.from(new Set(years));      //Eliminamos años repetidos

			console.log("Contados " + countries.length + "paises y " + years.length + "años distintos.");

		} else {

			errorResponse(res)
		}
	}

	


	async function getMarriages() {

		console.log("Fetching marriages...");
		const res = await fetch("/api/v2/global-marriages?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages); 

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			marriages = json;
			console.log("Received " + marriages.length + " marriages.");

			
			if (marriages.length!=10){
				moreData=false
			} else{

						const next = await fetch("/api/v2/global-marriages?offset=" + numberElementsPages * (offset+1) + "&limit=" + numberElementsPages); 
						console.log("La variable NEXT tiene el estado: " + next.status)
						const jsonNext = await next.json();
						
						
						
						if (jsonNext.length == 0 || next.status==404) {  
							moreData = false;
						} 
						else {
							moreData = true;  //Vemos si quedan aun mas datos en la siguiente pagina
						}
					}
		} 
		else {
			if (res.status==404) {
				alert("No hay datos guardados")
			} else{
				errorResponse(res)
			}
		}
	}

	async function insertMarriage() {

		console.log("Inserting marriage..." + JSON.stringify(newMarriage));

		if (newMarriage.country == ""
			|| newMarriage.country == null
			|| newMarriage.year == "" 
			|| newMarriage.year == null) {
			
			alert("Se debe incluir el nombre del país y el año obligatoriamente");

		} else {
				const res = await fetch("/api/v2/global-marriages", {
					method: "POST",
					body: JSON.stringify(newMarriage),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function (res) {
					if (res.ok){
						getMarriages();
						responseAlert("Datos de " +newMarriage.country + " añadidos correctamente")
					} else{
						errorResponse(res)
					}
					
				});
			}
	}


	//Borramos un pais en un año concreto
	async function deleteMarriage(country,year) {
		console.log("Deleting marrriage..." + JSON.stringify(country)+ + JSON.stringify(year) );

		const res = await fetch("/api/v2/global-marriages/" + country+"/"+year, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				getMarriages();
				getCountriesYears();
				responseAlert("El dato se ha borrado correctamente")
			} 
			else {
				errorResponse(res);
			}
		});
	}

	//Borramos todos los paises
	async function deleteGlobalMarriages() {
		console.log("Deleting all marriages data...");
		const res = await fetch("/api/v2/global-marriages/", {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
			const json =  res.json();
			marriages = json;
			responseAlert("Todos los datos se han borrado correctamente")
		} else{
			errorResponse(res);
		}
			//getMarriages();
			//getCountriesYears();
		});
	}


	async function search(country, year) {
		pageButton=false;
		console.log("Searching data: " + country + " and " + year);

		/* Checking if the fields are empty */
		var url = "/api/v2/global-marriages";

		if (country != "-" && year != "-") {
			url = url + "?country=" + country + "&year=" + year; 
		} else if (country != "-" && year == "-") {
			url = url + "?country=" + country;
		} else if (country == "-" && year != "-") {
			url = url + "?year=" + year;
		}

		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			marriages = json;			


			console.log("Found " + marriages.length + " global marrriages stats.");
		
			if (country != "-" && year != "-") {
				responseAlert("Busqueda de "+ country+ " en el año " + year +" realizada correctamente")  
		} else if (country != "-" && year == "-") {
				responseAlert("Busqueda de "+ country  +" realizada correctamente" )  
		} else if (country == "-" && year != "-") {
				responseAlert("Busqueda en el año "+ year+ " realizada correctamente")  
		}
		} else {
			errorResponse(res)
			console.log("ERROR!");
		}
		
	}

	function addOffset (increment) {
		offset += increment;
		currentPage += increment;
		getMarriages();
	}



	function responseAlert(msg) {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-success";
		alert_element.innerHTML = "<strong>¡Exito!</strong> " + msg;
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}

	function clearAlert () {
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "display: none; ";
		alert_element.className = "alert alert-dismissible in";
		alert_element.innerHTML = "";
	}

function errorResponse(res, msg) {
	var status = res.status
	switch (status) {
		case 400:
			alert("Codigo de error: " + status + '\n'+ "Los datos introduccidos no son validos");
			break;
		case 401:
			alert("Codigo de error: " + status + '\n'+ "No tiene permisos para realizar esta accion");
			break;
		case 404:
			alert("Codigo de error: " + status + '\n'+ "Página no encontrada");
			break;
		case 405:
			alert("Codigo de error: " + status + '\n'+ "Metodo no permitido");
			break;
		case 409:
			alert("Codigo de error: " + status + '\n'+ "Conclifto con la operacion");
			break;

		default:
			if (status!=400 && status!=401 && status!=404 && status!=405  && status!=409  && status!=200  && status!=2001) {
				alert("Codigo de error: "+ status +'\n'+ "Error de desconocido por el sistema")
				break;

			}else{
				break;
			}
			
	}
}


</script>

<main>
	<div role="alert" id="div_alert" style="display: none;">
	</div>
	{#await marriages}
		Loading marriages...
	{:then marriages}

		<FormGroup> 
			<Label for="selectCountry"> Búsqueda por país </Label>
			<Input type="select" name="selectCountry" id="selectCountry" bind:value="{currentCountry}">
				{#each countries as country}
				<option>{country}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>
				
		<FormGroup>
			<Label for="selectYear"> Año </Label>
			<Input type="select"  name="selectYear" id="selectYear" bind:value="{currentYear}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>

		<Button outline color="secondary" on:click="{search(currentCountry, currentYear)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>
		

		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Matrimonios Registrados</th>
					<th>Media de edad en hombres</th>
					<th>Media de edad en mujeres</th>
					<th>Acciones</th>

				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input  placeholder="Ej. Spain" bind:value="{newMarriage.country}"></td>
					<td><input type="number" placeholder="Ej. 2020" bind:value="{newMarriage.year}" ></td>
					<td><input type="number" placeholder="Ej. 542121" bind:value="{newMarriage.marriages}"></td>
					<td><input type="number" placeholder="Ej. 26" bind:value="{newMarriage.avg_m}"></td>
					<td><input type="number" placeholder="Ej. 25" bind:value="{newMarriage.avg_wm}"></td>
					<td> <Button outline  color="primary" on:click={insertMarriage} > Insertar</Button> </td>
				</tr>
				{#each marriages as marriage}
					<tr>
						<td>
							<a href="#/global-marriages/{marriage.country}/{marriage.year}">{marriage.country}</a>
						</td>
						<td>{marriage.year}</td>
						<td>{marriage.marriages}</td>
						<td>{marriage.avg_m}</td>
						<td>{marriage.avg_wm}</td>
						<td><Button outline color="danger" on:click="{deleteMarriage(marriage.country,marriage.year)}">  <i class="fa fa-trash" aria-hidden="true"></i> Borrar</Button>	</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
 
	{#if pageButton == true}
	<Pagination style="float:right;" ariaLabel="Cambiar de página">


		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/globalMarriagesAPI" on:click="{() => addOffset(-1)}" />
		</PaginationItem>
		
		<!-- If we are not in the first page-->
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/globalMarriagesAPI" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/globalMarriagesAPI" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- If there are more elements-->
		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/globalMarriagesAPI" on:click="{() => addOffset(1)}">{currentPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/globalMarriagesAPI" on:click="{() => addOffset(1)}"/>
		</PaginationItem>

	</Pagination>
	{/if}

	<Button outline  color="secondary"  on:click="{getMarriages}" > <i class="fas fa-arrow-circle-left"></i> Inicio API </Button>
	<Button outline  on:click={deleteGlobalMarriages}   color="danger"> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo </Button>
	<Button outline  color="primary" on:click="{ReloadTable}"> <i class="fas fa-search"></i> Recargar API </Button>


</main>