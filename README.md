# mini-lang Transpiler

このプロジェクトは、`mini-lang`という独自のシンプルな言語を JavaScript に変換する**トランスパイラ**です。

## 特徴

- 簡単な算術式のサポート（例: `add 3 to 5`）

## インストール

プロジェクトをクローンします：

```bash
git clone https://github.com/shinonomelon/mini-lang-transpiler
cd mini-lang-transpiler
```

## 使い方

`mini-lang.txt` ファイルにコードを記述します。その後、以下のコマンドを実行してコンパイルします：

```bash
node compiler.js
```

出力された JavaScript は `compiled.js` ファイルに保存されます。

## サンプル

`mini-lang.txt`:

```
add 3 to 5
```

出力 (`compiled.js`):

```javascript
3 + 5;
```
