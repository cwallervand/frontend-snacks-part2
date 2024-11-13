class WordCount extends HTMLSpanElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const parentNode = this.parentNode;
		const count = `Word count: ${countWords(parentNode)}`;
		this.innerHTML = `${count}`;
	}
}

customElements.define('word-count', WordCount, {
	extends: 'span',
});

function countWords(node) {
	const text = node.innerText || node.textContent;
	return text
		.trim()
		.split(/\s+/g)
		.filter((a) => a.trim().length > 0).length;
}

class UselessComponent extends HTMLElement {
	constructor() {
		super();

		const template = document.getElementById('uselessComponentTemplate');
		const templateContent = template.content;

		this.appendChild(templateContent);
	}
}

customElements.define('useless-component', UselessComponent);

class UselessShadowComponent extends HTMLElement {
	constructor() {
		super();

		const template = document.getElementById('uselessShadowComponentTemplate');
		const templateContent = template.content;

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(templateContent.cloneNode(true));
	}
}

customElements.define('useless-shadow-component', UselessShadowComponent);
