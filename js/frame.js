const time_now = new Date().getTime();
const frame_html = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Language" content="ja">
<link rel="stylesheet" href="./css/reset.css?t=${time_now}"/>
<link rel="stylesheet" href="./css/style.css?t=${time_now}"/>
<title>VoiceTriggerHiro - Twitch chat voice activation tool with "Hiro-san" speaking by keywords.</title>
</head>
<body>
  <div id="working_document"></div>
  <script src="./js/tmi.min.js"></script>
  <script src="./js/audio_resources.js?t=${time_now}"></script>
  <script src="./js/oj3control.js?t=${time_now}"></script>
  <script src="./js/audiotrigger.js?t=${time_now}"></script>
</body>
</html>
`;

/*
VoiceTriggerHiroを既存のHTMLへ埋め込む場合のサンプルコード



<script src=./js/frame.js"></script>
<div id="app_launcher"></div>

<script>

  let $app_launcher = document.getElementById('app_launcher');
  let $launch_botton = document.createElement('input');
  $launch_botton.onclick = function()
  {
    app_launch_iframe();
  }
  $launch_botton.value = 'launch [VoiceTriggerHiro]';
  $launch_botton.type = 'button'
  $app_launcher.appendChild($launch_botton);

  function app_launch_iframe()
  {
    let elem = document.createElement('div');
    elem.style.position = 'absolute';
    elem.style.top = '0px';
    elem.style.left = '0px';
    elem.style.width = '100%';
    elem.style.height = '100%';
    elem.innerHTML = '<iframe id="frame"></iframe>';
    elem.id = 'app_content';

    const elem_body = document.getElementsByTagName('body');
    elem_body[0].appendChild(elem);

    const $frame = document.getElementById('frame');
    const $frame_document = $frame.contentDocument || $frame.contentWindow.document;
    $frame_document.open();
    $frame_document.write(frame_html)
    $frame_document.close();
  }


</script>
*/