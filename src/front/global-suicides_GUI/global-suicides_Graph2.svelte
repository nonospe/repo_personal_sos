<script>

  import Button from "sveltestrap/src/Button.svelte";
  import  {pop} from "svelte-spa-router";
  import bb from "billboard.js/dist/billboard.pkgd";

  const URL_BASE = "api/v2/global-suicides";
  
  async function loadGraph(){
  
    const resData = await fetch(URL_BASE);
    let MyData = await resData.json();
    
    let countries = Array.from(new Set(MyData.map((d) => {return d.country+" "+d.year;})));
    let mens = Array.from(new Set(MyData.map((d) => {return d.men;})));
    let womens = Array.from(new Set(MyData.map((d) => {return d.women;})));
    let averages = Array.from(new Set(MyData.map((d) => {return d.average;})));

    let data_countries = [];
    let data_mens = [];
    let data_womens = [];
    let data_averages = [];

    data_countries[0]="x";
    data_mens[0]="Hombres";
    data_womens[0]="Mujeres";
    data_averages[0]="Medias";
    mens.forEach(aux => data_mens.push(aux));
    womens.forEach(aux => data_womens.push(aux));
    averages.forEach(aux => data_averages.push(aux));
    countries.forEach(aux => data_countries.push(aux));
    
    console.log(data_mens);
    console.log(data_mens.length);
    console.log("Graph_NONO");


    var chart = bb.generate({
    data: {
      x: "x",
      columns: [
      data_countries,
      data_mens,
      data_womens,
      data_averages
      ],
      type: "bubble",
      labels: true
    },
    bubble: {
      maxR: 50
    },
    axis: {
      x: {
        tick: {
          rotate: 30
        },
        type: "category",
        max: data_mens.length-2
      },
      y: {
        min: -5,
        max: 50
      }
    },
    bindto: "#bubbleChart"
    });

    /*setTimeout(function() {
    chart.load({
      columns: []
    });
    }, 1000);

    setTimeout(function() {
    chart.load({
      columns: []
    });
    }, 2000);

    setTimeout(function() {
    chart.load({
      columns: []
    });
    }, 3000);
    */
    
  }

  loadGraph();

  function back(){
    console.log("entra en back");
    window.location.href= "/#/global-suicides_API";
    location.reload();
  }

</script>

<head>

	<script src="https://d3js.org/d3.v5.min.js"></script>
	<script src="libraries/billboard.js"></script>
	<link rel="stylesheet" href="css/billboard.css">
  
</head>

<main>
  <h2>Gráfico Billboard</h2>
  <Button color="info" on:click="{back}" >Atrás</Button>
      <p>
          El gráfico de pompas muestra la la media de suicidios por cada 100.000 personas en distintos países.            en distintos países.
      </p>
</main>
