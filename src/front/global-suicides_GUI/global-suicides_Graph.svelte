<script>

const URL_BASE = "api/v2/global-suicides";


async function loadGraph(){

let MyData = [];

const resData = await fetch(URL_BASE);

MyData = await resData.json();

let countries = Array.from(new Set(MyData.map((d) => {return d.country;})));

let mens = Array.from(new Set(MyData.map((d) => {return d.men;})));
let womens = Array.from(new Set(MyData.map((d) => {return d.women;})));
let averages = Array.from(new Set(MyData.map((d) => {return d.average;})));

console.log("Graph_NONO");

Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
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
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
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
        y: 80,
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
        name: 'MEN',
        data: mens
    }, {
        name: 'WOMEN',
        data: womens
    }, {
        name: 'AVERAGE',
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
    <h1>TEST MYGRAPH hight</h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Basic line chart showing trends in a dataset. This chart includes the
            <code>series-label</code> module, which adds a label to each line for
            enhanced readability.
        </p>
    </figure>
</main>

