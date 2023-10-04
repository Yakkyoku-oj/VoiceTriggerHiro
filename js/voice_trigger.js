/**
 * Project: VoiceTrigger
 * File: voice_trigger.js
 * Author: [Yakkyoku_oj3]
 * Contact: https://twitter.com/greenhill_pharm
 * Created Date: 2023-09-21
 * Modified Date: 2023-10-05
 *
 * Description: The Handler class serves as the primary control unit for managing
 * various functionalities in a web-based application. It is designed to handle
 * audio resources, UI controls, and Twitch messaging interface among other features.
 *
 * Features:
 * 1. Audio Management: Manages an audio queue and playback timers.
 * 2. UI Controls: Handles user interface components like volume and rate sliders, and text input fields.
 * 3. Twitch Messaging Interface: Manages a tmi_client for Twitch chat operations.
 * 4. Dynamic DOM Manipulation: Capable of dynamically generating and manipulating HTML elements through datasets.
 * 5. A separate audio_resources.js file must be prepared to list the audio data in the specified format.
 * 
 *    const audio_resources = [
 *      {
 *        element : 'audio',
 *        label   : ' ... Trigger words in the chat stream ... ',
 *        states  :
 *        {
 *           'src' : ' ... some audio filepath or BASE64 encoded text ... ',
 *        }
 *      },
 *      {
 *        // ... (next item)
 *      }
 *    ]
 *
 * Properties:
 * - controls: An object to manage UI components.
 * - tmi_client: An object to manage Twitch messaging.
 * - audio_queue: An array to manage the queue of audio files.
 * - timer_play: A variable to manage the playback timer.
 * - timer_interval: A constant defining the timer interval for audio playback.
 * - default_volume: A default audio volume level.
 * - default_rate: A default audio rate.
 *
 * Note: The constructor initializes these properties and sets up the working space within the document.
 *
 * 
 * License: [The MIT License (MIT)]
 * Version: 1.0.0
 * 
 * Copyright (c) 2023, Yakkyoku_oj3.
 */

