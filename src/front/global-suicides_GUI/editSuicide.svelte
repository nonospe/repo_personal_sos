<script>
    
import  {onMount} from "svelte";
import  {pop} from "svelte-spa-router";
import Table from "sveltestrap/src/Table.svelte";
import Button from "sveltestrap/src/Button.svelte";
const URL_BASE = "api/v2/global-suicides";

    export let params = {};
    let suicides = [];

    let suicideAux = {};

    let editedCountry = "...";
    let editedLengthCoord = 0;
    let editedLatitudeCoord = 0;
    let editedYear = 0;
    let editedMen = 0;
    let editedWomen = 0;
    let editedAverage = 0;

    let errorMGS = "";

    
	onMount(getSuicide);

    async function getSuicide(){

    console.log("Fetching suicide...");
    const res  = await fetch(URL_BASE + "/" + params.countryName);

    console.log("Executing in editSuicide getSuicide().");

    if(res.ok){

        console.log("OK. 1");
        const json = await res.json();
        suicideAux = json[0]; // suicides(001*)

        editedCountry = suicideAux.country;
        editedLengthCoord = suicideAux.lengthCoord;
        editedLatitudeCoord =suicideAux.latitudeCoord;
        editedYear =suicideAux.year;
        editedMen = suicideAux.men;
        editedWomen = suicideAux.women;
        editedAverage =suicideAux.average;

        /*suicides.forEach((suicideAux) => {

        console.log("Suicide Aux: "+suicideAux);

        console.log("Pais de suicide aux: "+suicideAux.country);
        
        editedCountry = suicideAux.country;
        editedLengthCoord = suicideAux.lengthCoord;
        editedLatitudeCoord =suicideAux.latitudeCoord;
        editedYear =suicideAux.year;
        editedMen = suicideAux.men;
        editedWomen = suicideAux.women;
        editedAverage =suicideAux.average;

		});*/ //Descomentar para habilitar una funcionalidad adicional con la que al clicar en el país busca todos los paises. (001*)

        console.log("Suicide recived.");


    }else{
        errorMGS = res.status + ": " + res.statusText;
        //switch(res.status) para dar mensajes según error. Desarrollaremos una función para ello.
        console.log("ERROR! Not found this country... editSuicide-getSuicide().");
        editedCountry = "Not Found";
        editedLengthCoord = "####";
        editedLatitudeCoord = "####";
        editedYear = "";
        editedMen = "";
        editedWomen = "";
        editedAverage = "";
        errorResponse(res);
        }
    }

    async function editSuicide(){

		console.log("Editing suicide..."+JSON.stringify(params.countryName));
		const res  = await fetch(URL_BASE + "/" + params.countryName, {
			method: "PUT",
			body: JSON.stringify({
                country: params.countryName,
                lengthCoord: parseFloat(editedLengthCoord),
                latitudeCoord: parseFloat(editedLatitudeCoord),
                year: parseInt(editedYear),
                men: parseFloat(editedMen),
                women: parseFloat(editedWomen),
                average: parseFloat(editedAverage)
            }),
			headers:{
				"Content-type": "application/json"
			}
		}).then(function (res) {
            if(res.ok){
                responseAlert();
                getSuicide();
            }else{
                errorResponse(res);
            }
			
		});
    }

	function errorResponse(res) {
	var status = res.status
	switch (status) {
		case 400:
			alert("Codigo de error: " + status + '\n'+ "Error. Problema en la gestión de la petición. Parámetros no válidos.");
			break;
		case 401:
			alert("Codigo de error: " + status + '\n'+ "Error. Acción no autorizada.");
			break;
		case 404:
			alert("Codigo de error: " + status + '\n'+ "Error. Recurso no encontrado.");
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

function clearAlert () {
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "display: none; ";
		alert_element.className = "alert alert-dismissible in";
		alert_element.innerHTML = "";
	}

</script>

<main>

    <p></p>
	<div role="alert" id="div_alert" style="display: none;">
	</div>

    <h3>Edición de Suicidio: {params.countryName}</h3>
    {#await suicideAux}

	Cargando Datos...

	{:then suicides}
		<Table bordered>
			<thead>
				<tr>
					<th>Editar</th>
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
               <!-- {#each suicides as suicide} (001*)-->
				<tr>
				<td><Button color="secondary" on:click="{editSuicide}">Confirmar</Button> </td>
						<td>{editedCountry}</td>
						<td>{editedLengthCoord}</td>
						<td>{editedLatitudeCoord} </td>
						<td><input bind:value="{editedYear}"> </td>
						<td><input bind:value="{editedMen}"> </td>
						<td><input bind:value="{editedWomen}"> </td>
						<td><input bind:value="{editedAverage}"> </td>
				</tr>
              <!-- {/each}>(001*)-->
			</tbody>

		</Table>
    {/await}
    {#if errorMGS}
    <p style="color: red">Error: {errorMGS}</p>
    {/if}
    <Button color="info" on:click="{pop}">Atrás</Button>
</main>