<script lang="jsx">
import { defineComponent } from "vue";

export default defineComponent(() => {
  return () => <p>jsx script: {__ENV__.HELLO}</p>;
});
</script>
