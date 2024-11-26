class WordCount extends HTMLSpanElement {
	constructor() {
		super();
	}

	/*
		Called each time the element is added to the document. 
		The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
	*/
	connectedCallback() {
		const parentNode = this.parentNode;
		const count = `Word count: ${countWords(parentNode)}`;
		this.innerHTML = `${count}`;
	}
}

// The name of a custom element must start with a lowercase letter, contain a hyphen, and satisfy certain other rules listed in the specification's definition of a valid name.
customElements.define('word-count', WordCount, {
	extends: 'span', // According to specs this must be specified
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
