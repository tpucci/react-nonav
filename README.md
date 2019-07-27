<h1 align="center">React Gondola</h1>

<p align="center">React Native declarative and reactive navigation.</p>

<p align="center">
<a href="https://travis-ci.com/tpucci/react-gondola"><img src="https://travis-ci.com/tpucci/react-gondola.svg?branch=master" alt="Build Status"/></a>
<a href="https://coveralls.io/github/tpucci/react-gondola?branch=master"><img src="https://coveralls.io/repos/github/tpucci/react-gondola/badge.svg?branch=master" alt="Coverage Status"/></a>
<a href="https://www.npmjs.com/package/react-gondola"><img src="https://img.shields.io/npm/dw/react-gondola.svg" alt="NPM Downloads"/></a>
<a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly"/></a>
<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release"/></a>
</p>

<br>

## Philosophy

This repo focuses on grouping screens by business conversion tunnels called **canals**. Why did I call it `react-gondola`? Just because I though of this package when I was visiting Venice... and I kind of hope that using this package will feel like navigating in Venice 📸

**When you use React Gondola**, you define several screens and you have the possibility to control their visibility with YOUR state machine. You define the rules of WHEN some screens should appear; `react-gondola` takes care of the rest.

## 👍 TLDR; Use this package if:

- you want to group screens by **business** conversion tunnels rather than transition.
- you want to control your navigation state with YOUR **state machine**.
- you want your navigation to **react** to YOUR store changes.

## 👎 Do not use this repo if:

- you want to navigate imperatively.
- you need to use Native navigation (react-gondola's navigation is powered by JS code only).

## Docs

The docs are here: https://react-gondola.netlify.com/
Powered by the incredible [docz](https://www.docz.site/).

## Contribute

- Clone this repository.
- Run `yarn` in the root directory.
- Run `yarn` in the `example` directory.
- Add your code and its test in the `<rootDir>/src` directory.
- Add your example code and its test in the `<rootDir>/example` directory.
- Open a pull request !

## Run the example project

- Clone this repository.
- Run `yarn` in the root directory.
- Run `yarn` in the `example` directory.
- In the `example` directory, run either `react-native run-ios` or `react-native run-android`.

## Compare

- [React Navigation](https://reactnavigation.org/)
- [React Native Navigation](https://github.com/wix/react-native-navigation)
