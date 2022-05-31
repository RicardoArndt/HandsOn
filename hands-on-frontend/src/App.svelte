<script>
	import { Router, Route } from "svelte-navigator";
	import Header from "./@components/Header.svelte";
	import Breadcrumb from "./@components/Breadcrumb.svelte";
</script>

<Router>
	<Header />

	<main>
		<Route path="/">
			<section class="content">
				<h1>Home Page</h1>
			</section>
		</Route>

		<Route path="/posts">
			<Breadcrumb pageName={"Posts"} />

			<section class="content">
				<h1>Posts Page</h1>
			</section>
		</Route>

		<Route path="/users">
			<Breadcrumb pageName={"Usuários"} />

			<section class="content">
				<h1>Users Page</h1>
			</section>
		</Route>
	</main>
</Router>

<style>
	main {
		width: 80%;
		margin-left: 207px;
		margin-top: 25px;
    margin-right: 50px;
    padding-left: 15px;
    padding-right: 15px;
	}
</style>