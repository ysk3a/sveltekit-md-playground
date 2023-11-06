<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import { slash } from '@cartamd/plugin-slash';
	import { emoji } from '@cartamd/plugin-emoji';
	import { code } from '@cartamd/plugin-code';
	import { sanitize } from 'isomorphic-dompurify';
	// const clean = sanitize('dirty');
	import { placeholderText } from './placeholder';

	// Component default theme
	import 'carta-md/default-theme.css';
	// Markdown input theme (Speed Highlight)
	import 'carta-md/light.css';
	// import '@cartamd/plugin-slash/default.css';
	import '@cartamd/plugin-code/default.css';
	import '@cartamd/plugin-slash/default-theme.css';
	import '@cartamd/plugin-emoji/default-theme.css';
	let syncScroll = true;
	let mode: 'tabs' | 'split' | 'auto' = 'split';
	const tagTokenizerExtension = {
		name: '@',
		level: 'inline',
		start(src: any) {
			const i = src.indexOf('@');
			console.log('::start=', i, src);
			return i;
		},
		tokenizer(src: string, tokens: any) {
			const rule = /\B^@\w+/g;
			const match = rule.exec(src);
			if (match) {
				console.log(match);
				return {
					type: '@', // Should match "name" above
					raw: match[0], // Text to consume from the source
					text: match[0]
				};
			}
		}
	};
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
</script>

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

<CartaEditor value={placeholderText} scroll={syncScroll ? 'sync' : 'async'} {carta} {mode} />

<style>
	/* Or in global stylesheet */
	/* Set your custom monospace font */
	/* :global(pre:has(code[class^="shj-lang"])) {
		background-color: white;
	} */
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
