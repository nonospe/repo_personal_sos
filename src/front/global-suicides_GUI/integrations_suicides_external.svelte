<script>

    import Button from "sveltestrap/src/Button.svelte";
    import  {pop} from "svelte-spa-router";
    import ListGroup from "sveltestrap/src/ListGroup.svelte";
    import ListGroupItem  from "sveltestrap/src/ListGroupItem.svelte";
    
    const URL_BASE = "api/v2/global-suicides";
           
    async function loadGraph(){
    
    const resData = await fetch(URL_BASE);
    let MyData = await resData.json();
    
    let countries = Array.from(MyData.map((d) => {return d.country;}));
    let years = Array.from(MyData.map((d) => {return d.year;}));
  
    const URL_BASE_EXT = "https://www.etnassoft.com/api/v1/get/?category=libros_programacion&criteria=most_viewed";
    console.log("fetch a " + URL_BASE_EXT);
    
    const resData_Ext = await fetch(URL_BASE_EXT);
    let MyData_Ext = await resData_Ext.json();
    console.log("Mydata ext:");
    console.log(MyData_Ext);

    let data_ext = [];
    MyData_Ext.forEach(aux => data_ext.push(parseInt(aux.publisher_date)));
    console.log("Datos externos:");
    console.log(data_ext);

    let years_public = Array.from(new Set(MyData_Ext.map((d) => {return d.publisher_date;})));
    console.log("Datos externos2 no muestra repetidos:");
    console.log(years_public);
    
    console.log("Graph_Ext1");

    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Integración con Api Externa 1.'
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
                text: 'Años de media de suicidios frente a años de publicaciones de libros de programación',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: 'Años'
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
            name: 'Años Suicidios',
            data: years
        },
         {
            name: 'Años publiaciones',
            data: data_ext
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
        <h2>Integración con SOS1920-22</h2>
        <Button color="info" on:click="{pop}">Atrás</Button>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
                El gráfico muestra valores de la api de grupo 10 y grupo 22. No tienen relación.
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
    