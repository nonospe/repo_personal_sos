<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';   // Sera donde se pueda seleccionar a que API acceder 
	import globalMarriages from './MarriagesGUI/App.svelte'; // Sera donde se carga la tabla de datos 
	import EditMarriage from './MarriagesGUI/EditMarriage.svelte';
	import NotFound from './NotFound.svelte';

	import SuicidesTable from './global-suicides_GUI/App.svelte';
	import editSuicide from './global-suicides_GUI/editSuicide.svelte';
	import EmptyTable from './global-suicides_GUI/EmptyTable.svelte';
	


	const routes = {
		"/": Home,
		"/global-marriages/:country/:year": EditMarriage,
		"/globalMarriagesAPI":globalMarriages,
		"/global-suicides_API" : SuicidesTable,
		"/suicide/:countryName": editSuicide,
		"/empty": EmptyTable,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>