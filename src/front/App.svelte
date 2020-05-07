<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';   // Sera donde se pueda seleccionar a que API acceder 

	import globalMarriages from './MarriagesGUI/App.svelte'; // Sera donde se carga la tabla de datos 
	import EditMarriage from './MarriagesGUI/EditMarriage.svelte';

	import NotFound from './NotFound.svelte';

	


	const routes = {
		"/": Home,
		"/global-marriages/:country/:year": EditMarriage,
		"/globalMarriagesAPI":globalMarriages, 
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>