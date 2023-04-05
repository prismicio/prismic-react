# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.5.2](https://github.com/prismicio/prismic-react/compare/v2.5.1...v2.5.2) (2023-02-17)


### Bug Fixes

* **PrismicLink:** only set `target="_blank"` when "Open in new window" is checked ([#176](https://github.com/prismicio/prismic-react/issues/176)) ([e74b4d6](https://github.com/prismicio/prismic-react/commit/e74b4d6a9c85166feed1caedaeb7d065d10891fb))

### [2.5.1](https://github.com/prismicio/prismic-react/compare/v2.5.0...v2.5.1) (2022-12-19)


### Bug Fixes

* make `@prismicio/types` a regular dependency ([b6caa1f](https://github.com/prismicio/prismic-react/commit/b6caa1f1f78380fdcbcd6dcaf5c538817006dc7c))


### Chore

* **deps:** maintain dependencies ([f8bc7e4](https://github.com/prismicio/prismic-react/commit/f8bc7e4fa7da92ded7fea4d2d89e979f336f0bbe))
* update infrastructure ([#168](https://github.com/prismicio/prismic-react/issues/168)) ([7768901](https://github.com/prismicio/prismic-react/commit/77689014ec78f6a03b54b9b7193e778a1f13dc10))

## [2.5.0](https://github.com/prismicio/prismic-react/compare/v2.4.4...v2.5.0) (2022-08-23)


### Features

* use Slice `id` property to key Slices in `<SliceZone>` when available ([#162](https://github.com/prismicio/prismic-react/issues/162)) ([dd85581](https://github.com/prismicio/prismic-react/commit/dd85581ce26ebf6b9aefa33791c0278d5a79d0a2))

## [2.5.0-alpha.1](https://github.com/prismicio/prismic-react/compare/v2.5.0-alpha.0...v2.5.0-alpha.1) (2022-08-02)


### Refactor

* slice `slice_id` > `id` ([be245ce](https://github.com/prismicio/prismic-react/commit/be245ceaa0051f2a0616a28fb28ded6c7fe82b09))

## [2.5.0-alpha.0](https://github.com/prismicio/prismic-react/compare/v2.4.3...v2.5.0-alpha.0) (2022-07-28)


### Features

* support slice id ([d066399](https://github.com/prismicio/prismic-react/commit/d066399a3e94d2e48d53ce14dcca4c71d346e452))

### [2.4.4](https://github.com/prismicio/prismic-react/compare/v2.4.3...v2.4.4) (2022-07-30)


### Bug Fixes

* **PrismicLink:** do not warn about missing field properties if the Link field is empty ([#163](https://github.com/prismicio/prismic-react/issues/163)) ([b138472](https://github.com/prismicio/prismic-react/commit/b13847234dc95e3e6ce2c66e91dcce702dcfede6))

### [2.4.3](https://github.com/prismicio/prismic-react/compare/v2.4.2...v2.4.3) (2022-07-21)


### Bug Fixes

* type context, components in SliceZoneProps ([#159](https://github.com/prismicio/prismic-react/issues/159)) ([edb21ec](https://github.com/prismicio/prismic-react/commit/edb21ecdd93e20ac5d64e1080af93b250e935e63))

### [2.4.2](https://github.com/prismicio/prismic-react/compare/v2.4.1...v2.4.2) (2022-06-09)


### Bug Fixes

* export `SliceLikeRestV2` and `SliceLikeGraphQL` ([#156](https://github.com/prismicio/prismic-react/issues/156)) ([fcd7a13](https://github.com/prismicio/prismic-react/commit/fcd7a13617697a79507ff85f3d0cc0d18fa17cf2))
* prefer warning over throwing when `<PrismicLink>` is given an invalid prop in development ([#157](https://github.com/prismicio/prismic-react/issues/157)) ([4610658](https://github.com/prismicio/prismic-react/commit/46106588de14b2b7f4d04b171a3121bbd3f89a8e))
* support untyped or partially typed Slices in `<SliceZone>` ([#154](https://github.com/prismicio/prismic-react/issues/154)) ([5ca557a](https://github.com/prismicio/prismic-react/commit/5ca557abeffb269ed7a9e56301bdb15bddaecf2c))

### [2.4.1](https://github.com/prismicio/prismic-react/compare/v2.4.0...v2.4.1) (2022-05-26)


### Bug Fixes

* throw a helpful error if `<PrismicText>` receives an incorrect field value ([#152](https://github.com/prismicio/prismic-react/issues/152)) ([2e4bab0](https://github.com/prismicio/prismic-react/commit/2e4bab0f81746ee4378c6caa33f71f82f3b3753b))
* throw when `<PrismicLink>`'s `field` or `document` prop value is missing required properties ([#153](https://github.com/prismicio/prismic-react/issues/153)) ([349529e](https://github.com/prismicio/prismic-react/commit/349529e2fcd464ccfe1f050f18ad1e9aebed571a))

## [2.4.0](https://github.com/prismicio/prismic-react/compare/v2.3.0...v2.4.0) (2022-05-25)


### Features

* **PrismicLink:** automatically set `target="_blank" rel="noopener noreferrer"` when `href` is external ([#147](https://github.com/prismicio/prismic-react/issues/147)) ([add20dd](https://github.com/prismicio/prismic-react/commit/add20dde8c3fd1a3588e8d3df4db0da160fd1bf9))


### Bug Fixes

* do not execute `<PrismicToolbar>`'s script during happy-dom tests ([72aaa1e](https://github.com/prismicio/prismic-react/commit/72aaa1ec0537086b2b3f0cc9b079a02992cb76a0))
* provide more detailed warning message for `<PrismicImage>`'s `alt`, `fallbackAlt`, `width`, and `pixelDensities` props ([4eaf529](https://github.com/prismicio/prismic-react/commit/4eaf5297a491ee7ca315aed8df2740906b96dbd2))


### Documentation

* fix typo ([821e629](https://github.com/prismicio/prismic-react/commit/821e6296d3bdf49f577d256b0198468aed8088ca))
* fix typo ([92303a0](https://github.com/prismicio/prismic-react/commit/92303a04bbd37dc4798e4771f29504ece6c17904))


### Chore

* fix Happy DOM spelling [skip ci] ([9c18562](https://github.com/prismicio/prismic-react/commit/9c18562a8f2e17325f39cc06355eca4cf5b5e66b))

## [2.3.0](https://github.com/prismicio/prismic-react/compare/v2.2.0...v2.3.0) (2022-04-15)


### Features

* add `<PrismicImage>` ([#140](https://github.com/prismicio/prismic-react/issues/140)) ([7a93f69](https://github.com/prismicio/prismic-react/commit/7a93f69604ee423477d572ef11b8f59e39f9ba6d))


### Bug Fixes

* restore default `React.AnchorHTMLAttributes` props on `<PrismicLink>` ([#146](https://github.com/prismicio/prismic-react/issues/146)) ([e82a394](https://github.com/prismicio/prismic-react/commit/e82a394879b7ad1bc174f226e40d106ddb68c274))

## [2.2.0](https://github.com/prismicio/prismic-react/compare/v2.1.2...v2.2.0) (2022-03-31)


### Features

* add `fallback` prop to `<PrismicRichText>` which is rendered when given an empty field ([#135](https://github.com/prismicio/prismic-react/issues/135)) ([1c6eacb](https://github.com/prismicio/prismic-react/commit/1c6eacb889e9bfea6d379f7027bcf5e9f14abbf6))
* support Prismic's GraphQL API in `<SliceZone>` ([#141](https://github.com/prismicio/prismic-react/issues/141)) ([3f774db](https://github.com/prismicio/prismic-react/commit/3f774db4fdca766ec01742d27d63353ae3a4f86c))


### Bug Fixes

* correct types for non-string Link Resolver functions ([#142](https://github.com/prismicio/prismic-react/issues/142)) ([50ed2f0](https://github.com/prismicio/prismic-react/commit/50ed2f03b359ddaff87444a9f2b280c00cb0e8d3))
* support React 18 ([#138](https://github.com/prismicio/prismic-react/issues/138)) ([3c09fc3](https://github.com/prismicio/prismic-react/commit/3c09fc368716632d800908173a60e91b60eb0da7))


### Chore

* **deps:** update dependencies ([192bdf6](https://github.com/prismicio/prismic-react/commit/192bdf6e769022fdcca793b3b1d5274481c1e980))

### [2.1.2](https://github.com/prismicio/prismic-react/compare/v2.1.1...v2.1.2) (2022-03-09)


### Bug Fixes

* better support for custom `<PrismicLink>` components using `forwardRef()` ([#132](https://github.com/prismicio/prismic-react/issues/132)) ([685b270](https://github.com/prismicio/prismic-react/commit/685b2706aa0d6b183cbfe80abc2bf56d01d44e28))


### Documentation

* fix typo in `<PrismicRichText>` TSDoc ([#133](https://github.com/prismicio/prismic-react/issues/133)) ([797f7c0](https://github.com/prismicio/prismic-react/commit/797f7c094cc6ee540d73b40df56413fd5105dd9b))

### [2.1.1](https://github.com/prismicio/prismic-react/compare/v2.1.0...v2.1.1) (2022-03-03)


### Bug Fixes

* detect empty Rich Text fields using `@prismicio/helpers`'s `isFilled.richText()` ([#130](https://github.com/prismicio/prismic-react/issues/130)) ([fc0d68c](https://github.com/prismicio/prismic-react/commit/fc0d68c0192892e2bcfb6dbe4ad045f3e58ff6aa))
* forward refs to `<PrismicLink>` components ([#131](https://github.com/prismicio/prismic-react/issues/131)) ([d7f75ed](https://github.com/prismicio/prismic-react/commit/d7f75ed4c7a4573ad91e4fb27f44f2fea1dd82fb))

## [2.1.0](https://github.com/prismicio/prismic-react/compare/v2.0.6...v2.1.0) (2022-02-28)


### Features

* provide a fallback string to `<PrismicText>` ([#126](https://github.com/prismicio/prismic-react/issues/126)) ([e2fb4fc](https://github.com/prismicio/prismic-react/commit/e2fb4fcbdf817ac67e00fbe39acb5b038dc585d5))


### Chore

* **deps:** update dependencies ([f426bb6](https://github.com/prismicio/prismic-react/commit/f426bb6064f99e75d1dee190f3ab1a4b59ce80da))
* update license ([ce32036](https://github.com/prismicio/prismic-react/commit/ce320369646152cd3e9428d31d6b9d62d16e2e10))


### Documentation

* add with-typescript example ([#127](https://github.com/prismicio/prismic-react/issues/127)) ([b95fe41](https://github.com/prismicio/prismic-react/commit/b95fe4113439b5d701964f591c0603c064377208))

### [2.0.6](https://github.com/prismicio/prismic-react/compare/v2.0.5...v2.0.6) (2022-02-05)


### Bug Fixes

* remove ESM `package.json` declaration (fixes `'Element' is not exported from '@prismicio/richtext'`) ([#122](https://github.com/prismicio/prismic-react/issues/122)) ([6fab9d5](https://github.com/prismicio/prismic-react/commit/6fab9d535d6c04a52c5c83a1f5d67cb4e7fef950))


### Refactor

* remove `type-fest` dependency ([#121](https://github.com/prismicio/prismic-react/issues/121)) ([27c502f](https://github.com/prismicio/prismic-react/commit/27c502f62cb7e10386c7ab9a289117f58d4b1879))

### [2.0.5](https://github.com/prismicio/prismic-react/compare/v2.0.4...v2.0.5) (2022-01-28)


### Chore

* ensure an entry file is available for React Native ([f65ae5d](https://github.com/prismicio/prismic-react/commit/f65ae5d487cc4ec4a246b3d871c4f2a9b66d6cc9))

### [2.0.4](https://github.com/prismicio/prismic-react/compare/v2.0.3...v2.0.4) (2022-01-28)


### Bug Fixes

* automatically assign keys to custom `<PrismicRichText>` components ([#118](https://github.com/prismicio/prismic-react/issues/118)) ([9e609f6](https://github.com/prismicio/prismic-react/commit/9e609f6c6815ddbd903c488c2596af672e47fb5a))


### Chore

* add Size Limit support ([473d3fe](https://github.com/prismicio/prismic-react/commit/473d3fea7028990061bc1c814a548870423e85cb))
* add Size Limit to CI workflow ([a7a34d0](https://github.com/prismicio/prismic-react/commit/a7a34d03d927dae35932af884f49f287efc41af6))
* **deps:** update dependencies ([3a902c6](https://github.com/prismicio/prismic-react/commit/3a902c64666aabc0edfe2c3edf86d1d5ea9df775))
* support React Native's Metro bundler ([9659a5a](https://github.com/prismicio/prismic-react/commit/9659a5a94c9b6f78e3205ef3a02ab70200eb35f6))

### [2.0.3](https://github.com/prismicio/prismic-react/compare/v2.0.2...v2.0.3) (2022-01-14)


### Bug Fixes

* correct pascalCase type ([cf66443](https://github.com/prismicio/prismic-react/commit/cf66443b6048933d656eb8c4a1598a9f01659e91))
* resolve lint error in PrismicToolbar ([d0a366a](https://github.com/prismicio/prismic-react/commit/d0a366af87ea1a455f8fb298984d0e2ebb6c0c0e))
* use .mjs module exports ([c485fc1](https://github.com/prismicio/prismic-react/commit/c485fc18570b4ef3dfcd2431782aa728ac9850c4))
* use pascalCase Slice type for `<SliceZone>` resolver ([#109](https://github.com/prismicio/prismic-react/issues/109)) ([a2f2c23](https://github.com/prismicio/prismic-react/commit/a2f2c232db304f2ff0b008f9c3c4fc7d2fe5e7ef))


### Chore

* **deps:** update `@prismicio/client` dev dependency ([382a2a9](https://github.com/prismicio/prismic-react/commit/382a2a93f3b9f1f5d836785e473f4eb2345ac444))
* **deps:** update dependencies ([f1bb443](https://github.com/prismicio/prismic-react/commit/f1bb443f8f7b5f652239368f830f4b9798097c4f))
* lint .tsx files ([ad91234](https://github.com/prismicio/prismic-react/commit/ad91234e8fb4f51dd3c53e43b073cec7c70cf31c))

### [2.0.2](https://github.com/prismicio/prismic-react/compare/v2.0.1...v2.0.2) (2021-12-16)


### Bug Fixes

* use correct toolbar URL (`new=true`) ([8de749c](https://github.com/prismicio/prismic-react/commit/8de749cde1b06e52f58a0bdef3d39a11b60d21f0))


### Chore

* remove incorrect CHANGELOG entry ([60967b8](https://github.com/prismicio/prismic-react/commit/60967b8fbd1be02b92a1e90dcb060bb3d4f47157))

### [2.0.1](https://github.com/prismicio/prismic-react/compare/v1.3.4...v2.0.1) (2021-12-16)


### Bug Fixes

* compose `<PrismicRichText>` components with `<PrismicProvider>` components ([e2d1af4](https://github.com/prismicio/prismic-react/commit/e2d1af48a10f9c664b6acb2dda7750a2a9cdec8b))


### Documentation

* remove `[@beta](https://github.com/beta)` tag from installation command [skip ci] ([0957770](https://github.com/prismicio/prismic-react/commit/0957770d7a14414dfbfee8c10fa26b266ac3f700))
* update docs link [skip ci] ([8bf355e](https://github.com/prismicio/prismic-react/commit/8bf355e904ed40bcaf00d855483ade8b752b7116))


### Chore

* add github issue and pull request templates ([25f2d4f](https://github.com/prismicio/prismic-react/commit/25f2d4f3ef89022f52eac0481cbf37b79b4f0e3b))
* **deps:** update dependencies ([b3dbec1](https://github.com/prismicio/prismic-react/commit/b3dbec14dab2b8e3d75c76d91177201b63e6d28b))


### Refactor

* simplify Rich Text serializer composition ([0904a3e](https://github.com/prismicio/prismic-react/commit/0904a3eefd76e82f934e2c6b1b4cff6728e4c611))
* use `React.ElementType` over `string | React.ComponentType` ([19094f6](https://github.com/prismicio/prismic-react/commit/19094f62465208bee95051d88321bb808c390a4f))

## [2.0.0](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.9...v2.0.0) (2021-12-03)

## [2.0.0-beta.9](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-12-03)


### Bug Fixes

* cancel client requests on hook cleanup ([2c91305](https://github.com/prismicio/prismic-reactjs/commit/2c91305a6138eca0bd7b4f19645ac4b7b4f717f8))
* prevent infinite loops in client hooks due to object arguments ([4858113](https://github.com/prismicio/prismic-reactjs/commit/4858113754a78f008b270a1082af711f72c8a3fb))
* re-run hook on argument changes ([4b2da91](https://github.com/prismicio/prismic-reactjs/commit/4b2da91b4eda73f69ba7999f0d7d1bb144c1e45a))

## [2.0.0-beta.8](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-12-03)


### Features

* re-export Element from `@prismicio/richtext` ([ae79fd6](https://github.com/prismicio/prismic-reactjs/commit/ae79fd6d09ae7045d96cf6175173f0a29d9a9be9))


### Bug Fixes

* inject Prismic Toolbar only once ([aa14cbd](https://github.com/prismicio/prismic-reactjs/commit/aa14cbd9c7883ee8c9d8760fcbbce1d334c696c4))
* re-run client hooks on parameter changes ([1fd3dad](https://github.com/prismicio/prismic-reactjs/commit/1fd3dad33336c58b67e533f7d10adf1c05b60f11))
* restore default link component types ([9d6f366](https://github.com/prismicio/prismic-reactjs/commit/9d6f366bae85ec151e7e5ed2d178e6eda6671a99))
* use Link Resolver from context in usePrismicPreviewResolver ([ed44fa6](https://github.com/prismicio/prismic-reactjs/commit/ed44fa6609b0ac3525dfe7a173bad0aac03a9229))


### Chore

* **deps:** maintain dependencies ([fc35a26](https://github.com/prismicio/prismic-reactjs/commit/fc35a26008da703b7506b7632dbd92d06b4e6f23))
* **deps:** update dependencies ([05b9d33](https://github.com/prismicio/prismic-reactjs/commit/05b9d331a5f651b9f41b927968c1e0167ef6655f))

## [2.0.0-beta.7](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-11-23)


### Bug Fixes

* render Slices in the correct order in `<SliceZone>` ([#104](https://github.com/prismicio/prismic-reactjs/issues/104)) ([ffc4d4a](https://github.com/prismicio/prismic-reactjs/commit/ffc4d4ad6a4373f827cef400a47c53daea96ff38))

## [2.0.0-beta.6](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2021-11-22)


### Features

* add `resolver` prop to SliceZone for backwards compatibility with `next-slicezone` ([#103](https://github.com/prismicio/prismic-reactjs/issues/103)) ([cfdcfb1](https://github.com/prismicio/prismic-reactjs/commit/cfdcfb1e98367e56e4c61464f6126d4f176636ec))


### Chore

* add `jsdocSeparateTagGroups` option ([c0ab73e](https://github.com/prismicio/prismic-reactjs/commit/c0ab73e38834daabd56b791473da13d03fc7f7cf))
* update ignore files ([68dc008](https://github.com/prismicio/prismic-reactjs/commit/68dc0088a0c444131be5440a7ca1989e0616ed50))

## [2.0.0-beta.5](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-11-20)


### Bug Fixes

* identify package as side-effect free ([3e3e009](https://github.com/prismicio/prismic-reactjs/commit/3e3e009eeb4098158981dab0cb7069adeef3c8e7))


### Refactor

* resolve hook lint warning ([6ff01a8](https://github.com/prismicio/prismic-reactjs/commit/6ff01a826622bf84078d77b8652f5a392b75951b))

## [2.0.0-beta.4](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-11-20)


### Features

* add `usePrismicPreviewResolver` ([4e64de2](https://github.com/prismicio/prismic-reactjs/commit/4e64de2405937d86c77f188f88f9162e1c3ab2df))


### Bug Fixes

* infer type of internal/external Link component ([891140f](https://github.com/prismicio/prismic-reactjs/commit/891140fd328f4beb63b532f1ed8f569d9d24fec2))
* omit required LinkProps from PrismicLink ([4ea3128](https://github.com/prismicio/prismic-reactjs/commit/4ea3128e6bb8be8996805e315cefc68dc3311c3e))


### Refactor

* rename hooks.ts to clientHooks.ts ([28d4a73](https://github.com/prismicio/prismic-reactjs/commit/28d4a737c819809c9812437230451d00d43e97b9))

## [2.0.0-beta.3](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-11-19)


### Features

* rename useAllPrismicDocuments to useAllPrismicDocumentsDangerously ([22d63fe](https://github.com/prismicio/prismic-reactjs/commit/22d63fe0866006f02bbf044e27bfdd0fa86a4b39))
* treat @prismicio/client as an optional peer dependency ([0e0b0b5](https://github.com/prismicio/prismic-reactjs/commit/0e0b0b5e10a28774629aaa6e6811e872706ca562))

## [2.0.0-beta.2](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-11-04)


### Features

* support nullish fields in PrismicRichText and PrismicText ([7b6f73f](https://github.com/prismicio/prismic-reactjs/commit/7b6f73f2ebe014fefbd0e9797b9a189bea1833ab)), closes [#99](https://github.com/prismicio/prismic-reactjs/issues/99)


### Bug Fixes

* support null PrismicLink target and rel props ([850d9a8](https://github.com/prismicio/prismic-reactjs/commit/850d9a8a7dab8024536b77b7b9f482c017dda907))


### Documentation

* update installation command with beta tag ([a08ac53](https://github.com/prismicio/prismic-reactjs/commit/a08ac53cf3f128e98c644c17dab7c3b8d3e8b295))


### Chore

* add github issue and pull request templates ([25f2d4f](https://github.com/prismicio/prismic-reactjs/commit/25f2d4f3ef89022f52eac0481cbf37b79b4f0e3b))
* remove outdated README comment ([75b4e3e](https://github.com/prismicio/prismic-reactjs/commit/75b4e3e7e98cea1cffa93b7e946b17762a7bbf51))
* update dependencies ([3542673](https://github.com/prismicio/prismic-reactjs/commit/35426734ae20e41fcd510c3521cdb9fe588633f7))

## [2.0.0-beta.1](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-alpha.6...v2.0.0-beta.1) (2021-11-01)


### Features

* add *BySomeTags and *ByEveryTag hooks ([7faa6b3](https://github.com/prismicio/prismic-reactjs/commit/7faa6b35c907dd451fb1ccc605ec8368bec27d55))


### Refactor

* use universal Error object in client hooks ([c02a557](https://github.com/prismicio/prismic-reactjs/commit/c02a5575df001780aff23510c9c9ef3ebb8272eb))


### Chore

* **deps:** update dependencies ([49878fd](https://github.com/prismicio/prismic-reactjs/commit/49878fd5352b494f979f5e3620e9ccf17614cb55))
* prepare for beta release ([8f6cb34](https://github.com/prismicio/prismic-reactjs/commit/8f6cb34a93152e6640e2f01fde4b4fb2a4c8940a))

## [2.0.0-alpha.6](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2021-10-09)


### Features

* add `usePrismicDocumentsByUIDs` and `useAllPrismicDocumentsByUIDs` ([3a25db8](https://github.com/prismicio/prismic-reactjs/commit/3a25db8cc9fa5909ff025028de7502b5790f2b5b))
* support intrinsic props from link components ([ab82e96](https://github.com/prismicio/prismic-reactjs/commit/ab82e9670d36fb533044e071481d1a7e3c2c7317))


### Bug Fixes

* add keys to rendered Rich Text components ([b0300d3](https://github.com/prismicio/prismic-reactjs/commit/b0300d34605bb1d428767e80a29f641b2fd9db8c))
* export PrismicText ([87457bf](https://github.com/prismicio/prismic-reactjs/commit/87457bfa05e56f34eef7f609f2d6d9c1d16984ef))
* looser SliceZoneComponents type to support non-const `slice_type` ([c227fec](https://github.com/prismicio/prismic-reactjs/commit/c227fece72338a4b12c3f9f5f26f814900fe59d4))
* move `@prismicio/client` and `@prismicio/helpers` to peer dependencies ([91a9381](https://github.com/prismicio/prismic-reactjs/commit/91a938164487e4f01944cb906986d9db8abe00b9))
* only pass external props to rendered PrismicLink component ([1f9d9a5](https://github.com/prismicio/prismic-reactjs/commit/1f9d9a50236e9d6711fc49d3b3c2945f8d0ab2c3))
* render Rich Text line breaks as <br /> ([4eaa6dd](https://github.com/prismicio/prismic-reactjs/commit/4eaa6dd5ab33262e536c6d46d901c0aed2abf731))
* use string union over enum for hook states ([fef36bc](https://github.com/prismicio/prismic-reactjs/commit/fef36bc49baed5ff4f134c2ca6d94153516f9bcc))


### Documentation

* update PrismicToolbar description ([1a96dd6](https://github.com/prismicio/prismic-reactjs/commit/1a96dd6739cf0cd37def03ba6b8bbaaa91b365b9))


### Refactor

* reorganize PrismicLink ([9dfc9b9](https://github.com/prismicio/prismic-reactjs/commit/9dfc9b9baca6fd7a2a928cd13dd4f0c8d5f55fec))


### Chore

* add @prismicio/client and @prismicio/helpers as devDependencies ([672454f](https://github.com/prismicio/prismic-reactjs/commit/672454f74087c2ae1766a3b89e0ee8b16339e02f))
* update dependencies ([c342721](https://github.com/prismicio/prismic-reactjs/commit/c342721cfa6fb6479ec6f496056b67d4cbf58b30))
* update package-lock.json ([b8abf23](https://github.com/prismicio/prismic-reactjs/commit/b8abf23394f76b15fa823f166e9b2726eada7026))

## [2.0.0-alpha.5](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2021-09-27)


### Bug Fixes

* export PrismicProvider props type ([848cd7d](https://github.com/prismicio/prismic-reactjs/commit/848cd7def29712d72b33f334ba1e738968463746))


### Chore

* **deps:** maintain dependencies ([7437659](https://github.com/prismicio/prismic-reactjs/commit/74376591ec5e394ead1359df73b723baf02e9c53))
* update template config ([8d63067](https://github.com/prismicio/prismic-reactjs/commit/8d63067a5c419e5082b741e57e03f0a96eee3d12))

## [2.0.0-alpha.4](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2021-09-15)


### Bug Fixes

* allow undefined SliceZone slices and components ([a44bebf](https://github.com/prismicio/prismic-reactjs/commit/a44bebf16617e220dbbbec2263c912238ff0f1b6))
* proper PrismicRichText serializer fallbacks ([ca1d37a](https://github.com/prismicio/prismic-reactjs/commit/ca1d37ab6f522e2b0d9ad88c5c7bc2450b5c7f4d))

## [2.0.0-alpha.3](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2021-08-23)


### Features

* render PrismicLink using a document ([0768280](https://github.com/prismicio/prismic-reactjs/commit/0768280e049d120cb93ebac581bc4e629ff98c67))


### Bug Fixes

* wording on TODOSliceComponent warning ([8abfc9a](https://github.com/prismicio/prismic-reactjs/commit/8abfc9acc5fd5ca6a5c65fdc28092d4cc5dd376b))


### Documentation

* add tsdocs for hooks ([0b1a610](https://github.com/prismicio/prismic-reactjs/commit/0b1a610197e23c2462f62443497c7044d7f49ccf))

## [2.0.0-alpha.2](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2021-08-03)


### Features

* support document type on client hooks ([0a0427b](https://github.com/prismicio/prismic-reactjs/commit/0a0427b344087d898f0f5e56b1c125a194fa6595))


### Bug Fixes

* rename PrismicHookState to PrismicClientHookState ([8047f8b](https://github.com/prismicio/prismic-reactjs/commit/8047f8b752a9852d516ddd7a89a74c53cc99e83e))


### Chore

* add react as a dev dependency for tests ([9bac238](https://github.com/prismicio/prismic-reactjs/commit/9bac238a9cd8ad77b384e9683d5824862a05d4d4))


### Refactor

* increase test coverage by restructuring ([84c5cde](https://github.com/prismicio/prismic-reactjs/commit/84c5cde319afec2e7afbcc876d43b85b00039b98))

## [2.0.0-alpha.1](https://github.com/prismicio/prismic-reactjs/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2021-08-02)


### Bug Fixes

* move react to a peer dependency ([17d9f08](https://github.com/prismicio/prismic-reactjs/commit/17d9f08f507b612699449cb87de6d6273494f213))


### Chore

* remove private label ([8bafde4](https://github.com/prismicio/prismic-reactjs/commit/8bafde44aee43f66fd652e8fcf2151f245a80918))

## [2.0.0-alpha.0](https://github.com/prismicio/prismic-reactjs/compare/v1.3.4...v2.0.0-alpha.0) (2021-08-02)


### Features

* add SliceZone component ([1e13c98](https://github.com/prismicio/prismic-reactjs/commit/1e13c98b4338bf291dca585eae3e79a1e16675a3))
* complete implementation ([530be7d](https://github.com/prismicio/prismic-reactjs/commit/530be7da1f63cc918d9683aa1895a691bc166b72))
* export PrismicHookState ([8058fe1](https://github.com/prismicio/prismic-reactjs/commit/8058fe19c2279828b3a7c72644b0f3a36397cbc8))
* export updated types ([4eb4973](https://github.com/prismicio/prismic-reactjs/commit/4eb4973d92031330e6a4416f4fcfaccaeb011174))
* initial v2 commit ([c666519](https://github.com/prismicio/prismic-reactjs/commit/c6665194435134f65493343d95ef6bef94c65691))
* refine SliceZone types and TODOSliceComponent ([0728187](https://github.com/prismicio/prismic-reactjs/commit/0728187b8b68e29ca25c7fff03faa576c9d4c98d))


### Bug Fixes

* accept provider children ([629180d](https://github.com/prismicio/prismic-reactjs/commit/629180dec8dd016ffd858eb9da38addf6a611f20))
* allow href, target overrides in PrismicLink ([b0037f5](https://github.com/prismicio/prismic-reactjs/commit/b0037f5568695ec4688f43f8246d936b77a03606))
* better internal url detection ([10d5dc3](https://github.com/prismicio/prismic-reactjs/commit/10d5dc3bf4482fcaadf3241572f66d32eb44f8bd))
* more specific SliceZone types ([a4d5a2d](https://github.com/prismicio/prismic-reactjs/commit/a4d5a2d2e5f10a90fd5942f19b94030501772ab5))
* safely polyfill process.env ([75d70c7](https://github.com/prismicio/prismic-reactjs/commit/75d70c7f22574d94ea7469e3a491c61b4595ea60))
* stricter href/field prop types for PrismicLink ([5dec44a](https://github.com/prismicio/prismic-reactjs/commit/5dec44a6ff07def7e67471bcea6ae80b3fe9732f))
* use more correct internalLinkComponent/externalLinkComponent type ([281e27c](https://github.com/prismicio/prismic-reactjs/commit/281e27cf59ecd6a9bed3dfc8d7f48184253ad069))
* use production over development for optimization checks ([b466791](https://github.com/prismicio/prismic-reactjs/commit/b46679179a27567f902f3bba78a4189c955dd141))


### Documentation

* add documentation to all exports ([ba15a01](https://github.com/prismicio/prismic-reactjs/commit/ba15a01421d7cfdc64b459601055c8e1d1f94bf6))
* add examples ([4984832](https://github.com/prismicio/prismic-reactjs/commit/4984832d333ca5bcdb883cc020ea1cb675bcea5e))
* fix typo ([32c20bc](https://github.com/prismicio/prismic-reactjs/commit/32c20bce4067ed2d9bd2221f0605dbf642715dc3))
* link to React ([3a083ca](https://github.com/prismicio/prismic-reactjs/commit/3a083ca4432a18e1a8aaecceb7ce9329c0bee09a))
* rename with-provider example to with-global-configuration ([7fc834f](https://github.com/prismicio/prismic-reactjs/commit/7fc834f3f8a5c0904fe2d32004453c80aee89e14))
* update README ([41539a8](https://github.com/prismicio/prismic-reactjs/commit/41539a8e4d62091570e2ddfe025af0f1fbee4201))


### Refactor

* move hook reducer into hook factory file ([b06e831](https://github.com/prismicio/prismic-reactjs/commit/b06e831c8ac252d21632d513e0368b835ac51768))
* organize types and hooks ([5add30b](https://github.com/prismicio/prismic-reactjs/commit/5add30bdff8a0c8bf8173693317d716954760f8c))
* use map for default PrismicRichText serializer ([0ba98f0](https://github.com/prismicio/prismic-reactjs/commit/0ba98f061b5437bbe0b04a2a6c8361b2a37287c5))
