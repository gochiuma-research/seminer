//XML文書を読み込み、指定された名前のファイルにセーブするサンプル
//kadai10-1をもとにして作成
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

			// 出力ファイル名の入力フィールドと、保存ボタン
			$("#result2").append("<label for='outfile'>出力ファイル名: </label><br />\
	    	<input type='text' id='outfile' name='outfile' size='20' /><br>");
			$("#result2").append("<button id='save'>保存</button>");

    }).fail(function(e){
      alert("Ajax Error");
    });
  });

	// 保存ボタンが押されたら、保存実行
  $("#result2").on("click","#save",function(){
    var fname = $(":input[name='outfile']").val();
    console.log(fname);

		var serializer = new XMLSerializer();
			var xml_serialize = serializer.serializeToString(xml_clone);
			$.ajax({
				type: 'POST',
				url: './save.php',
				cache: false,
				datatype: 'json',
				data:{
					'file_name':fname,
					'file':xml_serialize
				},
			}).done(function(r_data) {
				console.log(r_data);
			}).fail(function(r_data) {
				console.log("Save Error");
			});
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
