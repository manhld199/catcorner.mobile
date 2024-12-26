export const injectedCSS = `
    const style = document.createElement('style');
    style.textContent = \`
      @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

      //  "pri-1": "#1E4646",
      //  "pri-2": "#B3E0E6",
      //  "pri-3": "#EAFBE4",
      //  "pri-4": "#F9DCC5",
      //  "pri-5": "#FFF6D8",
      //  "pri-6": "#315475",
      //  "pri-7": "#669E9E",
      //  "bg-1": "#f5f5f5",

      * {
        padding: 0px;
        margin: 0px;
        line-height: 1.5;
      }

      body {
        font-family: "Josefin Sans", serif;
      }

      h5 {
        color: #315475;
        font-size: 1.25rem;
      }

      p {
        font-size: 1rem;
        line-height: 1.5;
      }

      li {
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }
    \`;
    document.head.appendChild(style);
  `;

export const injectedDarkCSS = `
    const style = document.createElement('style');
    style.textContent = \`
      @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

      //  "pri-1": "#1E4646",
      //  "pri-2": "#B3E0E6",
      //  "pri-3": "#EAFBE4",
      //  "pri-4": "#F9DCC5",
      //  "pri-5": "#FFF6D8",
      //  "pri-6": "#315475",
      //  "pri-7": "#669E9E",
      //  "bg-1": "#f5f5f5",

      * {
        padding: 0px;
        margin: 0px;
        line-height: 1.5;
      }

      body {
        background-color: #18181b;
        font-family: "Josefin Sans", serif;
      }

      h5 {
        color: #EAFBE4;
        font-size: 1.25rem;
      }

      p {
        color: white;
        font-size: 1rem;
        line-height: 1.5;
      }

      li {
        color: white;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }
    \`;
    document.head.appendChild(style);
  `;
