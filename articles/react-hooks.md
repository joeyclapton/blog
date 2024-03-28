---
title: React Hooks
description: "Hooks é uma nova maneira de escrever componentes em React"
lang: pt-BR
date: "2022-05-30"
---

## O que são os _hooks_?
Segundo a documentação oficial do [React](https://pt-br.react.dev/reference/react/hooks):

> Hooks são uma nova adição no React 16.8. Eles permitem que você use o state e outros recursos do React sem escrever uma classe.

Os _hooks_ vieram para facilitar a criação e manutenção de componentes no React, abaixo vamos entender quais são os hooks mais comuns, seus conceitos e como aplicar na prática.

---

## Hooks mais comuns
Nesse artigo vou abordar os 2 hooks mais comuns no React:

- useState
- useEffect

### useState
Esse _hook_ é responsável pela criação e atualização de um estado local.

No exemplo abaixo criei um botão que altera o background-color de uma div.

```javascript
import { useState } from "react";

const containerStyles = {
  "border-radius": "50%",
  width: "20px",
  height: "20px",
};

const State = () => {
  const [color, updateColor] = useState("#000000");

  function generateColor() {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  }

  function setColor() {
    const newColor = generateColor();
    updateColor(newColor);
  }

  return (
    <div>
      <button
        onClick={() => {
          setColor();
        }}
      >
        Atualizar cor
      </button>
      <div
        style={{
          backgroundColor: color,
          ...containerStyles,
        }}
        className="round-color"
      />
    </div>
  );
};

export default State;
```

O primeiro passo é importar o useState dentro do componente.

```js
import { useState } from "react";
```

Depois de importar, iremos definir a variável reativa responsável pela mudança da cor da div.

```js
  const [color, updateColor] = useState("#000000");
```

Na **linha 18** criei uma função que recebe a cor gerada pela função generateColor() e atualizo o valor da variável `color`, já na **linha 26** eu chamo o evento `onClick` que chama a função `setColor()` que irá alterar a variável `color`.

```js
function setColor() {
    const newColor = generateColor();
    updateColor(newColor);
  }

  return (
    <div>
      <button
        onClick={() => {
          setColor();
        }}
      >
        Atualizar cor
      </button>
      <div
        style={{
          backgroundColor: color,
          ...containerStyles,
        }}
        className="round-color"
      />
    </div>
  );
```

### useEffect
Esse hooks serve para lidar com efeitos do ciclo de vida, como: `componentDidMount`, `componentDidUpdate` e `componentWillUnmount`, ou seja, ele é realizado quando:
- Quando o componente renderiza pela primeira vez;
- Quando o valor da dependência é atualizado;
- Quando o componente é desmontado.

No exemplo abaixo vou mostrar a hora atual atualizando a cada segundo.

```js
import { useState, useEffect } from "react";

const Effect = () => {
  const date = new Date();
  const localeTime = date.toLocaleTimeString();

  const [time, setTime] = useState(localeTime);

  useEffect(() => {
    const timer = setTimeout(() => setTime(localeTime), 1000);

    return () => clearTimeout(timer);
  }, [localeTime]);

  return <time>{time}</time>;
};

export default Effect;
```

Primeiro importamos o useEffect junto do useState.

```js
import { useState, useEffect } from "react";
```

Aqui chamamos a função `useEffect`, ela recebe 2 parâmetros, o primeiro é uma _callback_, que vai ser executada em algum dos ciclos de vida, o segundo é um array de dependências que recebe às variáveis que irão ser atualizadas, nesse caso, sempre que `localeTime` for alterada, ele vai chamar o `useEffect`.

```js
useEffect(() => {
    const timer = setTimeout(() => setTime(localeTime), 1000);

    return () => clearTimeout(timer);
  }, [localeTime]);
```

Para executar o `useEffect` só uma vez ou quando ele for renderizado, deixamos o segundo parâmetro que é o array de dependências vazio.
```js
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
     console.log('App started')
  }, [])
}

export default App
```

Para executar o `useEffect` quando o componente é atualizado, adicionamos a variável a ser observada como dependência. Já para executar antes do componente ser desmontado, retornamos uma função que irá ser executada.

```js
useEffect(() => {
  const timer = setTimeout(() => setTime(localeTime), 1000);


  // Aqui fazemos a limpeza do setTimeout antes do componente ser desmontado.
  return () => clearTimeout(timer);

  // Adicionamos a variável localeTime no array de depedências, agora sempre que ela atualizar, vai chamar o useEffect
}, [localeTime]);
```

### Conclusão
Vemos um uso dos 2 hooks mais comuns, talvez no futuro eu traga explicação sobre os outros hooks do React.

#### Documentação oficial
- [hooks](https://pt-br.react.dev/reference/react/hooks)
- [useState](https://pt-br.react.dev/reference/react/useState)
- [useEffect](https://pt-br.react.dev/reference/react/useEffect)


