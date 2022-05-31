<script>
  import { Link } from "svelte-navigator";
</script>

<header>
  <img src="Logo.svg" alt="HandsON" />

  <ul>
    <li>
      <Link to="/">
        <span class="material-icons">home</span>
        Home
      </Link>
    </li>

    <li>
      <Link to="/posts">
        <span class="material-icons">post_add</span>
        Posts
      </Link>
    </li>

    <li>
      <Link to="/users">
        <span class="material-icons">group</span>
        Usuários
      </Link>
    </li>
  </ul>
</header>

<style>
  header {
    cursor: default;
    width: 100%;
    background-color: #001F36;
    text-align: left;
    padding: 10px;
    border: none;
    display: inline-flex;
  }

  header > ul {
    width: 80%;
    margin-left: 50px;
    margin-right: 50px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    justify-content: left;
    align-items: center;
    border: 1px solid white;
    border-top: none;
    border-bottom: none;
  }

  header > ul > li {
    list-style: none;
    margin-right: 15px;
  }

  .material-icons {
    color: #B29429;
  }
</style>
