<script>

import Button from "sveltestrap/src/Button.svelte";
import  {pop} from "svelte-spa-router";

const URL_BASE = "api/v2/global-suicides";
const URL_BASE2 = "api/v2/global-divorces";
const URL_BASE3 = "api/v2/global-marriages";
   
async function loadGraph(){

    const resData = await fetch(URL_BASE);
    let MyData = await resData.json();
    let suicides_set = MyData.map((d) => {
			let res = {
				name: d.country+d.year,
				value: d.average
			};
			return res;
        });
        console.log("Suicidios:");
        console.log(suicides_set);

    const resData2 = await fetch(URL_BASE2);
    let MyData2 = await resData2.json();
    let divorces_set = MyData2.map((d) => {
			let res = {
				name: d.country+d.year,
				value: d.crude_rate
			};
			return res;
        });
        console.log("Divorcios:");
        console.log(divorces_set);

    const resData3 = await fetch(URL_BASE3);
    let MyData3 = await resData3.json();
    let marriages_set = MyData3.map((d) => {
			let res = {
				name: d.country+d.year,
				value: (d.avg_wm+d.avg_m)/2
			};
			return res;
        });
        console.log("Matrimonios:");
        console.log(marriages_set);


    Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Unión de datos del grupo 10'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}*(1/100.000 personas)'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'Suicidios',
        data: suicides_set
    },
     {
        name: 'Matrimonios',
        data: divorces_set
    }, {
        name: 'Divorcios',
        data: marriages_set
    }]
    });
}

loadGraph();

   </script>


   
   <main>
       
       <h2>Integración común del grupo SOS1920-10</h2>
       <Button color="info" on:click="{pop}">Atrás</Button>
       <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Esta gráfica muestra datos de todos los recursos de las 3 apis del grupo.
            El dato de los matrimonios ha sido tratado para unificar una media común: (avg_wm+avg_m)/2.
        </p>
    </figure>
   </main>

<style>

.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 800px;
    margin: 1em auto;
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