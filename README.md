# ExJSONa

The utility allows you to easily template your JSON files with variables.

### Here's a simple example:

```json
{
  "@extends": ".presets/prod/bar.json",

  "siteName": "Foo",
  "siteDomain": "example.com",
  "siteUrl": "https://{siteDomain}/help",

  "webmasterName": "webmaster",
  "webmasterEmail": "{webmasterName}@{siteDomain}",

  "debug": 0
}
```

vvv

```json
{
  "siteName": "Foo",
  "siteDomain": "example.com",
  "siteUrl": "https://example.com/help",
  "webmasterName": "webmaster",
  "webmasterEmail": "webmaster@example.com",
  "helloFromBar": {
    "bar": "Hello World!"
  },
  "debug": 0
}
```

---

## Installation

1. The project requires Node v14 or higher. To install it, use **npm**:

```shell
npm install --save-dev obj-preset
```

2. After the installation create **.exjsonarc.json** and enter your preferences:

```shell
nano .exjsonarc.json
```

Available preferences:

```json
{
  "input": "input.v.json",
  "output": "output.v.json",
  "depth": 3,
  "objDepth": 3,
  "logging": 0,
  "errorLogging": 1
}
```

3. Compile your **JSONs**:

```shell
npx exjsona
```

**You're all set!**

---

## Tips & Tricks

1. You can set all preferences in **.exjsonarc.json**

```json
{
  "input": ".configs/default.json",
  "output": "env.json",
  "errorLogging": 0
}
```

2. The **"@extends"** directive mixes your JSON with the target one:

```json
{
  "@extends": "variables.json",
  "color": "{green}",
  "secondColor": "{blue}"
}
```

3. You can use **CLI** to override the config:

```shell
npx exjsona --input .configs/prod.json --output env.json
```

---

**ExJSONa**  
by Kenny Romanov
