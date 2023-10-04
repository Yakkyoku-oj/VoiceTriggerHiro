/*
=======================================================
Oj3Controls Class
=======================================================

Description:
------------
The Oj3Controls class is designed to handle user interface interactions for a web-based application.
This class also manages UI states through defined data sets.
The class acts as a critical part of an overarching application structure, inheriting its attributes and methods from the main application class (app).

Methods:
---------
- constructor(working_document): serves as an initializer for the object, performing several key tasks:

  Parameters: 
    `working_document`:
      An HTML document where the application's elements will be rendered.
  
  Actions:
    Initializing HTML Elements
      `this.elements = {}`:
        Initializes an empty object to hold the HTML elements that will be dynamically created.

    Event Handling
      `this.control_methods`:
        Defines a series of event-handling methods for various HTML elements.

    UI Configuration
      `this.update_ui_dataset`:
        Defines how the UI should change in response to certain actions.
        It specifies the target HTML element to change, its new states, and any classes to add or remove.

    Element Definitions
      'this.dataset':
        Provides a set of predefined configurations to create HTML elements, including their parent elements, types, and other attributes.

 - get_element(key):
    This method retrieves the HTML element associated with the specified key from the elements object.
    If the element is not found or undefined, it returns null.

 - set_css_root_value(key, value):
    This method modifies a CSS variable within the :root element of the document's stylesheet.
    The variable to change and its new value are provided as arguments key and value respectively.

 - create_ui_elements(datasetKey):
    This method dynamically generates HTML elements for various sections of the user interface.
    It takes a dataset key as an argument, which corresponds to a specific set of UI elements defined in the dataset object.
    The method then calls the output_details_html method with this dataset to create the UI elements.

  - output_details_html(details):
    This method outputs the HTML elements based on the passed details parameter.
    It creates new UI items and attaches them to their corresponding parent elements while setting their innerText, id, and other attributes as needed.

 - init_ui(app):
    This method initializes the control UI section by setting up event handlers and initializing the values for the respective UI elements.
    It iterates through the 'ui_controls' dataset to attach the appropriate event handlers.

 - update_ui(exit_point, id = null):
    This method updates the attributes and CSS classes of HTML elements within the control UI section.
    It acts based on the exit_point provided and applies the changes to the corresponding UI element, either targeted by id or specified in the 'update_ui_dataset'.
*/

