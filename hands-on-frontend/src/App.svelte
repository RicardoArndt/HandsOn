<script>
	import { Router, Route } from "svelte-navigator";
	import Header from "./@components/Header.svelte";
</script>

<Router>
	<main>
		<Header />

		<Route path="/">
			<section class="content">
				<h1>Home Page</h1>
			</section>
		</Route>

		<Route path="/posts">
			<section class="content">
				<h1>Posts Page</h1>
			</section>
		</Route>

		<Route path="/users">
			<section class="content">
				<h1>Users Page</h1>
			</section>
		</Route>
	</main>
</Router>

<style>
	.content {
		width: 80%;
		margin-left: 207px;
		margin-top: 25px;
    margin-right: 50px;
    padding-left: 15px;
    padding-right: 15px;
	}
</style>