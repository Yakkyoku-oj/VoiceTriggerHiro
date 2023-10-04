# VoiceTrigger

Twitchのストリーマー向けに開発された、音声再生用ブラウザアプリです。  
任意のチャンネルのチャットストリームを取得し、トリガーワードに一致するパターンが含まれている場合に指定された音声を再生します。

## JSファイルの主な処理内容

- `voice_trigger.js`内に定義されている`dataset`オブジェクトの内容に従って、ブラウザ上にUIを出力します。
- `voice_trigger.js`内に定義されている`control_methods`オブジェクトの内容に従って、UIに各種イベントハンドラをアタッチします。
- `audio_resources.js`の内容に従ってブラウザ上に`audio`要素を出力します。

## ブラウザ上のUIに実装されている機能

- 任意の音声をボタンクリックで再生
- Twitchチャンネルへの接続、切断
- 音量、再生速度の変更
- チャットストリームから受信したメッセージの表示用テキストエリア
- アプリのエラー、再生された音声の状態を表示するテキストエリア
- アプリの説明、更新履歴、リンク、利用規約を表示するボタン

## ライセンス（MIT）
- 当アプリのライセンスはMITライセンスとなっております。
- 当アプリ内で使用しているtmi.min.jsはAlcaDesign様が開発したライブラリですが、同様にMITライセンスとなっております。
  tmi.min.jsのライセンスURL : [https://github.com/tmijs/tmi.js/blob/main/LICENSE](https://github.com/tmijs/tmi.js/blob/main/LICENSE)

## 外部リソース

- Twitchのチャットストリームを取得するために必要な`tmi.min.js`は次のリポジトリから取得したものです。  
  リポジトリURL : [https://github.com/tmijs/tmi.js/](https://github.com/tmijs/tmi.js/)

## ファイル構成

- `main.html`                    - アプリを起動するためのHTMLファイル（ローカル環境で動作可能）
- `./css/style.css`              - アプリで使用するスタイルシート
- `./css/reset.css`              - アプリで使用するスタイルシート
- `./js/voice_trigger.js`        - アプリのUI、機能が実装されたJavaScriptソースファイル
- `./js/audio_resources.js`      - 再生される音声データが登録されているJavaScriptソースファイル
- `./js/oj3controls.js`          - UIのHTML要素を保持、アウトプット、初期化、状態の更新を行うための基本ライブラリ
- `./js/tmi.min.js`              - Twitchのチャットストリームに接続するためのクライアント用ライブラリ
- `./js/frame.js`                - アプリを別の既存HTMLに埋め込む際に使用するJavaScriptのサンプルコード

# インストール手順

HTMLファイル、CSS、JSファイルリポジトリの構成のまま、全て展開してください。

## 使用方法

`main.html`をブラウザで表示してください。

## 依存関係

特にありません。

## バージョン履歴

- 1.0.0

## クレジット

- `tmi.min.js`はAlcaDesign様が開発したライブラリで、次のリポジトリから取得したものです。
  - [リポジトリURL](https://github.com/tmijs/tmi.js/)
- [VOICEVOX:ずんだもん] VOICEVOXは「ずんだもん」の子供っぽい高めの声で誰でも簡単に音声を作成できる、無料のテキスト読み上げソフトウェアです。
  - [https://voicevox.hiroshiba.jp/product/zundamon/](https://voicevox.hiroshiba.jp/product/zundamon/)
- 音声ファイルのBASE64エンコードには、[Base64 - Online Base64 decoder and encoder]を使用できます。
  - [Base64 - Online Base64 decoder and encoder](https://www.motobit.com/util/base64-decoder-encoder.asp)

## 問い合わせ先

- Twitter: [https://twitter.com/greenhill_pharm](https://twitter.com/greenhill_pharm)
- Twitchチャンネル: [https://www.twitch.tv/yakkyoku_oj3](https://www.twitch.tv/yakkyoku_oj3)

## 免責事項

### 一般的な免責事項

本サービスは「現状有姿」および「利用可能な限り」で提供され、その可用性、正確性、信頼性、適合性、または安全性について、明示的または黙示的な保証は一切ありません。

### 責任の制限

いかなる状況においても、本サービスの利用によってあなたまたは第三者が被る直接的、間接的、偶発的、特別、結果的、または懲罰的な損害（「損害」）について、私は一切責任を負いません。

### サービスの中断または終了

本サービスを通じてユーザーが得る情報またはサービスがユーザーの期待に応える、またはエラーフリーであるという保証は一切ありません。また、本サービスの中断または終了によって発生した損害について、私は一切責任を負いません。

### セキュリティに関する免責事項

本サービスを通じて取得した情報またはサービスがあなたの期待に応える、またはエラーフリーであるという保証は一切ありません。さらに、本サービスの中断または終了によって発生した損害について、私は一切責任を負いません。

### 第三者の行為に対する免責事項

ウイルスを含む第三者による干渉または損害の可能性があります。そのような損害に対して、私は一切責任を負いません。