/*
Usage of Oj3Controls Class :
----------------------------
 - Initialization:
    To initialize an instance of the Oj3Controls class, you would use the constructor method, providing it with one parameter: working_document.
    The working_document parameter represents the HTML document where the application's elements will be rendered.

    Example:
    const myDocument = document; // the HTML document
    const oj3Controls = new Oj3Controls(myDocument);

 - Getting Elements:
    To retrieve a particular HTML element that is part of the application's user interface, you can utilize the get_element method.
    The method takes a key as an argument and returns the corresponding HTML element if it exists. If the element is not found, it returns null.

    Example:
    const myElement = oj3Controls.get_element("someKey");

 - Modifying CSS Root Value:
    For altering the value of a CSS variable within the :root element of the document's stylesheet, you can employ the set_css_root_value method.
    This method requires the variable key and its new value as arguments.

    Example:
    oj3Controls.set_css_root_value("--main-bg-color", "blue");

 - Generating HTML Elements:
    This method is used to dynamically generate HTML elements for various sections of the user interface.
    It takes a dataset key as an argument, which corresponds to a specific set of UI elements defined in the dataset object.

    Example:
      oj3Controls.create_ui_elements('working_spaces');
      oj3Controls.create_ui_elements('ui_details');
      oj3Controls.create_ui_elements('discriptions');
      oj3Controls.create_ui_elements('navigate');

  - Outputting Detailed HTML Elements:
     To output HTML elements based on a specified details dataset, you may use output_details_html method.

     Example:
     oj3Controls.output_details_html(someDetails);

  - Initializing UI:
     The init_ui method is employed for setting up event handlers and initializing values for respective UI elements.

     Example:
     oj3Controls.init_ui(myApp);

  - Updating UI:
     To modify attributes and CSS classes of HTML elements within the control UI section, you can use update_ui method.
     This method takes an exit_point and an optional id to specify which UI elements should be updated.

     Example:
     oj3Controls.update_ui("connect", "someId");

File: oj3control.js
Author: Yakkyoku_oj3
UpdateDate: 2023/10/04
Version: 1.0.0
License: [The MIT License (MIT)]

=======================================================
Copyright 2023 Yakkyoku_oj3. All rights reserved.
=======================================================

説明:
------------
Oj3Controls クラスは、Webベースのアプリケーションのユーザーインターフェースの操作を処理するために設計されています。
このクラスはまた、定義されたデータセットを通じてUIの状態を管理します。
このクラスは、主要なアプリケーションクラス（app）から属性とメソッドを継承し、包括的なアプリケーション構造の重要な部分として機能します。

メソッド:
---------
- constructor(working_document): オブジェクトの初期化を行うためのメソッドで、いくつかの重要なタスクを実行します:

  パラメータ: 
    `working_document`:
      アプリケーションの要素がレンダリングされるHTMLドキュメント。
  
  アクション:
    HTML要素の初期化
      `this.elements = {}`:
        動的に作成されるHTML要素を保持するための空のオブジェクトを初期化します。

    イベント処理
      `this.control_methods`:
        各種HTML要素のイベント処理メソッドを定義します。

    UI設定
      `this.update_ui_dataset`:
        特定のアクションに対する応答としてUIがどのように変更するかを定義します。
        変更する対象のHTML要素、その新しい状態、追加または削除するクラスを指定します。

    要素定義
      'this.dataset':
        HTML要素を作成するための事前定義された設定を提供します。これには、親要素、タイプ、その他の属性が含まれます。

 - get_element(key):
    このメソッドは、指定したキーに関連付けられたHTML要素をelementsオブジェクトから取得します。
    要素が見つからないか未定義の場合はnullを返します。

 - set_css_root_value(key, value):
    このメソッドは、ドキュメントのスタイルシート内の:root要素内のCSS変数を変更します。
    変更する変数とその新しい値は、それぞれ引数keyとvalueとして提供されます。

 - create_ui_elements(datasetKey):
    このメソッドは、ユーザーインターフェースのさまざまなセクションのHTML要素を動的に生成します。
    引数としてデータセットのキーを取り、これはデータセットオブジェクト内で定義された特定のUI要素のセットに対応します。
    その後、このメソッドは、UI要素を作成するために、このデータセットを使用してoutput_details_htmlメソッドを呼び出します。

 - output_details_html(details):
    このメソッドは、渡されたdetailsパラメータに基づいてHTML要素を出力します。
    新しいUIアイテムを作成し、それらを対応する親要素にアタッチしながら、必要に応じてinnerText、id、その他の属性を設定します。

 - init_ui(app):
    このメソッドは、イベントハンドラの設定と各UI要素の値の初期化を行うことで制御UIセクションを初期化します。
    'ui_controls'データセットを反復処理して適切なイベントハンドラをアタッチします。

 - update_ui(exit_point, id = null):
    このメソッドは、制御UIセクション内のHTML要素の属性とCSSクラスを更新します。
    提供されたexit_pointに基づいて行動し、対応するUI要素（idでターゲット指定されたものまたは'update_ui_dataset'で指定されたもの）に変更を適用します。
*/

