class LanguageTranslator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          /* Include your styles here or link to an external stylesheet */
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }
          body{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            min-height: 100vh;
            background: #5372F0;
          }
          .container{
            max-width: 690px;
            width: 100%;
            padding: 30px;
            background: #fff;
            border-radius: 7px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.01);
          }
          .wrapper{
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          .wrapper .text-input{
            display: flex;
            border-bottom: 1px solid #ccc;
          }
          .text-input .to-text{
            border-radius: 0px;
            border-left: 1px solid #ccc;
          }
          .text-input textarea{
            height: 250px;
            width: 100%;
            border: none;
            outline: none;
            resize: none;
            background: none;
            font-size: 18px;
            padding: 10px 15px;
            border-radius: 5px;
          }
          .text-input textarea::placeholder{
            color: #b7b6b6;
          }
          .controls, li, .icons, .icons i{
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .controls{
            list-style: none;
            padding: 12px 15px;
          }
          .controls .row .icons{
            width: 38%;
          }
          .controls .row .icons i{
            width: 50px;
            color: #adadad;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.2s ease;
            justify-content: center;
          }
          .controls .row.from .icons{
            padding-right: 15px;
            border-right: 1px solid #ccc;
          }
          .controls .row.to .icons{
            padding-left: 15px;
            border-left: 1px solid #ccc;
          }
          .controls .row select{
            color: #333;
            border: none;
            outline: none;
            font-size: 18px;
            background: none;
            padding-left: 5px;
          }
          .text-input textarea::-webkit-scrollbar{
            width: 4px;
          }
          .controls .row select::-webkit-scrollbar{
            width: 8px;
          }
          .text-input textarea::-webkit-scrollbar-track,
          .controls .row select::-webkit-scrollbar-track{
            background: #fff;
          }
          .text-input textarea::-webkit-scrollbar-thumb{
            background: #ddd;
            border-radius: 8px;
          }
          .controls .row select::-webkit-scrollbar-thumb{
            background: #999;
            border-radius: 8px;
            border-right: 2px solid #ffffff;
          }
          .controls .exchange{
            color: #adadad;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.2s ease;
          }
          .controls i:active{
            transform: scale(0.9);
          }
          .container button{
            width: 100%;
            padding: 14px;
            outline: none;
            border: none;
            color: #fff;
            cursor: pointer;
            margin-top: 20px;
            font-size: 17px;
            border-radius: 5px;
            background: #5372F0;
          }
          
          @media (max-width: 660px){
            .container{
              padding: 20px;
            }
            .wrapper .text-input{
              flex-direction: column;
            }
            .text-input .to-text{
              border-left: 0px;
              border-top: 1px solid #ccc;
            }
            .text-input textarea{
              height: 200px;
            }
            .controls .row .icons{
              display: none;
            }
            .container button{
              padding: 13px;
              font-size: 16px;
            }
            .controls .row select{
              font-size: 16px;
            }
            .controls .exchange{
              font-size: 14px;
            }
          }
          /* Ensure styles are scoped to the shadow DOM using :host */
          .container {
            /* ... */
          }
          /* ... additional styles ... */
        </style>
        <div class="container">
          <div class="wrapper">
            <div class="text-input">
              <textarea spellcheck="false" class="from-text" placeholder="Enter text"></textarea>
              <textarea spellcheck="false" readonly disabled class="to-text" placeholder="Translation"></textarea>
            </div>
            <ul class="controls">
              <li class="row from">
                <div class="icons">
                  <i id="from" class="fas fa-volume-up"></i>
                  <i id="from" class="fas fa-copy"></i>
                </div>
                <select></select>
              </li>
              <li class="exchange"><i class="fas fa-exchange-alt"></i></li>
              <li class="row to">
                <select></select>
                <div class="icons">
                  <i id="to" class="fas fa-volume-up"></i>
                  <i id="to" class="fas fa-copy"></i>
                </div>
              </li>
            </ul>
          </div>
          <button>Translate Text</button>
        </div>
      `;
  
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  
      // Add your script.js logic here
      this.setupEventListeners();
    }
  
    connectedCallback() {
      // Add any component-specific logic here
    }
  
    setupEventListeners() {
      const fromText = this.shadowRoot.querySelector(".from-text");
      const toText = this.shadowRoot.querySelector(".to-text");
      const exchangeIcon = this.shadowRoot.querySelector(".exchange");
      const selectTag = this.shadowRoot.querySelectorAll("select");
      const translateBtn = this.shadowRoot.querySelector("button");
      const icons = this.shadowRoot.querySelectorAll(".row i");
  
      selectTag.forEach((tag, id) => {
        for (let country_code in countries) {
          let selected =
            id == 0
              ? country_code == "en-GB"
                ? "selected"
                : ""
              : country_code == "hi-IN"
              ? "selected"
              : "";
          let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
          tag.insertAdjacentHTML("beforeend", option);
        }
      });
  
      exchangeIcon.addEventListener("click", () => {
        let tempText = fromText.value,
          tempLang = selectTag[0].value;
        fromText.value = toText.value;
        toText.value = tempText;
        selectTag[0].value = selectTag[1].value;
        selectTag[1].value = tempLang;
      });
  
      fromText.addEventListener("keyup", () => {
        if (!fromText.value) {
          toText.value = "";
        }
      });
  
      translateBtn.addEventListener("click", () => {
        let text = fromText.value.trim(),
          translateFrom = selectTag[0].value,
          translateTo = selectTag[1].value;
        if (!text) return;
        toText.setAttribute("placeholder", "Translating...");
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            toText.value = data.responseData.translatedText;
            data.matches.forEach((data) => {
              if (data.id === 0) {
                toText.value = data.translation;
              }
            });
            toText.setAttribute("placeholder", "Translation");
          });
      });
  
      icons.forEach((icon) => {
        icon.addEventListener("click", ({ target }) => {
          if (!fromText.value || !toText.value) return;
          if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
              navigator.clipboard.writeText(fromText.value);
            } else {
              navigator.clipboard.writeText(toText.value);
            }
          } else {
            let utterance;
            if (target.id == "from") {
              utterance = new SpeechSynthesisUtterance(fromText.value);
              utterance.lang = selectTag[0].value;
            } else {
              utterance = new SpeechSynthesisUtterance(toText.value);
              utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
          }
        });
      });
    }
  }
  
  customElements.define('language-translator', LanguageTranslator);
  