<script lang="ts">
	import { Carta, CartaEditor, type CartaExtension, type HighlightFunctions } from 'carta-md';
	import { slash } from '@cartamd/plugin-slash';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';
	import { sanitize } from 'isomorphic-dompurify';
	// const clean = sanitize('dirty');
	import { placeholderText } from './placeholder';
	import Tribute from 'tributejs';
	import 'tributejs/dist/tribute.css';
	// Component default theme
	import 'carta-md/default-theme.css';
	// Markdown input theme (Speed Highlight)
	import 'carta-md/light.css';
	// import '@cartamd/plugin-slash/default.css';
	import '@cartamd/plugin-code/default.css';
	import '@cartamd/plugin-slash/default-theme.css';
	import '@cartamd/plugin-emoji/default-theme.css';
	import { onMount } from 'svelte';
	import { tagTokenizerExtension } from './MarkedExtensions';
	let syncScroll = true;
	let mode: 'tabs' | 'split' | 'auto' = 'split';
	let tribute = new Tribute({
		values: [
			{ key: 'Phil Heartman', value: 'pheartman' },
			{ key: 'Gordon Ramsey', value: 'gramsey' }
		]
	});
	// let mE: CartaExtension = {
	// 	extensions: [tagTokenizerExtension],
	// 	components:
	// };
	// let cartaExt: CartaExtension = {
	// 	markedExtensions: [{extensions: [tagTokenizerExtension]}]
	// }
	let cartaEl: HTMLElement;
	const carta = new Carta({
		// Remember to use a sanitizer to prevent XSS attacks
		// sanitizer: mySanitizer
		//slash(),
		sanitizer: mySanitizer,
		extensions: [emoji(), code()]
		//markedExtensions: [tagTokenizerExtension]
	});
	function mySanitizer(md: string) {
		console.log('::sanitize');
		return sanitize(md);
	}
	let tx: Element;
	onMount(() => {
		if (cartaEl) {
			// let cartaTextareaId = cartaTextarea[0].getElementsByTagName('textarea')[0].id;
			// let preContenteditable = cartaEl.getElementsByClassName('carta-font-code')[0];
			// console.log('::id', preContenteditable);
			// preContenteditable.addEventListener('tribute-active-true', function (e) {
			// 	console.log('Menu opened!');
			// });
			// preContenteditable.addEventListener('tribute-active-false', function (e) {
			// 	console.log('Menu closed!');
			// });
			// tribute.attach(preContenteditable);
			// console.log('::container', cartaEl.querySelectorAll('textarea.carta-font-code'));
			let cartaTextarea = cartaEl.querySelectorAll('textarea.carta-font-code');
			tribute.attach(cartaTextarea[0]);
			if (tribute.isActive) {
				console.log('Somebody is being mentioned!');
			} else {
				console.log("Who's this guy talking to?");
			}
		}

		// tribute.attach(tx);
	});
</script>

<!-- <textarea bind:this={tx} name="mt" id="mt" cols="30" rows="10" /> -->
<!-- <div class="test">
	<pre bind:this={tx}>
		hi
		</pre>
</div> -->

<div class="options">
	<fieldset>
		<legend>Scroll</legend>

		<input bind:checked={syncScroll} type="checkbox" id="scroll" name="scroll" />
		<label for="scroll">Sync scroll</label>
	</fieldset>

	<fieldset>
		<legend>Editor mode</legend>

		<div>
			<input type="radio" id="auto" name="drone" value="auto" bind:group={mode} />
			<label for="auto">Auto</label>
		</div>

		<div>
			<input type="radio" id="tabs" name="drone" value="tabs" bind:group={mode} />
			<label for="tabs">Tabs</label>
		</div>

		<div>
			<input type="radio" id="split" name="drone" value="split" bind:group={mode} />
			<label for="split">Split</label>
		</div>
	</fieldset>
</div>

<div id="cart-wrapper" bind:this={cartaEl}>
	<CartaEditor value={placeholderText} scroll={syncScroll ? 'sync' : 'async'} {carta} {mode} />
</div>

<style>
	/* Or in global stylesheet */
	/* Set your custom monospace font */
	/* :global(pre:has(code[class^="shj-lang"])) {
		background-color: white;
	} */
	:global(.tribute-container) {
		z-index: 1000000;
		border: 2px solid red;
	}
	:global(body) {
		margin: 0;
		font-family: 'Inter var', sans-serif;
		min-height: 100vh;
	}

	:global(.carta-font-code, code) {
		font-family: 'Fira Code', monospace;
		font-variant-ligatures: normal;
	}

	:global(input, textarea, button) {
		font-family: inherit;
	}

	main {
		max-width: 1536px;
		margin: 0 auto 0 auto;
		padding: 2rem 0 2rem 0;
	}

	fieldset {
		display: flex;
	}

	.options {
		margin-bottom: 1.5rem;
		display: flex;
	}

	/* Responsive main */

	@media screen and (max-width: 640px) {
		main {
			width: 95%;
		}
	}

	@media screen and (min-width: 640px) and (max-width: 767px) {
		main {
			width: 640px;
		}
	}

	@media screen and (min-width: 767px) and (max-width: 1023px) {
		main {
			width: 768px;
		}
	}

	@media screen and (min-width: 1023px) and (max-width: 1279px) {
		main {
			width: 1024px;
		}
	}

	@media screen and (min-width: 1279px) and (max-width: 1535px) {
		main {
			width: 1280px;
		}
	}
</style>
