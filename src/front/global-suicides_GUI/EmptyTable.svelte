<script>
    
import  {pop} from "svelte-spa-router";
import {Table, Button} from 'sveltestrap';// /src/Table.svelte";
//import Button from "sveltestrap/src/Button.svelte";  
const URL_BASE = "api/v2/global-suicides";
    
    let editedCountry = "Vacío";
    let editedLengthCoord = "0.0";
    let editedLatitudeCoord = "0.0";
    let editedYear = "0.0";
    let editedMen = "0.0";
    let editedWomen = "0.0";
    let editedAverage = "0.0";

    let errorMGS = "";
    

    async function addingSuicide(){

        console.log("Adding suicide...");
        const res  = await fetch(URL_BASE, {
            method: "POST",
            body: JSON.stringify({
                country: editedCountry,
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
                window.location.href= "/#/global-suicides_API";
            }else{
                errorResponse(res);
            }
            
        });
     }

     async function reloadSuicides(){
		console.log("Deleting suicide...");
		const res  = await fetch(URL_BASE+"/loadInitialData", {
			method: "GET",
			body: JSON.stringify(),
			headers:{
				"Content-type": "application/json"
			}
		}).then(function (res) {
            responseAlert();
			window.location.href= "/#/global-suicides_API";
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
        <p></p>
        <h6>Acción Especial:</h6>
        <Button color="success" on:click="{reloadSuicides}">Reiniciar API</Button>
        <p></p>
        <h3>Añadir Datos de Suicidio.</h3>
        
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
                    <td><Button color="primary" on:click="{addingSuicide}">Añadir</Button> </td>
                            <td><input bind:value="{editedCountry}"></td>
                            <td><input bind:value="{editedLengthCoord}"></td>
                            <td><input bind:value="{editedLatitudeCoord}"></td>
                            <td><input bind:value="{editedYear}"></td>
                            <td><input bind:value="{editedMen}"></td>
                            <td><input bind:value="{editedWomen}"></td>
                            <td><input bind:value="{editedAverage}"></td>
                    </tr>
    
                </tbody>
    
            </Table>
        {#if errorMGS}
        <p style="color: red">Error: {errorMGS}</p>
        {/if}
    </main>