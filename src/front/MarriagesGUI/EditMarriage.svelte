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
    let marriage = {};
    let updatedCountry = "XXXX";
    let updatedYear = 12345;
    let updatedMarriages =33333;
    let updatedAvg_m =33;
    let updatedAvg_wm =33;
    let errorMsg = "";

    onMount(getMarriage);

    async function getMarriage() {

        console.log("Fetching marriage...");
        const res = await fetch("/api/v2/global-marriages/" + params.country +"/"+params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            marriage = json;
            updatedCountry = marriage.country;
            updatedYear = marriage.year;
            updatedMarriages = marriage.marriages;
            updatedAvg_m=marriage.avg_m;
            updatedAvg_wm=marriage.avg_wm;
            console.log("Received marriage.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updateMarriage() {

        console.log("Updating marriage..." + JSON.stringify(params.country));

        const res = await fetch("/api/v2/global-marriages/" + params.country +"/"+params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                year: parseInt(params.year),
                marriages: updatedMarriages,
                avg_m: updatedAvg_m,
                avg_wm: updatedAvg_wm
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if (res.ok) {
                 getMarriage();
                 responseAlert("Los datos de " +params.country+ " en el año " +params.year +" han sido actualizados correctamente")
            } else if (res.status == 404) {
                    errorAlert("Se ha intentado borrar un elemento inexistente.");
                } else {
                    errorResponse(res);
                }
        });
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

    
function errorResponse(res) {
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
    <h3>Edit Marriage <strong>{params.country}</strong></h3>
    {#await marriage}
        Loading marriages...
    {:then marriage}
        <Table bordered>
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Matrimonios</th>
                    <th>Media en hombres</th>
                    <th>Media en mujeres</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input type="number" bind:value="{updatedMarriages}"></td>
                    <td><input type="number" bind:value="{updatedAvg_m}"></td>
                    <td><input type="number" bind:value="{updatedAvg_wm}"></td>
                    <td> <Button outline  color="primary" on:click={updateMarriage}> <i class="fas fa-pencil-alt"> <i class="fas fa-pencil-alt"> </i> Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atras</Button>
</main>