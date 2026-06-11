const source = document.querySelector("#input");
const target = document.querySelector("#output");
const copyButton = document.querySelector("#copy-output");
const clearButton = document.querySelector("#clear-input");

const baseMap = (() => {
  const map = new Map();

  for (let i = 0; i < 26; i += 1) {
    map.set(String.fromCharCode(65 + i), String.fromCodePoint(0x1d670 + i));
  }

  for (let i = 0; i < 26; i += 1) {
    map.set(String.fromCharCode(97 + i), String.fromCodePoint(0x1d68a + i));
  }

  for (let i = 0; i < 10; i += 1) {
    map.set(String(i), String.fromCodePoint(0x1d7f6 + i));
  }

  return map;
})();

const toTypewriter = (value) =>
  [...value]
    .map((char) => baseMap.get(char) ?? char)
    .join("");

const update = () => {
  target.value = toTypewriter(source.value);
};

source.addEventListener("input", update);
update();

const clearInput = () => {
  source.value = "";
  update();
  source.focus();
};

clearButton?.addEventListener("click", clearInput);

const setCopyLabel = (value) => {
  if (copyButton) {
    copyButton.textContent = value;
  }
};

const copyOutput = async () => {
  const text = target.value;

  const fallbackCopy = () => {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  };

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy();
    }
    setCopyLabel("Copied!");
    setTimeout(() => {
      setCopyLabel("Copy Output");
    }, 1500);
  } catch (error) {
    fallbackCopy();
    setCopyLabel("Copied!");
    setTimeout(() => {
      setCopyLabel("Copy Output");
    }, 1500);
  }
};

copyButton?.addEventListener("click", copyOutput);
