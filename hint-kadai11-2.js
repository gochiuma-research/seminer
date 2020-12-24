//XML文書を読み込み、表形式で表示後、検索機能を提供する
//検索結果で、表を再表示する
$(function(){
  var xml_clone;
  var val1_clone;

  $("#read").click(function(){
    var filename = $("input[name='field1']").val();
    console.log(filename);
    $.ajax({
      type: "GET",
      url: filename,
      dataType:"xml",
    }).done(function(e){
      xml_clone = e;
      console.log("Success");
      $("#result1").append("<p>"+filename+"の読み込みに成功しました"+"</p>");
      table_show(e);

			// 検索ボタン
			$("#result2").append("<button id='search'>検索</button>");

    }).fail(function(e){
      alert("Ajax Error");
    });
  });

// 検索ボタンが押されたら、検索情報入力ボックスを作成する
  $("#result2").on("click","#search",function(){
    $("#result3").empty();
    var p = $("<p></p>").text("検索項目");
    $("#result3").append(p);

    // 検索項目の選択
    var select = $("<select name='search_select'></select>");
    var option = $("<option value='title' selected></option>").text("題名");
    $(select).append(option);
    var option = $("<option value='course'></option>").text("科目");
    $(select).append(option);
    var option = $("<option value='author'></option>").text("著者");
    $(select).append(option);
    var option = $("<option value='publisher'></option>").text("出版社");
    $(select).append(option);
    var option = $("<option value='price'></option>").text("価格");
    $(select).append(option);
    $("#result3").append(select);

    // 検索文字列の入力フィールド
    $("#result3").append("<input type='text' name='search_input' size='50px' /><br>");

    // 価格検索時の以上/等しい/以下の選択
    $("#result3").append("<label for='select_price'>価格検索時</label>");
    var select = $("<select name='select_price'></select>");
    var option = $("<option value='upper' selected></option>").text("以上");
    $(select).append(option);
    var option = $("<option value='equal'></option>").text("等しい");
    $(select).append(option);
    var option = $("<option value='lower'></option>").text("以下");
    $(select).append(option);
    $("#result3").append(select);

    var search_button = $("<br><button id='search_button'></button>").text("検索実行");
    $("#result3").append(search_button);
  });

  // 検索実行
  	$("#result3").on("click","#search_button",function(){
  		var item = $("select[name='search_select']").val();
  		var val = $(":input[name='search_input']").val();
  		var val2 = $("select[name='select_price']").val();
  		console.log(item+" "+val+" "+val2);

      //オリジナルのXMLのデータをコピーして加工する
      search_xml = xml_clone.cloneNode(true);
      console.log("clone通過");

      // search_xmlの方は、booksを消して、ガワだけにする。あとで、xml_cloneから抽出した本だけを書き込む
  		var books = $(search_xml).find("books");
  		$(books).empty();


      // 文字列の一致しか見ない検索
      // 価格の比較(以上/等しい/以下)を行うためのコードを追加する必要がある
  		$(xml_clone).find("book").each(function(i){
  				$(this).find(item).each(function(){
  					if (val == $(this).text()){
  						var book = $(this).parent().clone();
  						$(books).append(book);
  						console.log($(this).text());
  					}
  				});
  		});

  		table_show(search_xml);

  	});


	// 表の表示関数(並べ替え未対応版)
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
