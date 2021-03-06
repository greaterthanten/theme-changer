var ThemeChanger = {};

ThemeChanger.Init = function() {
	ThemeChanger.themes = [];
	ThemeChanger.currentTheme = 0;
	
	ThemeChanger.Cache();
	ThemeChanger.BindListeners();
	
	ThemeChanger.PopulateCategories();
	ThemeChanger.PopulateThemes();
};

ThemeChanger.Cache = function() {
	ThemeChanger.dom = {};
	ThemeChanger.dom.doc = $(document);
};

ThemeChanger.BindListeners = function(){
	ThemeChanger.dom.doc.on('keydown', function(e){
		if( e.ctrlKey || e.metaKey ){
			if( e.which == 39 ){
				ThemeChanger.NextTheme();
				return false;
			}
			if( e.which == 37 ){
				ThemeChanger.PrevTheme();
				return false;
			}
			if( e.which == 35 ){
				ThemeChanger.RemoveTheme();
				return false;
			}
		}
	});
};

ThemeChanger.PopulateCategories = function() {

};

ThemeChanger.PopulateThemes = function() {
	var params = {category: 'default'};
	if( location.href.indexOf('facebook.com') >= 0 ){
		params.category = 'facebook';
	}
	else if( location.href.indexOf('twitter.com') >= 0 ){
		params.category = 'twitter';
	}
	else if( $('link[href*=bootstrap]').length > 0 ){
		params.category = 'bootstrap';
	}
	
	$.getJSON('//common.greaterthanten.com/css/themes/list.php', params, function(data){
		ThemeChanger.themes = data;
	});
};

ThemeChanger.NextTheme = function() {
	ThemeChanger.currentTheme++;
	ThemeChanger.currentTheme = ThemeChanger.currentTheme % ThemeChanger.themes.length;
	ThemeChanger.LoadTheme();
};

ThemeChanger.PrevTheme = function() {
	ThemeChanger.currentTheme = (ThemeChanger.currentTheme < 1) ? (ThemeChanger.themes.length - 1) : (ThemeChanger.currentTheme - 1);
	ThemeChanger.LoadTheme();
};

ThemeChanger.LoadTheme = function() {
	var css = $('link.theme-changer');
	if( css.length < 1 ){
		ThemeChanger.saved = $('link[href*=bootstrap]').not('[href*=responsive]').detach();
		css = $('<link class="theme-changer">');
		$('head').prepend(css);
	}
	css.attr({
		rel : 'stylesheet',
		type : 'text/css',
		href : '//common.greaterthanten.com/css/themes/' + ThemeChanger.themes[ThemeChanger.currentTheme]
	});
	var $div = $('#theme-changer-label');
	if( $div.length < 1 ){
		$div = $('<div id="theme-changer-label" />');
		$div.css('position', 'fixed').css('top', '0px').css('left', '0px').css('color', 'black').css('background-color', 'white');
	}
	
	$div.text(ThemeChanger.themes[ThemeChanger.currentTheme]);
	$('body').append($div);
};

ThemeChanger.RemoveTheme = function() {
	$('link.theme-changer').remove();
	$('#theme-changer-label').remove();
	$('head').prepend(ThemeChanger.saved);
};

ThemeChanger.Init();