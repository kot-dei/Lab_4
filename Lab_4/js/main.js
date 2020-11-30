$(document).ready(function($)
{
	var ajax_data =
	[
		{fname:"Иванов", lname:"Иван", age: 19, mark: 8.5}, 
		{fname:"Алексеев", lname:"Алексей", age: 20, mark: 8},
		{fname:"Кротов", lname:"Дмитрий", age: 21, mark: 9},
        {fname:"Андреев", lname:"Андрей", age: 19, mark: 9.5},
	]

	var random_id = function  () 
	{
		var id_num = Math.random().toString(9).substr(2,3);
		var id_str = Math.random().toString(36).substr(2);
		
		return id_num + id_str;
	}


	var tbl = '';
	tbl +='<table class="table table-hover" id="tabl" border="1">'

		tbl +='<thead>';
			tbl +='<tr>';
			tbl +='<th>SurName</th>';
			tbl +='<th>Name</th>';
			tbl +='<th>Age</th>';
			tbl +='<th>Mark</th>';
			tbl +='</tr>';
		tbl +='</thead>';

		tbl +='<tbody>';

			$.each(ajax_data, function(index, val) 
			{
				var row_id = random_id();


				tbl +='<tr row_id="'+row_id+'">';
					tbl +='<td class="col1"><div class="row_data" edit_type="click" col_name="fname">'+val['fname']+'</div></td>';
					tbl +='<td class="col2"><div class="row_data" edit_type="click" col_name="lname">'+val['lname']+'</div></td>';
                    tbl +='<td class="col3"><div class="row_data" edit_type="click" col_name="email">'+val['age']+'</div></td>';
                    tbl +='<td class="col4"><div class="row_data" edit_type="click" col_name="email">'+val['mark']+'</div></td>';


					tbl +='<td>';
					 
						tbl +='<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit</a> </span>';
						tbl +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>';
						tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>';

					tbl +='</td>';
					
				tbl +='</tr>';
			});

		tbl +='</tbody>';

    tbl +='</table>'	

    var getSum = function (colNumber) {
        var sum = 0;
        var selector = '.col' + colNumber;
    
        $('#sum_table').find(selector).each(function (index, element) {
            sum += parseInt($(element).text()) / colNumber;
        });  
        return sum;        
    };

    
    $('#tabl').find('.total').each(function (index, element) {
        $(this).text('Total: ' + getSum(index + 1)); 
    });

    $('#gg').find('#ff').each(function(){
        $(this).text(getSum(3));
    });


	$(document).find('.tbl').html(tbl);
	$(document).find('.btn_save').hide();
	$(document).find('.btn_cancel').hide(); 
	$(document).on('click', '.row_data', function(event) 
	{
		event.preventDefault(); 

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}


		$(this).closest('div').attr('contenteditable', 'true');
3
		$(this).addClass('bg-warning').css('padding','5px');

		$(this).focus();
	})	

    function loadDoc() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
          }
        };
        xhttp.open("GET", "ajax_info.txt", true);
        xhttp.send();
      }

	$(document).on('focusout', '.row_data', function(event) 
	{
		event.preventDefault();

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		var row_id = $(this).closest('tr').attr('row_id'); 
		
		var row_div = $(this)				
		.removeClass('bg-warning')
		.css('padding','')

		var col_name = row_div.attr('col_name'); 
		var col_val = row_div.html(); 

		var arr = {};
		arr[col_name] = col_val;

		$.extend(arr, {row_id:row_id});

		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');
		
	})	


	$(document).on('click', '.btn_edit', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		tbl_row.find('.btn_save').show();
		tbl_row.find('.btn_cancel').show();


		tbl_row.find('.btn_edit').hide(); 


		tbl_row.find('.row_data')
		.attr('contenteditable', 'true')
		.attr('edit_type', 'button')
		.addClass('bg-warning')
		.css('padding','3px')

		tbl_row.find('.row_data').each(function(index, val) 
		{  

			$(this).attr('original_entry', $(this).html());
		}); 		


	});



	$(document).on('click', '.btn_cancel', function(event) 
	{
		event.preventDefault();

		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();


		tbl_row.find('.btn_edit').show();

		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		tbl_row.find('.row_data').each(function(index, val) 
		{   
			$(this).html( $(this).attr('original_entry') ); 
		});  
	});

	$(document).on('click', '.btn_save', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');


		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();

		tbl_row.find('.btn_edit').show();


		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		var arr = {}; 
		tbl_row.find('.row_data').each(function(index, val) 
		{   
			var col_name = $(this).attr('col_name');  
			var col_val  =  $(this).html();
			arr[col_name] = col_val;
		});



		$.extend(arr, {row_id:row_id});
		 
	});
});