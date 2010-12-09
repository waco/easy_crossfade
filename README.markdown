EasyCrossFade
=============

クロスフェードするスライドショーの簡易版
(要JQuery)

全然簡易版じゃないよね

Version
-------

+ 0.0.1 2010/12/09 alpha版リリース

Usage 
-----

easy_crossfade.jsを読み込んでください

HTMLにEasyCrossFadeの設定を行います。
    <script type="text/javascript">
      //<![CDATA[
      //第一引数: スライドショーを表示する要素id
      //第二引数: オプション
      EasyCrossFade.init("#flash", {
        // 幅
        width: "360px"
        // 高さ
        height: "240px"
        // 画像ディレクトリの指定
        imageDir: "images/",
        // 1度しか表示されないスライド
        catchImages: ["flash-catch1.jpg", "flash-catch2.jpg"],
        // 繰り返し表示されるスライド
        loopImages: [
          "flash-loop.jpg",
          ["flash-loop.jpg", "http://example.com/"] //配列でリンクを指定
        ],
        // スライドのスピード
        slideSpeed: 3000,
        // フェードのスピード
        fadeSpeed: 3000,
      });
    //]]>
    </script>

スライドする画像の順番は、catchImages[0], ... catchImages[n-1], loopImages[0], ... loopImages[n-1], loopImages[0], ... のような順番で表示されます。

Todo
----

+ ロード中の画像を指定できる機能
 
copyright 2010 waco, released under the MIT license 
