## 💻 Projeto

Aplicativo desenvolvido para consulta de tempo. O usuário digita um CEP, é feita a validação se esse CEP é válido, caso seja o app armazena esse local na memória e através de uma segunda API é feita a consulta da temperatura no local informado.
## ✨ Tecnologias
 - React Native
 - Consumos de APIS com axios
 - Flat List
 - Assync Storage
 - Uso de fontes personalisadas
## :hammer_and_wrench: APIs
Para o funcionamento do app, é necessário o consumo de duas APIs.

A primeira para consulta do CEP digitado pelo usuário, documentação disponível em: 

*https://viacep.com.br/*

E a segunda para consulta do clima no CEP informado, documentação disponível em:
*https://hgbrasil.com/status/weather*

## Executando o projeto

Para instalar o projeto é necessário utilizar o comando:
```
yarn install
```
Para executar o projeto é necessário usar o comando:
```
npx react-native run-android
```

<img src="https://user-images.githubusercontent.com/59378841/150879239-0f8bb83f-f425-4210-951a-26f5b59d0692.gif" width="400" />
