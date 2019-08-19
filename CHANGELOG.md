<a name="2.0.4"></a>
## [2.0.4](https://github.com/tpucci/react-gondola/compare/2.0.3...2.0.4) (2019-08-19)

<a name="2.0.3"></a>
## [2.0.3](https://github.com/tpucci/react-gondola/compare/2.0.2...2.0.3) (2019-07-29)


### 📝 Documentation

* **GettingStarted:** add peer dependencies installation instructions ([ce310e0](https://github.com/tpucci/react-gondola/commit/ce310e0))

<a name="2.0.2"></a>
## [2.0.2](https://github.com/tpucci/react-gondola/compare/2.0.1...2.0.2) (2019-07-29)


### 🐛 Bug Fixes

* **install:** fix patch-package in production ([8d62f13](https://github.com/tpucci/react-gondola/commit/8d62f13))


### 📝 Documentation

* **back:** add back guide ([6469e2b](https://github.com/tpucci/react-gondola/commit/6469e2b))
* **react-navigation:** add react-navigation interoperability guide ([038d75c](https://github.com/tpucci/react-gondola/commit/038d75c))

<a name="2.0.1"></a>
## [2.0.1](https://github.com/tpucci/react-gondola/compare/2.0.0...2.0.1) (2019-07-28)


### 🐛 Bug Fixes

* **android:** fix example for Android ([30c60af](https://github.com/tpucci/react-gondola/commit/30c60af))
* **recompose:** fix error due to import order ([df1c5ed](https://github.com/tpucci/react-gondola/commit/df1c5ed))

<a name="2.0.0"></a>
# [2.0.0](https://github.com/tpucci/react-gondola/compare/1.4.0...2.0.0) (2019-07-27)


### :fire:

* **createCanal:** remove API v1 createCanal ([0f8ab46](https://github.com/tpucci/react-gondola/commit/0f8ab46))


### ♻️ Code Refactoring

* **CardSkewUp:** rename CardSkewUp into ConvexUp ([b07592d](https://github.com/tpucci/react-gondola/commit/b07592d))
* **createCanal:** deprecate createCanal API ([80b637a](https://github.com/tpucci/react-gondola/commit/80b637a))


### ✅ Tests

* **Instagram:** simply test that render is not broken ([82b7b75](https://github.com/tpucci/react-gondola/commit/82b7b75))
* **package:** 100% cover new API ([42b3fc1](https://github.com/tpucci/react-gondola/commit/42b3fc1))
* **transitions:** fix tests ([32453dc](https://github.com/tpucci/react-gondola/commit/32453dc))


### ✨ Features

* **back:** add back support on Transitioners ([f3d69aa](https://github.com/tpucci/react-gondola/commit/f3d69aa))
* **Canal:** add Canal and Screen components ([046bafd](https://github.com/tpucci/react-gondola/commit/046bafd))
* **Transitions:** add CardSkewUp ([3c3d127](https://github.com/tpucci/react-gondola/commit/3c3d127))


### 🐛 Bug Fixes

* **example:** fix example app ([072b104](https://github.com/tpucci/react-gondola/commit/072b104))
* **FullScreenPortal:** fix full screen portal ([8889cfa](https://github.com/tpucci/react-gondola/commit/8889cfa))
* **Observers:** fix typing errors after mobx-reaxt update ([03feed7](https://github.com/tpucci/react-gondola/commit/03feed7))


### 📝 Documentation

* **Canal:** update doc for v2 ([5268fb0](https://github.com/tpucci/react-gondola/commit/5268fb0))
* **README.md:** change header style ([a447646](https://github.com/tpucci/react-gondola/commit/a447646))
* **README.md:** update READMEs ([06e50a8](https://github.com/tpucci/react-gondola/commit/06e50a8))


### BREAKING CHANGES

* **createCanal:** createCanal has been removed, use <Canal /> and <Screen /> instead. See
documentation.

<a name="1.4.0"></a>
# [1.4.0](https://github.com/tpucci/react-gondola/compare/1.3.0...1.4.0) (2019-07-13)


### ♻️ Code Refactoring

* **createStop:** remove unused key prop ([475e436](https://github.com/tpucci/react-gondola/commit/475e436))


### ✨ Features

* **transitions:** support slide transitions ([fba8b03](https://github.com/tpucci/react-gondola/commit/fba8b03))


### 🐛 Bug Fixes

* **macos:** move capital folder Transitions to transitions ([dc4e1b1](https://github.com/tpucci/react-gondola/commit/dc4e1b1))
* **node_modules:** fix missing postinstall script ([3c3440f](https://github.com/tpucci/react-gondola/commit/3c3440f))


### 📝 Documentation

* **transitions:** add guides/transitions ([c42f166](https://github.com/tpucci/react-gondola/commit/c42f166))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/tpucci/react-gondola/compare/1.2.3...1.3.0) (2019-07-02)


### ♻️ Code Refactoring

* **jest.config.js:** sort lines ([667df3c](https://github.com/tpucci/react-gondola/commit/667df3c))
* **Navigation:** enclose in its own folder ([073d179](https://github.com/tpucci/react-gondola/commit/073d179))
* **Navigation:** move fullScreen properties in FullScreenDelegate ([b926fa4](https://github.com/tpucci/react-gondola/commit/b926fa4))
* **Navigation:** rename instance into singleton ([c1c9918](https://github.com/tpucci/react-gondola/commit/c1c9918))


### ✅ Tests

* **BackHandlerDelegate:** test onBackCallback firing ([5ce2d35](https://github.com/tpucci/react-gondola/commit/5ce2d35))
* **createCanal:** test back handler ([8f24877](https://github.com/tpucci/react-gondola/commit/8f24877))
* **StopHOC:** test event handling ([674ae27](https://github.com/tpucci/react-gondola/commit/674ae27))


### ✨ Features

* **back:** add Android back button support ([bac0a60](https://github.com/tpucci/react-gondola/commit/bac0a60))


### 🐛 Bug Fixes

* **createCanal:** fix missing back subscription on instantiate ([88f7e28](https://github.com/tpucci/react-gondola/commit/88f7e28))


### 📝 Documentation

* **createCanal:** add docs for Stop onBack hook ([6bba5fd](https://github.com/tpucci/react-gondola/commit/6bba5fd))

<a name="1.2.3"></a>
## [1.2.3](https://github.com/tpucci/react-gondola/compare/1.2.2...1.2.3) (2019-06-21)


### 📝 Documentation

* **analytics:** add google analytics ([b472643](https://github.com/tpucci/react-gondola/commit/b472643))
* **peerDependencies:** fix peerDependencies ([25659da](https://github.com/tpucci/react-gondola/commit/25659da))

<a name="1.2.2"></a>
## [1.2.2](https://github.com/tpucci/react-gondola/compare/1.2.1...1.2.2) (2019-06-12)


### 🐛 Bug Fixes

* **package:** add missing dist folder ([a8b1aa5](https://github.com/tpucci/react-gondola/commit/a8b1aa5))


### 📝 Documentation

* **docz:** add static routes ([d3417db](https://github.com/tpucci/react-gondola/commit/d3417db))
* **GettingStarted:** add peer dependencie installation instruction ([485454a](https://github.com/tpucci/react-gondola/commit/485454a))
* **README.md:** add badges 🎉 ([64e53cc](https://github.com/tpucci/react-gondola/commit/64e53cc))
* **Welcome:** rewrite philosophy ([afd1edb](https://github.com/tpucci/react-gondola/commit/afd1edb))

<a name="1.2.1"></a>
## [1.2.1](https://github.com/tpucci/react-gondola/compare/1.2.0...1.2.1) (2019-06-04)


### 🐛 Bug Fixes

* **Navigation:** Fix typing issue ([e78209d](https://github.com/tpucci/react-gondola/commit/e78209d))


### 📝 Documentation

* **API:** Write basic API references and usage ([4546108](https://github.com/tpucci/react-gondola/commit/4546108))
* **docz:** correct mistakes ([5009c4a](https://github.com/tpucci/react-gondola/commit/5009c4a))
* **docz:** Install dependencie on doc site build ([fc8f577](https://github.com/tpucci/react-gondola/commit/fc8f577))
* **README:** Correct mistakes ([0f33924](https://github.com/tpucci/react-gondola/commit/0f33924))

<a name="1.2.0"></a>
# [1.2.0](https://github.com/tpucci/react-gondola/compare/1.1.0...1.2.0) (2019-05-23)


### ✨ Features

* **fullScreenPortal:** Add fullScreenPortal ([257df96](https://github.com/tpucci/react-gondola/commit/257df96))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/tpucci/react-gondola/compare/1.0.0...1.1.0) (2019-05-09)

<a name="1.0.0"></a>
# [1.0.0](https://github.com/tpucci/react-gondola/compare/1.0.0-beta.0...1.0.0) (2019-05-09)


### ⏪ Reverts

* **context:** Delete navigation context ([8515138](https://github.com/tpucci/react-gondola/commit/8515138))


### ♻️ Code Refactoring

* **Canal.test:** Rename file ([b7152d5](https://github.com/tpucci/react-gondola/commit/b7152d5))
* **NavigationContext:** Use new context api instead of mobx-react ([2743654](https://github.com/tpucci/react-gondola/commit/2743654))


### ✨ Features

* **canal:** Render first component in canal ([4056cc8](https://github.com/tpucci/react-gondola/commit/4056cc8))
* **createCanal:** Introduce createCanal function ([752c8c2](https://github.com/tpucci/react-gondola/commit/752c8c2))
* **createCanal:** Use declarative syntax to show pages ([80ae9f6](https://github.com/tpucci/react-gondola/commit/80ae9f6))
* **NavigationContext:** Exposes NavigationConsumer, withNavigation and useNavigation utils ([6742265](https://github.com/tpucci/react-gondola/commit/6742265))