/*
Oj3Controls クラスの使用法 :
----------------------------
 - 初期化:
    Oj3Controls クラスのインスタンスを初期化するには、constructorメソッドを使用し、1つのパラメータ：working_documentを提供します。
    working_documentパラメータは、アプリケーションの要素がレンダリングされるHTMLドキュメントを表します。

    例:
    const myDocument = document; // HTMLドキュメント
    const oj3Controls = new Oj3Controls(myDocument);

 - 要素の取得:
    アプリケーションのユーザーインターフェースの一部である特定のHTML要素を取得するには、get_elementメソッドを使用できます。
    このメソッドはキーを引数として取り、存在する場合は対応するHTML要素を返します。要素が見つからない場合はnullを返します。

    例:
    const myElement = oj3Controls.get_element("someKey");

 - CSSルート値の変更:
    ドキュメントのスタイルシート内の:root要素内のCSS変数の値を変更するためには、set_css_root_valueメソッドを使用できます。
    このメソッドでは、変更する変数とその新しい値がそれぞれ引数keyとvalueとして必要です。

    例:
    oj3Controls.set_css_root_value("--main-bg-color", "blue");

 - HTML要素の生成:
    create_ui_elementsメソッドは、さまざまな作業スペースと制御ユーザーインターフェース（UI）セクションを動的に生成する責任があります。 

    例:
    oj3Controls.create_ui_elements('working_spaces');
    oj3Controls.create_ui_elements('ui_details');
    oj3Controls.create_ui_elements('discriptions');
    oj3Controls.create_ui_elements('navigate');

  - 詳細なHTML要素の出力:
    指定した詳細データセットに基づいてHTML要素を出力するには、output_details_htmlメソッドを使用できます。

    例:
    oj3Controls.output_details_html(someDetails);

  - UIの初期化:
    init_uiメソッドは、イベントハンドラの設定と各UI要素の値の初期化を行うために使用されます。

    例:
    oj3Controls.init_ui(myApp);

  - UIの更新:
    制御UIセクション内のHTML要素の属性とCSSクラスを変更するためには、update_uiメソッドを使用できます。
    このメソッドはexit_pointとオプションでidを取り、どのUI要素が更新されるべきかを指定します。

    例:
    oj3Controls.update_ui("connect", "someId");

ファイル: oj3control.js
著者: Yakkyoku_oj3
更新日: 2023/10/05
バージョン: 1.0.0

*/
/**
 * Oj3Controls クラスは、UI関連の操作と管理を担当するクラスです。
 * 
 * このクラスは、HTML要素の操作やイベント管理、データセットの使用など、
 * UIに関連する多くの機能を提供します。
 * 
 * @class
 * @property {Object} elements - HTML要素を格納するオブジェクト。
 * @property {Object} UI_elements - UI関連のHTML要素を格納するオブジェクト。
 * @property {Object} control_methods - HTML要素のイベントに対応するメソッドを格納するオブジェクト。
 * @property {Object} update_ui_dataset - HTML要素を各Exitポイントで属性値を更新する設定を格納するオブジェクト。
 * @property {Object} dataset - HTML要素のデータセットを格納するオブジェクト。
 */
class Oj3Controls {

  /**
   * クラスのインスタンスを生成し、UI関連の各種設定を初期化します。
   *
   * このコンストラクタは、HTML要素やそれに関連するイベント、データセットなどの設定を行います。
   * 引数として与えられた`working_document`が有効なHTML要素のIDである場合、その要素をUIの出力対象としてセットします。
   *
   * @param {string} working_document - UIの出力対象となるHTML要素のID。
   * 
   * @throws {Error} `working_document`が無効なIDの場合、エラーをスローします。
   *
   */
  constructor(working_document) {
    // HTML要素の初期化
    this.elements = {};
    this.UI_elements = {};

    // HTML要素のイベント用メソッドが定義されるオブジェクトを初期化
    this.control_methods = {};

    // HTML要素を各Exitポイントで属性値を更新するための設定を格納するオブジェクトを初期化
    this.update_ui_dataset = {};

    // HTML要素のデータセットを格納するオブジェクトを初期化
    this.dataset = {};

    // UIの出力対象をセット
    if (typeof (working_document) === 'string' && document.getElementById(working_document) !== undefined) {
      this.elements[working_document] = document.getElementById(working_document);
    }
    else {
      throw new Error("Invalid working document provided.");
    }
  }

  /**
   * 指定されたキーに対応するHTML要素を返す
   * @param {string} key - HTML要素に対応するキー
   * @returns {Element} 対応するHTML要素
   * @throws {Error} 指定されたキーに対応するHTML要素が存在しない場合にエラーをスロー
   */
  get_element(key) {
    if (this.elements[key] === undefined || !this.elements[key]) {
      throw new Error(`Element with key ${key} not found.`);
    }
    return this.elements[key];
  }


