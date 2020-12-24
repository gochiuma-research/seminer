// Kadai10-2: xmlファイルを読み込んで、本のリストを表形式で表示
// 表の先頭行の各項目に選択ボックスがあり、そこで昇順/降順を選択できる
// その選択ボックスが操作されたら、それに基づいて本の並べ替えを行う

$(function(){

	var xml_7e4;

// xmlファイル読み込み
	$("#read").click(function(){
		var filename = $(":input[name='field1']").val();
		console.log(filename);
		$.ajax({
			type: "GET",
			url: filename,
			dataType:"xml",
		}).done(function(xml){
			console.log("Success");
			xml_7e4 = xml;
			table_show(xml);
		}).fail(function(xml){
			alert("Ajax Error");
		});
	});

// 一覧表示
	function table_show(xml_proc){
		var table = $("<table border='1'></table>");

		// ここから表の先頭行の<select>要素の設定を各列に対して行う
		var table_header = $("<tr></tr>");
		$(table_header).append("<th></th>");
		var header_title= $("<th width='300px'></th>").text("題名");
		var select = $("<br/><select name='title'></select>");
		var option = $("<option value=0></option>").text("並び替え");
		$(select).append(option);
		var option = $("<option value=1></option>").text("▲");
		$(select).append(option);
		var option = $("<option value=2></option>").text("▼");
		$(select).append(option);
		$(header_title).append(select);
		$(table_header).append(header_title);

		var header_course= $("<th width='200px'></th>").text("科目");
		var select = $("<br/><select name='course'></select>");
		var option = $("<option value=0></option>").text("並び替え");
		$(select).append(option);
		var option = $("<option value=1></option>").text("▲");
		$(select).append(option);
		var option = $("<option value=2></option>").text("▼");
		$(select).append(option);
		$(header_course).append(select);
		$(table_header).append(header_course);

		var header_author= $("<th width='200px'></th>").text("著者");
		var select = $("<br/><select name='author'></select>");
		var option = $("<option value=0></option>").text("並び替え");
		$(select).append(option);
		var option = $("<option value=1></option>").text("▲");
		$(select).append(option);
		var option = $("<option value=2></option>").text("▼");
		$(select).append(option);
		$(header_author).append(select);
		$(table_header).append(header_author);

		var header_publisher= $("<th width='200px'></th>").text("出版社");
		var select = $("<br/><select name='publisher'></select>");
		var option = $("<option value=0></option>").text("並び替え");
		$(select).append(option);
		var option = $("<option value=1></option>").text("▲");
		$(select).append(option);
		var option = $("<option value=2></option>").text("▼");
		$(select).append(option);
		$(header_publisher).append(select);
		$(table_header).append(header_publisher);

		var header_price= $("<th width='80px'></th>").text("価格");
		var select = $("<br/><select name='price'></select>");
		var option = $("<option value=0></option>").text("並び替え");
		$(select).append(option);
		var option = $("<option value=1></option>").text("▲");
		$(select).append(option);
		var option = $("<option value=2></option>").text("▼");
		$(select).append(option);
		$(header_price).append(select);
		$(table_header).append(header_price);
		$(table).append(table_header);

		// ここから二行目以降の繰り返し表示
		var count = 0;

		$(xml_proc).find("book").each(function(i){
			count++;
			var table_line = $("<tr></tr>");
			var table_th = $("<th></th>");
			var input_check = $("<input type='radio' name='check' />");
			$(input_check).attr("value",i);
			$(table_th).append(input_check);
			$(table_line).append(table_th);
			var title = $(this).find("title").text();
			var line7e4_title = $("<td></td>").text(title);
			$(table_line).append(line7e4_title);
			var course = $(this).find("course").text();
			var line7e4_course = $("<td></td>").text(course);
			$(table_line).append(line7e4_course);
			var author = $(this).find("author").text();
			var line7e4_author = $("<td></td>").text(author);
			$(table_line).append(line7e4_author);
			var publisher = $(this).find("publisher").text();
			var line7e4_publisher = $("<td></td>").text(publisher);
			$(table_line).append(line7e4_publisher);
			var price = $(this).find("price").text();
			var line7e4_price = $("<td align='right'></td>").text(price);
			$(table_line).append(line7e4_price);

			$(table).append(table_line);
		});

		$("#result1").empty();
		$("#result1").append(table);

	};

// 並び替え
	$("#result1").on("change","select",function(){
		var att = $(this).attr("name");
		var val = $(this).val();
		if (val !=0 )	item_rearrange(att,val);
		console.log(att, val);
	});


// 並び替え実行
	function item_rearrange(item,value){
		var books = $(xml_7e4).find("books");
		var book = $(books).children();
		var	sortbk7e4 = new Array();

		// 並べ替えのキーになる項目と、初期インデックス番号の連想配列
		for(i=0;i<book.length;i++){
			sortbk7e4[i] = {idx: i, key: $(book[i]).find(item).text()};
		}

		// 並べ替えの実施と並べ替えルールの設定
		sortbk7e4.sort(function(a,b){
			if (item == "price"){                // 価格で並べ替えるケース
				if( value == 1 )	return a.key-b.key;	// 昇順
				if( value != 1 )	return b.key-a.key; // 降順
			} else {                            // 価格以外で並べ替えるケース
				if( value == 1 ) {										// 昇順
					if( a.key <= b.key )	return -1;
					else									return 1;
				}
				else {																// 降順
					if( a.key <= b.key )	return 1;
					else									return -1;
				}
			}
		});
		// デバッグ用出力
		for(i=0;i<book.length;i++){
			console.log(i+" "+sortbk7e4[i].idx+" "+sortbk7e4[i].key);
		}

		// 表の要素の並べ替え
		$(books).empty();
		for(i=0;i<book.length;i++){
			$(books).append(book[sortbk7e4[i].idx]);
		}
		table_show(xml_7e4);
	}

});
