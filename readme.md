# Task REST API

Basic secure REST API implementation.


## Automation Testing
- using node module `jest`
```json
"scripts": {
    "test": "jest"
},
```
- `jest --watch` automatically watches code when something changes
- directory `__mocks__` redefine libraries when using tests (prevent email sending example)