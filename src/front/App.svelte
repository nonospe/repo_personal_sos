<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';   // Sera donde se pueda seleccionar a que API acceder 
	import globalMarriages from './MarriagesGUI/App.svelte'; // Sera donde se carga la tabla de datos 
	import EditMarriage from './MarriagesGUI/EditMarriage.svelte';
	import NotFound from './NotFound.svelte';

	import SuicidesTable from './global-suicides_GUI/App.svelte';
	import editSuicide from './global-suicides_GUI/editSuicide.svelte';
	import EmptyTable from './global-suicides_GUI/EmptyTable.svelte';
	import suicidesGraph from './global-suicides_GUI/global-suicides_Graph.svelte';
	import suicidesGraph2 from './global-suicides_GUI/global-suicides_Graph2.svelte';
	import integrations_suicides from './global-suicides_GUI/integrations_suicides.svelte';
	import integrations_suicides2 from './global-suicides_GUI/integrations_suicides2.svelte';
	import integrations_suicides3 from './global-suicides_GUI/integrations_suicides3.svelte';
	import integrations_suicides4 from './global-suicides_GUI/integrations_suicides4.svelte';
	import integrations from './integrations.svelte';
	import analytics from './analytics.svelte';
	
	import globalDivorces from './DivorcesGUI/App.svelte';  
	import EditDivorce from './DivorcesGUI/EditDivorce.svelte';

	const routes = {
		"/": Home,
		"/global-marriages/:country/:year": EditMarriage,
		"/globalMarriagesAPI":globalMarriages,

		"/global-suicides_API" : SuicidesTable,
		"/suicide/:countryName": editSuicide,
		"/empty": EmptyTable,

		"/globalDivorcesAPI/:country/:year": EditDivorce,
		"/globalDivorcesAPI":globalDivorces,
		"/suicidesGraph": suicidesGraph, 
		"/suicidesGraph2": suicidesGraph2,
		"/integrations_suicides": integrations_suicides,
		"/integrations_suicides2": integrations_suicides2,
		"/integrations_suicides3": integrations_suicides3,
		"/integrations_suicides4": integrations_suicides4,
		"/integrations": integrations,
		"/analytics": analytics,
		
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>