  /**
   * CSSのルート要素内の変数を変更する
   * @param {string} key - 変更するCSS変数のキー
   * @param {string} value - 設定する値
   * @throws {Error} 指定されたCSS変数が存在しない場合にエラーをスロー
   */
  set_css_root_value(key, value) {
    const root_style = getComputedStyle(document.documentElement);
    const root = document.querySelector(':root');

    if (!root_style.getPropertyValue(key)) {
      throw new Error(`CSS variable ${key} does not exist.`);
    }
    root.style.setProperty(key, value);
  }

  /**
   * 指定されたデータセットキーに基づいてUI要素を生成します。
   * 
   * このメソッドは、内部的に`output_details_html`メソッドを呼び出し、
   * 指定されたデータセットキーに対応するHTML要素を出力します。
   *
   * @param {string} dataset_key - UI要素を生成するために使用するデータセットのキー。
   * 
   * @throws {Error} 指定されたデータセットキーが存在しない場合、エラーをスローします。
   * 
   * @example
   * create_ui_elements("userInfo");
   */
  create_ui_elements(dataset_key) {
    if (!this.dataset[dataset_key]) {
      throw new Error(`Dataset key ${dataset_key} does not exist.`);
    }
    try {
      this.output_details_html(this.dataset[dataset_key]);
    } catch (error) {
      console.error(`Error creating UI elements for ${dataset_key}: `, error);
    }
  }

  /**
   * HTMLの詳細を出力するメソッド。
   * 
   * @param {Array} details - HTML要素の詳細を含むオブジェクトの配列。
   * @throws {Error} 引数'details'が配列でない場合、エラーがスローされます。
   * 
   * @example
   * const details = [
   *   { text: 'Hello', parent: 'body', prepend: true },
   *   { text: 'World', parent: 'body', prepend: false }
   * ];
   * output_details_html(details);
   */
  output_details_html(details) {

    if (Array.isArray(details) === false) { 
      throw new Error(`'details' is not an array`);
    }

    details.forEach((item) => {
      const ui_item = new UI(item)

      // text属性が定義されている場合、値をinnerTextにセットする
      if (item['text'] !== undefined && typeof (item['text']) === "string") {
        ui_item.html_element.innerText = item['text'];
      }

      // prepend属性が定義されている場合、parent要素の先頭に追加する
      const $parent = this.get_element(item['parent']);

      if (item['prepend'] !== undefined && item['prepend']) {
        $parent.prepend(ui_item.html_element);
      }
      // prepend属性が定義されていない場合、parent要素の末尾に追加する
      else {
        $parent.appendChild(ui_item.html_element);
      }

      // states属性にid属性が含まれている場合、値をHTML要素のidにセットする
      if (item['states'] != undefined && item['states']['id'] !== undefined && item['states']['id'] !== null) {
        const id = item['states']['id'];
        this.elements[id] = document.getElementById(id);
        this.UI_elements[id] = ui_item;
      }
    })
  }

  /**
   * UIの初期化を行うメソッド。
   * 
   * @param {Object} app - アプリケーションのメインオブジェクト。
   * @throws {Error} this.datasetに'ui_controls'キーが存在しない場合、エラーがスローされます。
   * 
   * @example
   * const app = { アプリケーションの詳細  };
   * init_ui(app);
  */
  init_ui(app) {
    if (this.dataset['ui_controls'] === undefined) {
      throw new Error(`Dataset key ui_controls does not exist.`);
    }

    this.dataset['ui_controls'].forEach(item => {

      // 出力済みのHTML要素のid名に対して、itemのselector属性またはid属性で検索を行う
      const selector = (item['selector'] !== undefined) ? item['selector'] : `[id^='${item['id']}']`;
      const $target_elements = document.querySelectorAll(selector);

      // 一致するHTML要素が存在する場合に実行
      if ($target_elements !== null && $target_elements.length > 0) {

        // イベントリスナーを追加する listen: イベントハンドラ名, require: 実行するメソッド
        $target_elements.forEach($element => {
          item.control.forEach(action => {
            try {
              const event_to_listen = action['listen'];
              const method_to_execute = this.control_methods[action['require']];

              // method_to_execute()はこの時点で即時実行されるが、this.control_methodsに定義されているメソッドは全て以下の形式となっているため
              // 問題ない
              // method : (app) => {
              //   return (event) => { /* 処理内容 */ }
              // }
              $element.addEventListener(event_to_listen, method_to_execute(app));

            } catch (err) {
              console.error(`An error occurred in the definition of event handler ${action['listen']} of ${$element.id}.`);
              return;
            }
          })
        })
      }
    });
  }

