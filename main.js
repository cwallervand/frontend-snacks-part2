import './style.css';

const findOnPageSerrchButton = document.querySelector(
  '#findOnPageSearch button'
);
const findOnPageInput = document.querySelector('#findOnPageInput');

findOnPageInput.addEventListener('keypress', (event) => {
  console.log(event.key);
  if (event.key.toLowerCase() === 'enter') {
    findOnPage();
  }
});

function findOnPage() {
  const searchValue = findOnPageInput.value;
  findOnPageInput.value = '';
  if (searchValue) {
    location.replace(`/#:~:text=${searchValue}`);
  }
}

findOnPageSerrchButton.addEventListener('click', () => {
  findOnPage();
});

let globalSheets = null;
function getSharedStyleSheets() {
  if (globalSheets === null) {
    globalSheets = Array.from(document.styleSheets).map((styleSheet) => {
      const sheet = new CSSStyleSheet();
      const cssRules = Array.from(styleSheet.cssRules);
      const css = cssRules.map((rule) => rule.cssText).join(' ');

      sheet.replaceSync(css);

      return sheet;
    });
  }
  return globalSheets;
}

class TopicScection extends HTMLElement {
  static TOPIC_TITLE_ATTRIBUTE = 'topic-title';
  static CAN_I_USE_HREF_ATTRIBUTE = 'can-i-use-href';
  static observedAttributes = [
    this.TOPIC_TITLE_ATTRIBUTE,
    this.CAN_I_USE_HREF_ATTRIBUTE,
  ];

  constructor() {
    super();
    let template = document.getElementById('topicTemplate');
    let templateContent = template.content;

    const sharedStlyeSheet = getSharedStyleSheets();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
    shadowRoot.adoptedStyleSheets = sharedStlyeSheet;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
    );
    switch (name) {
      case TopicScection.TOPIC_TITLE_ATTRIBUTE:
        this.shadowRoot.querySelector('h2').innerHTML = newValue;
        break;
      case TopicScection.CAN_I_USE_HREF_ATTRIBUTE:
        this.shadowRoot.querySelector('a').href = newValue;
        break;
      default:
        break;
    }
  }
}

customElements.define('topic-section', TopicScection);

class DemoCustomElement extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('demo-custom-element', DemoCustomElement);

class WordCount extends HTMLSpanElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const parentNode = this.parentNode;

    const count = `Word count: ${countWords(parentNode)}`;

    this.innerHTML = `${count}`;

    // // Create a shadow root
    // const shadow = this.attachShadow({ mode: 'open' });

    // // Create text node and add word count to it
    // const text = document.createElement('span');
    // text.textContent = count;

    // // Append it to the shadow root
    // shadow.appendChild(text);

    // // Update count when element content changes
    // this.parentNode.addEventListener('input', () => {
    //   text.textContent = `Words: ${countWords(wcParent)}`;
    // });
    // this.innerHTML = `<big>${this.innerHTML}</big>`;
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
