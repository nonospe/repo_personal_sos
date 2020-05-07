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
    
    export let params = {};

    let editDivorce = {};

    let updatedCountry = "";
    let updatedYear = 1234;
    let updatedDivorce = 12345;
    let updatedCrude_rate = 0;
    let updatedVariation = 0;
   
    let errorMsg = "";


    onMount(getDivorce);


//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////GET globalDivorces  //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

    async function getDivorce() {
        console.log("Fetching divorce...");
        const res = await fetch("/api/v2/global-divorces/" + params.country +"/"+params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            editDivorce = json;
            updatedCountry = editDivorce.country;
            updatedYear = editDivorce.year;
            updatedDivorce = editDivorce.divorce;
            updatedCrude_rate=editDivorce.crude_rate;
            updatedVariation=editDivorce.variation;
            console.log("Received divorce.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////      Update Divorce      ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
    async function updateDivorce(){
        console.log("Updating divorce...");
        const res = await fetch("/api/v2/global-divorces/" + params.country +"/"+params.year,{
        
        method:"PUT",
        body: JSON.stringify({
        country: params.country,
        year: parseInt(params.year),
        divorce: parseInt(updatedDivorce),
        crude_rate: parseFloat(updatedCrude_rate),
        variation: parseFloat(updatedVariation)
        }),
        headers: {
                "Content-Type": "application/json"
            }   }).then(function (res) {
             if (res.ok) {
                getDivorce();
                successAlert("País actualizado.");
            } 
            else if (res.status == 404) {
                errorAlert("Se ha intentado borrar un elemento inexistente.");
                } 
            else {
                   errorResponse(res);
                }
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
<main>
    <div role="alert" id="div_alert" style="display: none;">
	</div>
	{#await editDivorce}
		Loading divorce...
    {:then editDivorce}
    

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
					<td>{updatedCountry}</td>
					<td>{updatedYear}</td>
					<td><input type="number" bind:value="{updatedDivorce}"></td>
					<td><input type="number" bind:value="{updatedCrude_rate}"></td>
                    <td><input type="number" bind:value="{updatedVariation}"></td>
					<td> <Button outline  color="primary" on:click={updateDivorce}>Actualizar</Button> </td>
				</tr>
			
			</tbody>
			

		</Table>
    {/await}
    {#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</main>