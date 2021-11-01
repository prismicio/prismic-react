# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
