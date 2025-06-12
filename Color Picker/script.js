$(document).ready(function(){
	$input_range = $('input[type="range"]');
		$input_range.change(function(){
			$red = $('#red').val();
			$('#txt_red').val($red);
			$green = $('#green').val();
			$('#txt_green').val($green);
			$blue = $('#blue').val();
			$('#txt_blue').val($blue);
			$('#result').css('background', 'rgb(' + $red +', ' + $green + ', ' + $blue + ')'); 
			$rgb = 'rgb(' + $red + ', ' + $green + ', ' + $blue + ')';
			$hex = rgb2hex();
			$('#hex').val($hex);
		});
		
	$input_text = $('input[type="number"]');
	$input_text.change(function(){
		$txt_red = $('#txt_red').val();
		$('#red').val($txt_red);
		$txt_green = $('#txt_green').val();
		$('#green').val($txt_green);
		$txt_blue = $('#txt_blue').val();
		$('#blue').val($txt_blue);
		$('#result').css('background', 'rgb(' + $txt_red +', ' + $txt_green + ', ' + $txt_blue + ')');
		$rgb = 'rgb(' + $txt_red + ', ' + $txt_green + ', ' + $txt_blue + ')';
		$hex = rgb2hex();
		$('#hex').val($hex);
	});
	
});