(() => {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {

      /**
       * VoiceTriggerのアプリ全体を制御するクラス
       */
      const voice_trigger_app = new class {
        /**
         * voice_trigger_appを初期化します。
         * @param {string} working_document - 既存のHTML要素のID名
         */
        constructor(working_document) {
          this.controls = {};
          this.tmi_client = {};
          this.audio_queue = [];
          this.timer_play = 0;         // タイマー用変数
          this.timer_interval = 200;   // タイマーのインターバル(ms)
          this.default_volume = 0.2;   // ボリュームの初期値
          this.default_rate = 1;       // 再生速度の初期値
          this.flg_playing = 0;        // 再生中フラグ用変数 (0: 停止中 / 1: 再生中)
          this.now_playing_audio_id = null;

          this.split_target_tag = '<<split>>';  // トリガーワードの後ろに挿入する分割用文字列
          this.index_place_holder = '::index='; // トリガーワードの後ろにaudio番号を挿入するためのプレースホルダ文字列
          this.trigger_word_list = [];          // トリガーワード管理用の配列

          // Oj3Controls クラスを初期化
          this.controls = new Oj3Controls(working_document, this);

          // Oj3Controls クラスに、HTML要素のイベントに割り当てるためのメソッドを定義
          this.controls.control_methods = {
            /*

            引数
            app : このClass全体が継承される
            event : 割り当て対象のHTML要素で発生したeventが継承される

            メソッド名: (app) => {
              return (event) => {
                // 処理内容;
              }
            }
            */

            /**
             * 各audio要素に対応する<button>要素がクリックされたときに実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            cl_play_btn: (app) => {
              return (event) => {
                // Exitポイントcl_play_btnのUI更新処理を実行
                app.controls.update_ui('cl_play_btn', event.target.id)

                // クリックされたボタンに対応するトリガーワードをcomment要素に書き出し
                app.update_comment_twitch('click', event.target.nextSibling.value.replaceAll("&quot;", "\""));
              }
            },

            /**
             * connectボタンがクリックされたときに実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            cl_connect_btn: (app) => { return () => app.connect_twitch(); },


            /**
             * disconnectボタンがクリックされたときに実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            cl_disconnect_btn: (app) => { return () => app.disconnect_twitch(); },

            /**
             * Show Discriptionボタンがクリックされたときに実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            cl_show_discription_btn: (app) => {
              return (event) => {
                try {
                  app.controls.set_css_root_value('--disc-max-height', `${window.innerHeight - 160}px`);
                  app.controls.update_ui('cl_show_discription_btn');
                } catch (err) {
                  app.error('An error occurred in the [cl_show_discription_btn] method within control_method.', { err, event });
                }
              }
            },

            /**
             * Show Disclaimerボタンがクリックされたときに実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            cl_show_disclaimer_btn: (app) => {
              return (event) => {
                try {
                  app.controls.set_css_root_value('--disc-max-height', `${window.innerHeight - 160}px`);
                  app.controls.update_ui('cl_show_disclaimer_btn');
                } catch (err) {
                  app.error('An error occurred in the [cl_show_disclaimer_btn] method within control_method.', { err, event });
                }
              }
            },

            /**
             * Closeボタンがクリックされたときに実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            cl_close_disc_btn: (app) => { return () => app.controls.update_ui('cl_close_disc_btn') },

            /**
             * ボリュームまたは再生速度用のrangeが操作された際に実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @param {string} target_control_id - コントロール対象のID。
             * @param {string} target_display_id - rangeコントロールのvalue値の表示対象のID。
             * @param {string} audio_attribute_name - オーディオ属性名。(このプロジェクトでは'volume'または'rate'が使用されている)
             */
            update_range_control: (app, target_control_id, target_display_id, audio_attribute_name) => {

              if (typeof (target_control_id) !== 'string' || typeof (target_control_id) !== 'string') { return; }

              const $target_element = app.controls.get_element(target_control_id);
              const $display = app.controls.get_element(target_display_id);

              if ($target_element === null || $display === null) { return; }

              const range_element = app.controls.UI_elements[target_control_id];
              const range_value = range_element.get_numeric_value('value');

              if (app.now_playing_audio_id !== null) {
                const $target_audio = app.controls.get_element(app.now_playing_audio_id);
                const range_element = app.controls.UI_elements[target_control_id];
                const range_value = range_element.get_numeric_value('value');
                const range_min_value = range_element.get_numeric_value('min');
                const range_max_value = range_element.get_numeric_value('max');

                try {
                  $target_audio[audio_attribute_name] = Math.min(range_max_value, Math.max(range_min_value, range_value));
                } catch (err) {
                  app.error(`In the [update_range_control] method, an error occurred while trying to update the properties [${audio_attribute_name}] of the [${app.now_playing_audio_id}] element.`, { err })
                }
              }

              $display.innerText = `( ${range_value} )`;
            },

            /**
             * ボリュームコントロール用のrangeが操作された際に実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            mv_volume_range: (app) => {
              return (event) => {
                app.controls.control_methods.update_range_control(app, 'volume', 'disp_volume', 'volume');
              }
            },

            /**
             * 再生速度コントロール用のrangeが操作された際に実行するメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            mv_rate_range: (app) => {
              return (event) => {
                app.controls.control_methods.update_range_control(app, 'rate', 'disp_rate', 'playbackRate');
              }
            },

            /**
             * 各audio要素のonplayイベントが発火した際に実行されるメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            audio_play: (app) => {
              return (event) => {
                try {
                  // audio要素を取得
                  const $audio = event.target;

                  // button要素を取得
                  const $button = $audio.previousSibling.previousSibling;

                  // cssのroot要素にあるtr-per-durationを、audio要素のduration属性に応じて変更
                  const $volume = app.controls.get_element('volume');
                  const $rate = app.controls.get_element('rate');
                  app.controls.set_css_root_value('--tr-per-duration', `all ${($audio.duration / parseFloat($rate.value)).toFixed(1)}s`)

                  // 現在再生中のaudio要素を記憶
                  app.now_playing_audio_id = $audio.id;

                  // ExitポイントplayのUI更新処理を実行
                  app.controls.update_ui('play', $button.id);

                  // 再生中フラグをセット
                  app.flg_playing = 1;

                  // 再生中の音声のトリガーワード、ボリューム、再生速度をconsoleに書き出し
                  console.log(`[${app.get_time()}][play(v=${$volume.value}, r=${$rate.value})] : ${$audio.previousSibling.value}`);
                } catch (err) {
                  app.error('An error occurred in the [audio_play] method within control_method.', { err, event })
                }

              }
            },

            /**
             * 各audio要素のonendedイベントが発火した際に実行されるメソッド。
             * @param {Object} app - アプリケーションオブジェクト。
             * @returns {Function} - イベントハンドラ。
             */
            audio_ended: (app) => {
              return (event) => {
                // audio要素を取得
                const $audio = event.target;

                // button要素を取得
                const $button = $audio.previousSibling.previousSibling;

                // audio要素の再生位置を初期位置に変更
                $audio.currentTime = 0;

                // 再生中だった場合に実行
                if (app.audio_queue.length > 0 && app.flg_playing === 1) {

                  // 記憶していた現在再生中のaudio要素を初期化
                  app.now_playing_audio_id = null;

                  // 再生中フラグを初期化
                  app.flg_playing = 0;

                  // audio_queueの先頭（再生済み）を削除
                  app.audio_queue.shift();

                  // ExitポイントendのUI更新処理を実行
                  app.controls.update_ui('end', $button.id);

                  // 音声再生タイマーを再度実行
                  app.timer_play = setTimeout(function () { app.execute_audio_queue() }, app.timer_interval)
                }
              }
            }
          };

          // 各Exitポイントで適用する、HTML要素のプロパティを定義
          // 使用するclassは[./css/style.css]ファイルに定義済みのものを使用しなければならない
          this.controls.update_ui_dataset = {
            /* 
              Exitポイント名 : 
              {
                target : HTML要素のid , 
                states : { ... 変更したいHTML要素の属性名 : 値 ... } , 
                add_class : 追加するclass名,
                remove_class : 削除するclass名
              }
            */
            // init_uiメソッド実行時に適用
            init_ui: [
              { target: 'connect', add_class: 'active' },
              { target: 'disconnect', states: { disabled: true }, add_class: 'disactive' }
            ],

            // connect_twitchメソッド実行時に適用
            connect: [
              { target: 'connect', states: { disabled: true }, add_class: 'disactive', remove_class: 'active' },
              { target: 'disconnect', states: { disabled: false }, add_class: 'active', remove_class: 'disactive' }
            ],

            // disconnect_twitchメソッド実行時に適用
            disconnect: [
              { target: 'connect', states: { disabled: false }, add_class: 'active', remove_class: 'disactive' },
              { target: 'disconnect', states: { disabled: true }, add_class: 'disactive', remove_class: 'active' }
            ],

            // Show Discriptionsボタンをクリックした際に適用 this.control_medhod['cl_show_discription_btn']
            cl_show_discription_btn: [
              { target: 'show_disclaimer', add_class: 'active', remove_class: 'disactive' },
              { target: 'show_discription', add_class: 'disactive', remove_class: 'active' },
              { target: 'discription_title', add_class: 'blur' },
              { target: 'audio_resources', add_class: 'blur' },
              { target: 'controls', add_class: 'blur' },
              { target: 'disclaimer', remove_class: 'active' },
              { target: 'discription_footer', add_class: 'active' },
              { target: 'footer', add_class: 'active' },
              { target: 'left_navigate', add_class: 'active' },

            ],

            // Show Disclaimerボタンをクリックした際に適用 this.control_medhod['cl_show_disclaimer_btn']
            cl_show_disclaimer_btn: [
              { target: 'show_disclaimer', add_class: 'disactive', remove_class: 'active' },
              { target: 'show_discription', add_class: 'active', remove_class: 'disactive' },
              { target: 'discription_title', add_class: 'blur' },
              { target: 'audio_resources', add_class: 'blur' },
              { target: 'controls', add_class: 'blur' },
              { target: 'discription_footer', remove_class: 'active' },
              { target: 'disclaimer', add_class: 'active' },
              { target: 'footer', add_class: 'active' },
              { target: 'left_navigate', add_class: 'active' },
            ],

            // Closeボタンをクリックした際に適用 this.control_medhod['cl_close_disc_btn']
            cl_close_disc_btn: [
              { target: 'show_disclaimer', remove_class: 'active' },
              { target: 'show_disclaimer', remove_class: 'disactive' },
              { target: 'show_discription', remove_class: 'active' },
              { target: 'show_discription', remove_class: 'disactive' },
              { target: 'discription_title', remove_class: 'blur' },
              { target: 'audio_resources', remove_class: 'blur' },
              { target: 'controls', remove_class: 'blur' },
              { target: 'discription_footer', remove_class: 'active' },
              { target: 'disclaimer', remove_class: 'active' },
              { target: 'footer', remove_class: 'active' },
              { target: 'left_navigate', remove_class: 'active' },
            ],

            // playボタンをクリックした時に適用 targetは各button要素 this.control_medhod['cl_play_btn']
            cl_play_btn: [
              { target: '', states: { disabled: true }, add_class: 'ready' },
            ],

            // 音声再生中に適用 targetは各button要素
            play: [
              { target: '', add_class: 'active', remove_class: 'ready' },
            ],

            // 音声再生終了時に適用 targetは各button要素
            end: [
              { target: '', states: { disabled: false }, add_class: 'disactive', remove_class: 'active' },
            ],

            // consoleに何らかのエラーが書き出された場合に適用
            error_prefix_on_console: [
              { target: 'console', add_class: 'error' },
            ],

            // consoleに通常の文字が書き出された場合に適用
            normal_prefix_on_console: [
              { target: 'console', remove_class: 'error' },
            ],
          }
          // HTML要素を定義するためのデータセット
          this.controls.dataset = {

            // 各セクション用のdiv要素、form要素を定義
            working_spaces: [
              /*
              {
                parent: 'parent' // 親要素 (*必須)
                element: 'div' // HTMLタグ名 (*必須)
                value: 'text' // HTMLタグがform要素の場合の初期値
                text: 'text' // HTMLタグにインラインテキストを保持させる
                prepend: Bool // trueの場合、parent要素の先頭に追加される, falseまたは未定義の場合、末尾に追加される
                states: { id : 'myElelent', class : 'myclass' } // HTMLタグにセットする属性名と値のセット
              }
              */
              { parent: working_document, element: 'div', states: { id: 'discription_title' } },
              { parent: working_document, element: 'div', states: { id: 'navigate_controls' } },
              { parent: working_document, element: 'div', states: { id: 'audio_resources' } },
              { parent: working_document, element: 'div', states: { id: 'controls' } },
              { parent: working_document, element: 'div', states: { id: 'footer' } },
              { parent: 'navigate_controls', element: 'div', states: { id: 'left_navigate', class: 'left' } },
              { parent: 'navigate_controls', element: 'div', states: { id: 'right_navigate', class: 'right' } },
              { parent: 'audio_resources', element: 'div', states: { id: 'discription_audio_resources' } },
              { parent: 'controls', element: 'div', states: { id: 'discription_controls' } },
              { parent: 'footer', element: 'div', states: { id: 'discription_footer' } },
              { parent: 'footer', element: 'div', states: { id: 'disclaimer' } },
              { parent: 'controls', element: 'form', states: { id: 'ui' } },
            ],

            // 画面上部、メニューコントロールセクションの定義
            navigate: [
              { parent: 'left_navigate', element: 'input', value: 'Close', states: { id: 'close_disc', type: 'button', class: 'navigate_button' } },
              { parent: 'right_navigate', element: 'input', value: 'Show Discriptions', states: { id: 'show_discription', type: 'button', class: 'navigate_button' } },
              { parent: 'right_navigate', element: 'input', value: 'Show Disclaimer', states: { id: 'show_disclaimer', type: 'button', class: 'navigate_button' } },
            ],

            // 画面左側、コントロール用UIセクションの定義
            ui_details: [
              { parent: 'ui', element: 'div', states: { id: 'title_input_channel' } },
              { parent: 'ui', element: 'input', states: { id: 'channel', type: 'text', class: 'feedback-input', placeholder: 'Input your Twitch Channel' } },
              { parent: 'ui', element: 'input', value: 'Connect', states: { id: 'connect', type: 'button' } },
              { parent: 'ui', element: 'input', value: 'Disconnect', states: { id: 'disconnect', type: 'button' } },
              { parent: 'ui', element: 'div', states: { id: 'subject_console' } },
              { parent: 'ui', element: 'textarea', value: 'Console', states: { id: 'console', class: 'feedback-input', placeholder: 'Console', readonly: 'readonly' } },
              { parent: 'ui', element: 'div', states: { id: 'title_input_volume' } },
              { parent: 'ui', element: 'input', value: this.default_volume, states: { id: 'volume', type: 'range', class: 'input-range', min: 0, max: 1, step: 0.1 } },
              { parent: 'ui', element: 'span', states: { id: 'label_input_volume' } },
              { parent: 'ui', element: 'div', states: { id: 'title_input_rate' } },
              { parent: 'ui', element: 'input', value: this.default_rate, states: { id: 'rate', type: 'range', class: 'input-range', min: 0.1, max: 3, step: 0.1 } },
              { parent: 'ui', element: 'span', states: { id: 'label_input_rate' } },
              { parent: 'ui', element: 'div', states: { id: 'subject_chat' } },
              { parent: 'ui', element: 'textarea', value: 'Comment', states: { id: 'comments', class: 'feedback-input', placeholder: 'Comment', readonly: 'readonly' } },
            ],

            // コントロール用UIのイベントを定義
            // セットするメソッドは、this.control_methodsに定義済みのものを使用しなければならない
            ui_controls: [
              /*
              {
                id_selector_regexp : id名とマッチする正規表現。単一の場合は先頭にスペースを入力する
                control: [ { listen : 'イベントハンドラ', require: 'メソッド名' }, { ... } ]
              }
              */
              { selector: `[id^='button_play_']`, control: [{ listen: 'click', require: 'cl_play_btn' }] },
              { selector: `[id^='audio_']`, control: [{ listen: 'ended', require: 'audio_ended' }, { listen: 'play', require: 'audio_play' }] },
              { id: 'connect', control: [{ listen: 'click', require: 'cl_connect_btn' }] },
              { id: 'disconnect', control: [{ listen: 'click', require: 'cl_disconnect_btn' }] },
              { id: 'volume', control: [{ listen: 'mousemove', require: 'mv_volume_range' }, { listen: 'touchmove', require: 'mv_volume_range' }, { listen: 'change', require: 'mv_volume_range' }] },
              { id: 'rate', control: [{ listen: 'mousemove', require: 'mv_rate_range' }, { listen: 'touchmove', require: 'mv_rate_range' }, { listen: 'change', require: 'mv_rate_range' }] },
              { id: 'show_discription', control: [{ listen: 'click', require: 'cl_show_discription_btn' }] },
              { id: 'show_disclaimer', control: [{ listen: 'click', require: 'cl_show_disclaimer_btn' }] },
              { id: 'close_disc', control: [{ listen: 'click', require: 'cl_close_disc_btn' }] },

            ],

            // 画面上の説明文、見出し、ラベルの定義
            discriptions: [
              // 画面上部、audio、コントロール部分
              { parent: 'discription_title', element: 'h1', text: 'VoiceTrigger' },
              { parent: 'discription_title', element: 'h2', text: 'This tool plays sound effects corresponding to trigger words in Twitch chats.' },
              { parent: 'title_input_channel', element: 'h3', text: 'Chat stream connection :' },
              { parent: 'title_input_volume', element: 'h3', text: 'Volume control :' },
              { parent: 'title_input_rate', element: 'h3', text: 'Rate (speed) control :' },
              { parent: 'label_input_volume', element: 'label', text: 'Auto playing volume', states: { for: 'volume', class: 'subject' } },
              { parent: 'label_input_volume', element: 'span', text: `( ${this.default_volume} )`, states: { id: 'disp_volume', class: 'subject' } },
              { parent: 'label_input_rate', element: 'label', text: 'Auto playing rate', states: { for: 'volume', class: 'subject' } },
              { parent: 'label_input_rate', element: 'span', text: `( ${this.default_rate} )`, states: { id: 'disp_rate', class: 'subject' } },
              { parent: 'subject_chat', element: 'h3', text: 'Chat stream :' },
              { parent: 'subject_chat', element: 'p', text: 'If the connection to the channel is successful, the contents of the chat stream will be displayed here.', states: { class: 'subject' } },
              { parent: 'subject_console', element: 'h3', text: 'Console stream :' },
              { parent: 'subject_console', element: 'p', text: 'If some error occurs or audio is played back, its contents will be displayed here.', states: { class: 'subject' } },
              { parent: 'discription_audio_resources', element: 'h2', text: 'Sound Effect Resources :' },
              { parent: 'discription_audio_resources', element: 'p', text: 'If the chat stream contains the "trigger word" on the right, the audio will be played.', states: { 'class': 'subject' } },
              { parent: 'discription_audio_resources', element: 'p', text: 'Press the [▶] to play audio.', states: { 'class': 'subject' } },
              { parent: 'discription_audio_resources', element: 'p', text: 'A method to stop playback midway has not yet been implemented.', states: { 'class': 'subject' } },
              { parent: 'discription_audio_resources', element: 'p', text: '[VOICEVOX:ずんだもん]', states: { 'class': 'subject' } },
              { parent: 'discription_controls', element: 'h2', text: 'Controls :' },
              { parent: 'discription_footer', element: 'h2', text: 'Descriptions :' },
              { parent: 'discription_footer', element: 'p', text: 'Requests for additional audio can be made on the Twitch channel below. Please follow us and subscribe!', states: { 'class': 'subject' } },
              { parent: 'discription_footer', element: 'h3', text: 'Update history : ' },
              { parent: 'discription_footer', element: 'ul', states: { id: 'histories' } },
              { parent: 'discription_footer', element: 'h3', text: 'Special thanks : ' },
              { parent: 'discription_footer', element: 'ul', states: { id: 'thanks' } },
              { parent: 'discription_footer', element: 'h3', text: 'Links : ' },
              { parent: 'discription_footer', element: 'ul', states: { id: 'links' } },

              // 更新履歴
              { parent: 'histories', element: 'li', text: '[2023/10/04] Added 23 audio resources.', states: { class: 'subject' } },

              // スペシャルサンクス
              { parent: 'thanks', element: 'li', text: '[tmi.min.js] : ', states: { id: 'thanks_line_0', class: 'subject' } },
              { parent: 'thanks_line_0', element: 'a', text: 'https://github.com/tmijs/tmi.js/', states: { href: 'https://github.com/tmijs/tmi.js/', target: '_blank' } },
              { parent: 'thanks', element: 'li', text: '[VOICEVOX:ずんだもん] : ', states: { id: 'thanks_line_1', class: 'subject' } },
              { parent: 'thanks_line_1', element: 'a', text: 'https://voicevox.hiroshiba.jp/product/zundamon/', states: { href: 'https://voicevox.hiroshiba.jp/product/zundamon/', target: '_blank' } },
              { parent: 'thanks', element: 'li', text: '[WAV to BASE64] : ', states: { id: 'thanks_line_2', class: 'subject' } },
              { parent: 'thanks_line_2', element: 'a', text: 'https://www.motobit.com/util/base64-decoder-encoder.asp', states: { href: 'https://www.motobit.com/util/base64-decoder-encoder.asp', target: '_blank' } },

              // リンク
              { parent: 'links', element: 'li', text: '[Developer] : yakkyoku_oj3 / ', states: { id: 'links_line_0', class: 'subject' } },
              { parent: 'links_line_0', element: 'a', text: 'https://www.twitch.tv/yakkyoku_oj3', states: { href: 'https://www.twitch.tv/yakkyoku_oj3', target: '_blank' } },

              // 利用規約
              { parent: 'disclaimer', element: 'h2', text: 'Disclaimer :' },
              { parent: 'disclaimer', element: 'ol', states: { id: 'list_disclaimer' } },
              { parent: 'list_disclaimer', element: 'li', states: { id: 'disc_item_0' } },
              { parent: 'disc_item_0', element: 'h3', text: 'General Disclaimer' },
              { parent: 'disc_item_0', element: 'p', text: 'The service is provided "as is" and "as available," without any warranties, whether express or implied, regarding its availability, accuracy, reliability, suitability, or safety.', states: { class: 'subject' } },

              { parent: 'list_disclaimer', element: 'li', states: { id: 'disc_item_1' } },
              { parent: 'disc_item_1', element: 'h3', text: 'Limitation of Liability' },
              { parent: 'disc_item_1', element: 'p', text: 'Under no circumstances shall I be liable for any direct, indirect, incidental, special, consequential, or punitive damages ("Damages") suffered by you or any third party, arising from the use of this service.', states: { class: 'subject' } },

              { parent: 'list_disclaimer', element: 'li', states: { id: 'disc_item_2' } },
              { parent: 'disc_item_2', element: 'h3', text: 'Service Interruption or Termination' },
              { parent: 'disc_item_2', element: 'p', text: 'I make no warranty that the information or services obtained by the user through this service will meet the user’s expectations or be error-free. Additionally, I shall not be liable for any damages caused by the interruption or termination of this service.', states: { class: 'subject' } },

              { parent: 'list_disclaimer', element: 'li', states: { id: 'disc_item_3' } },
              { parent: 'disc_item_3', element: 'h3', text: 'Security Disclaimer' },
              { parent: 'disc_item_3', element: 'p', text: 'I do not guarantee that the information or services obtained through this service will meet your expectations or be error-free. Furthermore, I shall not be responsible for any damages incurred due to the interruption or termination of this service.', states: { class: 'subject' } },

              { parent: 'list_disclaimer', element: 'li', states: { id: 'disc_item_4' } },
              { parent: 'disc_item_4', element: 'h3', text: 'Disclaimer for Third-Party Actions' },
              { parent: 'disc_item_4', element: 'p', text: 'There is a possibility of interference or damage caused by third parties, including viruses. I shall not be responsible for such damages.', states: { class: 'subject' } },
            ],
          }

          // 各セクションとUIの出力
          this.controls.create_ui_elements('working_spaces');
          this.controls.create_ui_elements('ui_details');
          this.controls.create_ui_elements('discriptions');
          this.controls.create_ui_elements('navigate');

          // audio要素を出力
          this.create_audio_section();

          // UIの初期状態を反映
          this.controls.init_ui(this);

          // Exitポイントinit_uiのUI更新処理を実行する
          this.controls.update_ui('init_ui');

          // コンソールログの出力先をセット
          console.log = this.log;
        }

        /**
         * create_audio_section - audio_resources配列を用いてHTMLの音声セクションを動的に生成します。
         * 
         * このメソッドは、与えられたaudio_resourcesの配列を用いて、ボタン、入力フィールド（hidden）、
         * オーディオ要素、およびその他のHTML要素を生成します。生成された各要素は、特定の状態（属性）を持ちます。
         * また、このメソッドはオーディオフォーマットとBASE64エンコーディングの検証も行います。
         *
         * @function
         * 
         * @throws {Error} audio_resourcesがBASE64エンコードされていない、またはサポートされていないオーディオフォーマットである場合にエラーを投げます。
         * 
         * @example
         * create_audio_section();
         */
        create_audio_section() {

          let data = [];

          audio_resources.map((item, index) => {
            let is_error = false;

            // 配列のアイテムごとにbutton要素とhidden要素を定義
            data.push({ parent: 'audio_resources', element: 'button', text: '▶', states: { id: `button_play_${index}` } });
            data.push({ parent: 'audio_resources', element: 'input', states: { type: 'hidden', value: `"${item['label']}"`, id: `button_value_play_${index}` } });

            // audio要素を定義
            item['parent'] = 'audio_resources';
            item['states']['id'] = 'audio_' + index;
            item['states']['type'] = 'audio/wav';
            item['states']['preload'] = 'auto'
            item['states']['volume'] = this.default_volume;

            // src属性の処理
            // 配列のアイテムのsrc属性に音声ファイルの拡張子が含まれない場合に実行
            if (item['states']['src'].match(/(\.wav$|\.mp3$|\.ogg$)/i) === null) {

              // src属性の内容がBASE64か判定
              // 真 : 場合は先頭にwav用の識別文字列を追加
              // 偽 : エラーメッセージを表示しエラーフラグをtrueにする
              if (this.is_base64(item['states']['src']) === true) {
                item['states']['src'] = 'data:audio/wav;base64,' + item['states']['src'];
              }
              else {
                this.error(`Invalid audio resource at "${item['label']}": The audio content must be a BASE64 string or a wav, mp3, or ogg file.`, { index, item })
                is_error = true;
              }
            }
            data.push(item);

            // トリガーワードのspan要素を定義
            data.push({ parent: 'audio_resources', element: 'span', text: `"${item['label']}"`, states: { id: `label_audio_${index}`, 'class': 'audio_label' } })
            data.push({ parent: 'audio_resources', element: 'br' })

            // BASE64の判定がエラーになっている場合は、エラーを明示するためのspan要素を定義
            if (is_error) {
              data.push({ parent: `label_audio_${index}`, element: 'strong', text: 'ERROR!' });
            }

            // トリガーワード管理用の配列に要素を追加
            this.trigger_word_list.push({ index: index, word: `"${item['label']}"` });
          })

          // 定義したaudio, button, input:hidden, spanを出力
          this.controls.output_details_html(data);
        }

        /**
         * connect_twitch - Twitchのチャンネルに接続し、メッセージを受信するクライアントを設定します。
         * 
         * このメソッドは、指定されたチャンネルに接続するためのTMI（Twitch Messaging Interface）クライアントを作成します。
         * 成功した場合、このクライアントは受信したTwitchチャットメッセージを処理します。
         * また、UIと音声再生タイマーも適切に更新されます。
         * 
         * @function
         * 
         * @throws {Error} TMIクライアントの接続に失敗した場合、コンソールにエラーが出力されます。
         * 
         * @sideeffect UIが更新され、音声再生タイマーが起動されます。
         * 
         * @example
         * connect_twitch();
         */
        connect_twitch() {
          const $channel = this.controls.get_element('channel');

          // tmiクライアントクラスを新規作成し、チャンネルに接続
          this.tmi_client = new tmi.Client({ channels: [$channel.value] });
          this.tmi_client.connect().catch(console.error);

          // メッセージを受信したときに実行する処理を定義
          this.tmi_client.on('message', (channel, tags, message, self) => {
            voice_trigger_app.update_comment_twitch('chat', message)
          });

          // ExitポイントconnectのUI更新処理を実行する
          this.controls.update_ui('connect');

          // 音声再生タイマーを起動しておく
          this.execute_audio_queue();
        }

        /**
         * Twitchからの接続を切断し、関連するリソースを解放するメソッド
         * 
         * このメソッドは、voice_trigger_app内のTwitchのTMIクライアントを切断し、
         * 音声キューとタイマーをクリアします。また、UIも更新されます。
         * 
         * @example
         * // Twitchからの接続を切断する
         * voice_trigger_app.disconnect_twitch();
         * 
         * @throws {Error} TMIクライアントが存在しない、または既に切断されている場合にエラーが発生する可能性があります。
         */
        disconnect_twitch() {
          voice_trigger_app.tmi_client.disconnect();

          // 再生待ちのaudioを削除
          voice_trigger_app.audio_queue = [];

          // タイマー変数を削除
          clearTimeout(voice_trigger_app.timer_play);

          // ExitポイントdisconnectのUI更新処理を実行する
          voice_trigger_app.controls.update_ui('disconnect');
        }

        /**
         * Twitchから受信したコメントを処理し、関連するUIやオーディオキューを更新する。
         * 
         * @param {string} trigger - コメントが発火されたトリガー（このプロジェクトでは'chat'また'click'）。
         * @param {string} message - 受信したコメント本文。
         * 
         * @example
         * // コメントとトリガーを指定して、UIとオーディオキューを更新
         * update_comment_twitch("username", "This is a comment.");
         * 
         * @throws {Error} 依存するDOM要素（'comments'など）が存在しない場合、エラーが発生する可能性があります。
         * 
         * @see controls.get_element - DOM要素を取得するために使用されるメソッド。
         * @see get_time - 現在時刻を取得するために使用されるメソッド。
         * @see escape_html - HTMLエスケープを行うために使用されるメソッド。
         * @see replace_trigger_word - トリガーワードを処理するために使用されるメソッド。
         * @see execute_audio_queue - オーディオキューを処理するために使用されるメソッド。
         */
        update_comment_twitch(trigger, message) {
          const $comments = this.controls.get_element('comments');

          // 受信したコメントをcomments要素に追記
          $comments.value += `\n[${this.get_time()}][${trigger}] : ${this.escape_html(message)}`;

          // comments要素のスクロール位置を末尾に設定
          $comments.scrollTop = $comments.scrollHeight;

          // いずれかのトリガーワードが存在する場合に実行
          if (this.trigger_word_list.length > 0) {

            // messageに含まれるトリガーワードの後ろに分割用文字列、通し番号用のプレースホルダを挿入
            let trigger_word_replaced_text = this.replace_trigger_word(message)

            // tag_replaced_textに分割用文字列が存在する場合に実行
            if (trigger_word_replaced_text.indexOf(this.split_target_tag) !== -1) {

              // tag_replaced_textを分割用文字列で分割
              const lines = trigger_word_replaced_text.split(this.split_target_tag);

              // 分割された要素ごとにaudio_queueを作成
              lines.forEach((line) => {
                if (line.indexOf(this.index_place_holder) !== -1) {

                  // プレースホルダ文字列で、各要素を分割
                  const splited_line = line.split(this.index_place_holder);

                  // プレースホルダの右側にある数字を数値に変換
                  const index = parseInt(splited_line[1], 10);

                  // audio要素とその通し番号をaudio_queueに追加
                  const $audio_item = this.controls.get_element(`audio_${index}`);
                  this.audio_queue.push({ index: index, audio_item: $audio_item });
                }
              })

              // 音声再生タイマーを起動しておく
              this.execute_audio_queue();
            }
          }
        }

        /**
         * 受信したメッセージ内のトリガーワードを特定の形式に置換します。
         * 置換形式は "トリガーワード::index=audio通し番号::<<split>>" となります。
         *
         * @param {string} message - 置換対象となるメッセージ本文。
         * @returns {string} トリガーワードが特定の形式に置換された新しいメッセージ。
         * 
         * @example
         * // "hello"がトリガーワードで、そのaudio通し番号が1の場合
         * const newMessage = replace_trigger_word("hello world");
         * // newMessage => "hello::index=1::<<split>> world"
         * 
         * @see trigger_word_list - トリガーワードとそれに関連するaudio通し番号が格納されている配列。
         * @see index_place_holder - 通し番号用のプレースホルダ。
         * @see split_target_tag - メッセージを分割するためのタグ。
         */
        replace_trigger_word(message) {
          // トリガーワードごとに、message内に含まれるか判定
          this.trigger_word_list.forEach((trigger_word) => {

            if (message.match(trigger_word['word'])) {
              // 含まれる場合は、"トリガーワード::index=audio通し番号::<<split>>" のように置換し、tag_replaced_textを更新
              const replacement = `${trigger_word['word']}${this.index_place_holder}${trigger_word['index']}::${this.split_target_tag}`;
              message = message.replaceAll(trigger_word['word'], replacement);
            }
          })

          return message;
        }

        /**
         * キューに格納されたオーディオファイルを順番に再生します。
         * 
         * このメソッドは、voice_trigger_appオブジェクト内の`audio_queue`を読み、
         * 再生対象のオーディオ要素が存在する場合にそれを再生します。
         * 同時に、ユーザーによって指定されたボリュームと再生速度も適用します。
         *
         * @returns {void} このメソッドは返り値を持ちません。
         * 
         * @throws オーディオの再生に問題が発生した場合、エラーメッセージとその詳細を出力します。
         * 
         * @see voice_trigger_app.audio_queue - 再生対象のオーディオ要素が格納されたキュー。
         * @see voice_trigger_app.flg_playing - オーディオが再生中であるかどうかを示すフラグ。
         * @see voice_trigger_app.timer_play - 再生管理用のタイマー変数。
         * @see voice_trigger_app.timer_interval - タイマーの間隔（ミリ秒）。
         */
        execute_audio_queue() {

          // タイマー変数を初期化
          clearTimeout(voice_trigger_app.timer_play);

          // audio_queueが存在する場合に実行
          if (voice_trigger_app.audio_queue !== undefined && voice_trigger_app.audio_queue.length > 0) {

            // 再生対象のaudio要素
            const $target_audio = voice_trigger_app.audio_queue[0]['audio_item'];

            // 再生中フラグが0の場合に実行
            if (voice_trigger_app.flg_playing === 0) {
              const $volume_control = voice_trigger_app.controls.get_element('volume');
              const $rate_control = voice_trigger_app.controls.get_element('rate');
              const volume = parseFloat($volume_control.value);
              const rate = parseFloat($rate_control.value);

              // audio要素のボリュームと再生速度をセット
              try {
                $target_audio.playbackRate = rate
                $target_audio.volume = volume;
                $target_audio.play();

              } catch (err) {
                voice_trigger_app.error('An error occurred when I tried to play the audio from target.', { volume, rate, err, $target_audio });
                return;
              }

            }
            voice_trigger_app.timer_play = setTimeout(function () { voice_trigger_app.execute_audio_queue() }, voice_trigger_app.timer_interval);
          }
        }


        // メッセージからHTMLタグを除去するメソッド
        escape_html(message) {
          return message
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        }

        // 現在時刻を取得するメソッド
        get_time() {
          const date = new Date();
          const h = date.getHours();
          const m = date.getMinutes();
          const s = date.getSeconds();

          return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }

        // 文字列がBASE64エンコードされたものか判定するメソッド
        is_base64(str) {
          if (str === '' || str.trim() === '') { return false; }

          try {
            return btoa(atob(str)) === str;
          }
          catch (err) {
            this.error('An error occurred during execution of the is_base64 method.', { err })
            return false;
          }
        }

        // console要素に文字列を書き出すメソッド
        log(message, prefix = '▶') {
          const $console = voice_trigger_app.controls.get_element('console');

          $console.value += `\n${prefix}${voice_trigger_app.escape_html(message)}`;
          $console.scrollTop = $console.scrollHeight;

          if (prefix.indexOf('⚠') !== -1 || message.indexOf('error:') !== -1) {
            voice_trigger_app.controls.update_ui('disconnect');
            voice_trigger_app.controls.update_ui('error_prefix_on_console');
          } else {
            voice_trigger_app.controls.update_ui('normal_prefix_on_console');
          }
        }

        // console要素およびconsole.errorにエラー内容を書き出すメソッド
        error(message, display_obj = null) {
          console.log(`[${this.get_time()}]${message}`, '⚠');
          console.error(message);
          if (display_obj === null || Object.entries(display_obj).length === 0) { return; }

          Object.entries(display_obj).forEach(([key, value]) => {
            if (typeof (value) === 'object') {
              console.error(value);
              console.log(`${key} = [${value}]`, '⚠');
            }
          })
          console.log('Notice : If you need more detailed information, see the message output to the browser console.', '⚠❓');
        }
      }('working_document')

    }
  }
})();