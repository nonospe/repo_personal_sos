<script>

import Button from "sveltestrap/src/Button.svelte";
import  {pop} from "svelte-spa-router";

const URL_BASE = "api/v2/global-suicides";

async function loadGraph(){

const resData = await fetch(URL_BASE);
let MyData = await resData.json();

let countries = Array.from(new Set(MyData.map((d) => {return d.country+" "+d.year;})));
let mens = Array.from(new Set(MyData.map((d) => {return d.men;})));
let womens = Array.from(new Set(MyData.map((d) => {return d.women;})));
let averages = Array.from(new Set(MyData.map((d) => {return d.average;})));

console.log("Graph_NONO");

Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Tasa de suicidio por países.'
    },
    subtitle: {
        text: 'Fuente: <a href="https://es.wikipedia.org/wiki/Anexo:Pa%C3%ADses_por_tasa_de_suicidio">Wikipedia.org</a>'
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
            text: 'Suicidios por cada 100.000 personas.',
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
        name: 'Hombres',
        data: mens
    }, {
        name: 'Mujeres',
        data: womens
    }, {
        name: 'Media',
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
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}" defer></script>
</svelte:head>

<main>
    <h2>Gráfico highchart</h2>
    <Button color="info" on:click="{pop}">Atrás</Button>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            El gráfico de barras muestra un estudio de personas que se han suicidado por cada 100.000 habitantes
            en distintos países.
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
