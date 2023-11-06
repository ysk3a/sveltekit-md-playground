<script lang="ts">
	// import Carta from "./Carta.svelte";

	// export let href = "";
	// export let title = undefined;
	// export let className = '';
	export let text = '';
	// export let cart: Carta;
	// if text has @ or # render strong else regular p // ([@#][\w_-]+)
	$: hasHashtagMention = text.match(/[#@]\w\S*\b/g);
	$: console.log('::hashtagMention', hasHashtagMention, text);
</script>

<button
	class="custom-hashtagMention"
	on:click={() => {
		console.log('clicked mention');
	}}>{text}</button
>

<!-- {#if hasHashtagMention}
	<button class="custom-hashtagMention" on:click={console.log('clicked mention')}>{text}</button>
{:else}
	<strong>{text}</strong>
{/if} -->

<style>
	.custom-hashtagMention {
		background-color: lightblue;
		color: rgb(56, 56, 56);
		border: 1px solid;
		border-radius: 5px;
		padding: 2px;
	}
</style>
