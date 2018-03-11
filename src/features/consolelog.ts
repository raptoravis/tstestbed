// replace the original console.log to log messages on the browser
console.log = (message?: any, ...optionalParams: any[]) => {
  const textnode = document.createElement('div');

  let text = JSON.stringify(message);

  for (let i = 0; i < optionalParams.length; ++i) {
    const ai = optionalParams[i];
    const at = typeof ai === 'object' ? JSON.stringify(ai) : ai;
    text += (i > 0 ? ' ' : '') + at;
  }

  textnode.innerHTML = text;
  document.body.appendChild(textnode);
};
