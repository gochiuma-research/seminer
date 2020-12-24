// Kadai10-1: xmlファイルを読み込んで、本のリストを表形式で表示
// 表のラジオボタンで本を一冊選択し、その要素を書き換える
// そして、更新された表を表示する

$(function(){
  var xml_7e4;  // Ajaxで読み込んだデータをグローバルに参照するための変数
  var val1_7e4; // 選択した本が何冊目かをグローバルに参照するための変数

  $("#read").click(function(){
    var filename = $("input[name='field1']").val();
    console.log(filename);
    $.ajax({
      type: "GET",
      url: filename,
      dataType:"xml",
    }).done(function(e){
      xml_7e4 = e;
      console.log("Success");
      $("#result1").append("<p>"+filename+"の読み込みに成功しました"+"</p>");
      table_show(e);

      $("#result2").append("<p>本を選択して選択ボタンを押してください</p>");
      $("#result2").append("<button id='show'>変更</button>");

    }).fail(function(e){
      alert("Ajax Error");
    });
  });

// 選択した本が何冊目かを取得
  $("#result2").on("click","#show",function(){
    var val1 = $("input[name='check']:checked").val();
    console.log(val1);

    val1 = Number(val1)+1; // チェックボックスは0始まりなので、1を加算
    val1_7e4 = val1;

    var nth_book = $(xml_7e4).find("book:nth-child("+val1+")");

    var title_txt = $(nth_book).find("title").text();
    console.log(title_txt);
    var course_txt = $(nth_book).find("course").text();
    var author_txt = $(nth_book).find("author").text();
    var publisher_txt = $(nth_book).find("publisher").text();
    var price_txt = $(nth_book).find("price").text();

    // 選んだbook要素の表示部分
    $("#result3").empty();
    $("#result3").append("<label for='title'>TITLE: </label><br />\
    <input type='text' id='title' name='title' size='50' value="+title_txt+" /><br>");
    $("#result3").append("<label for='course'>COURSE: </label><br />\
    <input type='text' id='course' name='course' size='50' value="+course_txt+" /><br>");
    $("#result3").append("<label for='author'>AUTHOR: </label><br />\
    <input type='text' id='author' name='author' size='50' value="+author_txt+" /><br>");
    $("#result3").append("<label for='publisher'>PUBLISHER: </label><br />\
    <input type='text' id='publisher' name='publisher' size='50' value="+publisher_txt+" /><br>");
    $("#result3").append("<label for='price'>PRICE: </label><br />\
    <input type='text' id='price' name='price' size='50' value="+price_txt+" /><br>");

    // 変更実行ボタン
    $("#result3").append("<button id='update'>変更実行</button>");
  });

// 変更実行ボタン押下すると、input値を取得し、表を書き換える。
  $("#result3").on("click","#update",function(){
    var updt7e4_title = $("input[name='title']").val();
    console.log(updt7e4_title);
    var updt7e4_course = $("input[name='course']").val();
    console.log(updt7e4_course);
    var updt7e4_author = $("input[name='author']").val();
    console.log(updt7e4_author);
    var updt7e4_publisher = $("input[name='publisher']").val();
    console.log(updt7e4_publisher);
    var updt7e4_price = $("input[name='price']").val();
    console.log(updt7e4_price);

    var nth_book = $(xml_7e4).find("book:nth-child("+val1_7e4+")");
    $(nth_book).find("title").replaceWith($("<title></title>").text(updt7e4_title));
    $(nth_book).find("course").replaceWith("<course>"+updt7e4_course+"</course>")
    $(nth_book).find("author").replaceWith("<author>"+updt7e4_author+"</author>")
    $(nth_book).find("publisher").replaceWith("<publisher>"+updt7e4_publisher+"</publisher>")
    $(nth_book).find("price").replaceWith("<price>"+updt7e4_price+"</price>")
    console.log($(nth_book).text())

    table_show(xml_7e4);
  });

  function table_show(e){
    console.log("Table_show");
    $("#tbl").empty();
    $("#tbl").append("<tr><th></th> <th></th> <th>題目</th> <th>科目</th> <th>著者</th> <th>出版社</th> <th  class=\"price\">価格</th> </tr>");
    $(e).find("book").each(function(i){
      var title_txt = $(this).find("title").text();
      var course_txt = $(this).find("course").text();
      var author_txt = $(this).find("author").text();
      var publisher_txt = $(this).find("publisher").text();
      var price_txt = Number($(this).find("price").text()).toLocaleString();

      var input_check = "<input type='radio' name='check' value='"+i+"' />";

      $("#tbl").append("<tr> <td>"+input_check+"</td>\
       <td class=\"num\">"+(i+1)+"</td> <td>"+title_txt+"</td> <td>"+course_txt+"</td>\
       <td>"+author_txt+"</td> <td>"+publisher_txt+"</td> <td class=\"price\">"+price_txt+"</td> </tr>");
    });
  };

});
