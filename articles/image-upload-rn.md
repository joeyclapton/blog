---
title: Upload de Imagens no React Native com Expo
description: "Como fazer upload de maneira simples no React Native usando o Expo"
lang: pt-BR
date: "2024-4-22"
tags: "React Native, Tutorial"
---

O ImagePicker é um plugin do Expo projetado para simplificar o processo de upload de imagens ou captura de fotos usando a câmera sem a necessidade de lidar diretamente com APIs complexas de câmera ou galeria.

## Compatibilidade
O ImagePicker é compatível com todas as seguintes plataformas:
- Dispositivo Android
- Emulador Android
- Dispositivo IOS
- Simulador IOS
- Plataforma WEB

## Instalação
```shell
npx expo install expo-image-picker
```

## Configurando o plugin
Para configurar o plugin, iremos no arquivo `app.json` e colocaremos a seguinte configuração:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app need accesses your photos."
        }
      ]
    ]
  }
}
```
Na propriedade photosPermission, definiremos a mensagem exibida ao usuário, solicitando a aprovação para acessar o recurso da câmera.

## Implementação do upload de imagens

```js
import react, { useState } from "react";
import { Button, Image, View } from "react-native";
// Vamos importar a biblioteca
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    // Nenhuma permissão é necessária para abrir a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      // A propriedade mediaTypes define qual tipo de arquivo é permitido
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      // Quality define a qualidade da imagem, aceita valores de 0-1,
      // 0 menor qualidade/tamanho e 1 é uma imagem de maior qualidade/tamanho
      quality: 1,
    });

    console.log(result);

    // Vamos receber a imagem caso o usuário não feche a galeria de fotos.
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image ? (
        <Image
          source={{ uri: image as string }}
          style={{ width: 200, height: 200 }}
        />
      ) : null}
    </View>
  );
}
```

Github com o código completo do projeto:
[https://github.com/joeyclapton/image-picker-example](https://github.com/joeyclapton/image-picker-example)

### Referências
- [https://docs.expo.dev/versions/latest/sdk/imagepicker/](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [https://docs.expo.dev/tutorial/image-picker/](https://docs.expo.dev/tutorial/image-picker/)
