const fs = require("fs");

function tokenizer(input) {
  const tokens = [];
  let current = 0;

  while (current < input.length) {
    let char = input[current];

    if (char === " " || char === "\t" || char === "\n") {
      current++;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let value = "";

      while (/[0-9]/.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "NUMBER", value });
      continue;
    }

    if (char === "a") {
      if (input.slice(current, current + 3) === "add") {
        tokens.push({ type: "ADD" });
        current += 3;
        continue;
      }
    }

    if (char === "t") {
      if (input.slice(current, current + 2) === "to") {
        tokens.push({ type: "TO" });
        current += 2;
        continue;
      }
    }

    throw new TypeError(`Unknown character: ${char}`);
  }

  return tokens;
}

function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === "NUMBER") {
      current++;
      return {
        type: "NUMBER",
        value: Number(token.value),
      };
    }

    if (token.type === "ADD") {
      token = tokens[++current];

      let node = {
        type: "ADD_EXPRESSION",
        left: walk(),
        right: null,
      };

      if (tokens[current].type === "TO") {
        current++;
        node.right = walk();
        return node;
      }
    }

    throw new TypeError(`Unknown token: ${JSON.stringify(token)}`);
  }

  return walk();
}

function codeGenerator(node) {
  switch (node.type) {
    case "ADD_EXPRESSION":
      return codeGenerator(node.left) + " + " + codeGenerator(node.right);
    case "NUMBER":
      return node.value.toString();
    default:
      throw new TypeError(`Unknown node type: ${node.type}`);
  }
}

function transpiler(input) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  return codeGenerator(ast) + ";";
}

// ファイルの読み書き処理
fs.readFile("mini-lang.txt", "utf8", (err, data) => {
  if (err) throw err;

  const transpiledCode = transpiler(data);

  fs.writeFile("transpiled.js", transpiledCode, (err) => {
    if (err) throw err;
    console.log("The file has been transpiled and saved!");
  });
});