  /**
   * UIの状態を更新するメソッド。
   *
   * @param {string} exit_point - UI更新のトリガーとなるExitポイントの識別子。
   * @param {string|null} [id=null] - 更新対象となるUIクラスのID。指定しない場合は、Exitポイントで定義された対象が使われます。
   * @throws {Error} 指定されたExitポイントがデータセットに存在しない場合、エラーがスローされます。
   *
   * @example
   * // exit_pointとidを指定してUIを更新
   * update_ui('some_exit_point', 'some_id');
   * 
   * // exit_pointのみを指定してUIを更新
   * update_ui('some_exit_point');
   */
  update_ui(exit_point, id = null) {

    // 指定されたExitポイントが存在しない場合はエラー
    if (this.update_ui_dataset[exit_point] === undefined) { 
      throw new Error(`Dataset key ${exit_point} does not exist.`);
    }

    this.update_ui_dataset[exit_point].forEach(item => {

      // 各アイテムの内容を元にUIクラスを取得
      const $element = (id != null) ? this.UI_elements[id] : this.UI_elements[item['target']];

      // 対象のUIクラスのdetailsをExitポイントのインスタンスで上書き
      $element.details = item;

      // 各アイテムのstatesをHTML要素に適用する
      $element.set_states();

      // 画面上のHTML要素に状態を反映する
      this.elements[item['target']] = $element.html_element;
    })
  }
}

/*
=======================================================
UI Class
=======================================================

Description:
------------
The UI class is designed to handle the creation and management of HTML elements for a web-based application. It includes methods for creating new elements, setting their states, and updating their classes. The class takes a details object and an optional element as arguments during initialization.

Methods:
--------
- constructor(details, element = null): Initializes the UI class. Takes a details object and an optional element as arguments.
- set_entries(key): Checks for the existence of an attribute and its child attributes, returns details[key] if both exist.
- set_states(): Sets the states for the HTML element.
- get_numeric_value(attribute_name): Retrieves the numeric value of an attribute from the HTML element.
- update_class(operation, class_name): Adds or removes classes from the HTML element.
- create(element_type): Creates a new HTML element of the specified type.
- is_valid_value(): Checks if the value attribute in the dataset item and the value of the HTML element are valid.
- states_error(key, err): Handles errors that occur while setting states.

Usage of UI Class :
-------------------
To initialize an instance of the UI class, you would use the constructor method, providing it with a details object and optionally an HTML element.

Example:
const myDetails = { ... }; // some details object
const myElement = document.createElement('div');
const ui = new UI(myDetails, myElement);

The object schema for the first argument of the UI class constructor is as follows:
{
  parent: 'parent', // The parent element (*required)
  element: 'div', // The HTML tag name (*required)
  value: 'text', // The initial value if the HTML tag is a form element
  text: 'text', // Inline text to be held by the HTML tag
  prepend: Bool, // If true, it will be added to the beginning of the parent element. If false or undefined, it will be added to the end.
  states: { id : 'myElelent', class : 'myclass' } // A set of attribute names and values to be set on the HTML tag
}

=======================================================
UI クラス
=======================================================

説明：
------------
UIクラスは、WebベースのアプリケーションのHTML要素の作成と管理を行います。初期化時には、詳細オブジェクトとオプションの要素を引数として取ります。

メソッド：
--------
- constructor(details, element = null)：UIクラスを初期化します。
- set_entries(key)：属性とその子属性の存在を確認し、両方が存在する場合はdetails[key]を返します。
- set_states()：HTML要素の状態を設定します。
- get_numeric_value(attribute_name)：HTML要素から属性の数値値を取得します。
- update_class(operation, class_name)：HTML要素からクラスを追加または削除します。
- create(element_type)：指定したタイプの新しいHTML要素を作成します。
- is_valid_value()：データセットアイテム内のvalue属性値とHTML要素のvalue値が有効であるかどうかを確認します。
- states_error(key, err)：状態設定中に発生したエラーを処理します。

UI クラスの使用法：
-------------------
UIクラスのインスタンスを初期化するには、コンストラクタメソッドを使用し、詳細オブジェクトとオプションでHTML要素を提供します。

例：
const myDetails = { ... }; // 詳細オブジェクト
const myElement = document.createElement('div');
const ui = new UI(myDetails, myElement);

UIクラスのコンストラクタの第一引数に使用されるオブジェクトのスキーマは以下の通りです：
{
  parent: 'parent', // 親要素 (*必須)
  element: 'div', // HTMLタグ名 (*必須)
  value: 'text', // HTMLタグがform要素の場合の初期値
  text: 'text', // HTMLタグにインラインテキストを保持させる
  prepend: Bool, // trueの場合、parent要素の先頭に追加される。falseまたは未定義の場合、末尾に追加される。
  states: { id : 'myElelent', class : 'myclass' } // HTMLタグにセットする属性名と値のセット
}

File: ui.js
Author: Yakkyoku_oj3
UpdateDate: 2023/10/04
Version: 1.0.0
License: [The MIT License (MIT)]

=======================================================
Copyright 2023 Yakkyoku_oj3. All rights reserved.
=======================================================

*/

