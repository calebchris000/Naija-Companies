<script>
  import { navigate } from "svelte-routing";
  const { href } = window.location;

  const remove_slash = href[href.length -1] === "/" ? href.slice(0, -1) : href

    navigate(`${remove_slash}/review`)
</script>
