<script>

import Button from "sveltestrap/src/Button.svelte";
import  {pop} from "svelte-spa-router";

const URL_BASE = "api/v2/global-suicides";

async function loadGraph(){
    
    const resData = await fetch(URL_BASE);
    let MyData = await resData.json();
    let countries = Array.from(new Set(MyData.map((d) => {return d.country+d.year;})));
    let averages = Array.from(new Set(MyData.map((d) => {return d.average;})));

    const URL_BASE_grupo_02 = "/api/v2/rural-tourism-stats";
    const resData_1 = await fetch(URL_BASE_grupo_02);
    console.log("fetch a " + URL_BASE_grupo_02);
    let MyData_1 = await resData_1.json();
    let avg_1 = Array.from(new Set(MyData_1.map((d) => {return d.averagestay;})));
    console.log("Datos media Marta:");
    console.log(avg_1);
    
    console.log("Graph_NONO y marta");

    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Integración con SOS1920-02.'
        },
        subtitle: {
            text: 'La relacion entre los datos no tiene lógica.'
        },
        xAxis: {
            categories: countries,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Media de Suicidios por cada 100.000 personas y media de turismo rural.',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: 'Personas'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 350,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Media de turismo',
            data: avg_1
        }, 
        {
            name: 'Media de Suicidios',
            data: averages
        }]
    });
}

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <h2>Integración con SOS1920-02</h2>
    <Button color="info" on:click="{pop}">Atrás</Button>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            El gráfico muestra valores de la api de grupo 10 y grupo 02. No tienen relación.
        </p>
    </figure>
</main>

<style>
.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 1000px;
    margin: 1em auto;
}

#container {
    height: 1000px;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>