/**
 * UIクラスは、ユーザーインターフェースに関連するメソッドとプロパティを提供します。
 */
class UI {
  /**
   * クラスのコンストラクタ。インスタンスを初期化します。
   *
   * @param {Object} details - インスタンスの詳細情報を含むオブジェクト。
   * @param {HTMLElement} [element=null] - オプションでHTML要素を指定。
   * @throws {Error} detailsパラメータがオブジェクトでない、またはnullの場合、エラーがスローされます。
   * 
   * @example
   * // detailsオブジェクトのみを使用してインスタンスを生成
   * new SomeClass({ key: 'value' });
   * 
   * // detailsオブジェクトとHTML要素を使用してインスタンスを生成
   * new SomeClass({ key: 'value' }, someHTMLElement);
   */
  constructor(details, element = null) {

    if (typeof details !== 'object' || details === null) {
      throw new Error("Invalid details object provided.");
    }

    this.details = details;
    this.html_element = {};
    this.states = this.set_entries('states');

    if (details['element'] !== undefined) {
      this.create(details['element']);
    }

    if (element !== null) {
      this.html_element = element;
    }
  }

  /**
   * 属性および子属性の存在確認を行います。
   * @param {string} key - 確認する属性のキー。
   * @returns {Object} 子属性を含む属性。
   */
  set_entries(key) {
    return (this.details[key] === undefined || Object.entries(this.details[key]).length === 0) ? {} : this.details[key];
  }

  /**
   * インスタンスが持つ`states`オブジェクトに基づき、関連するHTML要素の状態を設定します。
   *
   * @throws {Error} `states`プロパティがオブジェクトでない、またはnullの場合、エラーがスローされます。
   * @throws {Error} 属性の設定または更新中に問題が発生した場合、`states_error`メソッドがエラーをスローします。
   *
   * @example
   * // set_statesメソッドを呼び出し
   * instance.set_states();
   */
  set_states() {
    if (typeof this.states !== 'object' || this.states === null) {
      throw new Error("Invalid states object.");
    }
    Object.entries(this.states).forEach(([key, value]) => {
      if (this.html_element[key]) {
        try {
          this.html_element[key] = value;
        }
        catch (err) {
          this.states_error(key, err);
        }
      }
      else {
        try {
          this.html_element.setAttribute(key, value);
        }
        catch (err) {
          this.states_error(key, err);
        }
      }
    })

    this.update_class('add', 'add_class');
    this.update_class('remove', 'remove_class');
  }

  /**
   * 指定された属性名に対応するHTML要素の値を数値として取得します。
   *
   * @param {string} attribute_name - 数値を取得するためのHTML要素の属性名。
   * @returns {number|null} 指定された属性名に対応する数値。問題が発生した場合はnull。
   *
   * @throws {Error} 引数`attribute_name`が文字列でない場合、エラーがスローされます。
   * 
   * @example
   * // 'height'属性の数値を取得
   * const height = instance.get_numeric_value('height');
   */
  get_numeric_value(attribute_name) {

    if (typeof attribute_name !== 'string') {
      throw new Error("Invalid attribute name.");
    }

    // HTML要素が未定義の場合はNullを返す
    if (this.html_element === undefined) {
      console.error("HTML element is undefined.");
      return null;
    }

    // HTML要素を継承
    const $target_element = this.html_element;

    // HTML要素内にattribute_nameが存在しないか、未定義の場合はNullを返す
    if (!$target_element[attribute_name] || $target_element[attribute_name] === null) {
      console.error(`Attribute ${attribute_name} does not exist.`);
      return null;
    }

    // HTML要素から属性値を取得し、数値に変換
    const value_str = $target_element[attribute_name];
    const value_number = parseFloat(value_str);

    // 変換後NaNになった場合はNullを返す
    if (isNaN(value_number)) {
      console.error(`Failed to convert attribute ${attribute_name} to a number.`);
      return null;
    }

    return value_number;
  }

  /**
   * 指定された操作（'add'または'remove'）に基づいてHTML要素のクラスを更新します。
   *
   * @param {string} operation - 実行する操作。'add'または'remove'のいずれか。
   * @param {string} class_name - 操作対象となるクラス名。この名前は`details`オブジェクト内で対応する実際のクラス名を指すキーとなります。
   * 
   * @throws {Error} 引数`operation`が'add'または'remove'でない場合、エラーがスローされます。
   * @throws {Error} 引数`class_name`が文字列でない場合、エラーがスローされます。
   *
   * @example
   * // クラスを追加
   * instance.update_class('add', 'active');
   * 
   * // クラスを削除
   * instance.update_class('remove', 'active');
   */
  update_class(operation, class_name) {

    if (!['add', 'remove'].includes(operation)) {
      throw new Error("Invalid operation. Operation should be 'add' or 'remove'.");
    }
    
    if (typeof class_name !== 'string') {
      throw new Error("Invalid class name.");
    }

    if (this.details[class_name] === undefined) {
      return;
    }

    if (operation === 'add' && !this.html_element.classList.contains(this.details[class_name])) {
      this.html_element.classList.add(this.details[class_name]);
    } else if (operation === 'remove' && this.html_element.classList.contains(this.details[class_name])) {
      this.html_element.classList.remove(this.details[class_name]);
    }
  }

  /**
   * 指定されたタイプのHTML要素を作成し、set_states()メソッドを実行しstatesオブジェクトの内容に従って状態を設定します。
   *
   * @param {string} element_type - 作成するHTML要素のタイプ（例：'div', 'span', 'input'など）。
   * 
   * @throws {Error} 引数`element_type`が文字列でない場合、エラーがスローされます。
   *
   * @example
   * // 'div'要素を作成
   * instance.create('div');
   * 
   * // 'input'要素を作成
   * instance.create('input');
   */
  create(element_type) {
    if (typeof element_type !== 'string') {
      throw new Error("Invalid element type.");
    }
    this.html_element = document.createElement(element_type);
    this.set_states();

    if (this.is_valid_value()) {
      this.html_element.value = this.details['value'];
    }
  }

  /**
   * オブジェクト内の'value'プロパティが有効な値であるかを評価します。
   * 
   * @returns {boolean} 'value'プロパティが定義されており、数値または文字列であり、
   *     かつ、html_elementオブジェクトの'value'プロパティが定義されている場合はtrueを返します。
   *     それ以外の場合はfalseを返します。
   *
   * @example
   * // 'value'が数値で、html_element.valueも定義されている場合
   * instance.is_valid_value();  // trueを返す
   *
   * // 'value'が未定義である場合
   * instance.is_valid_value();  // falseを返す
   */
  is_valid_value() {
    return (
      this.details['value'] !== undefined &&
      (isNaN(this.details['value']) === false || typeof (this.details['value']) === 'string') &&
      this.html_element.value !== undefined
    )
  }

  /**
   * set_status()メソッドにおいて状態設定中にエラーが発生した場合のエラーメッセージを出力します。
   * @param {string} key - エラーが発生した状態のキー。
   * @param {Error} err - キャッチされたエラー。
   */
  states_error(key, err) {
    console.error(`Invalid dataset : An error occurred when applying states in the dataset to HTML elements.\nstates key name = ${key}`);
    console.error(err);
  }
}