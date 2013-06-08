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
			}
			if( e.which == 37 ){
				ThemeChanger.PrevTheme();
			}
			if( e.which == 35 ){
				ThemeChanger.RemoveTheme();
			}
		}
	});
};

ThemeChanger.PopulateCategories = function() {

};

ThemeChanger.PopulateThemes = function() {
	$.getJSON('//common.greaterthanten.com/css/themes/list.php', function(data){
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
	$('head').append('<link class="theme-changer">');
	css = $('head').children(':last');
	css.attr({
		rel : 'stylesheet',
		type : 'text/css',
		href : '//common.greaterthanten.com/css/themes/' + ThemeChanger.themes[ThemeChanger.currentTheme]
	});
};

ThemeChanger.RemoveTheme = function() {
	$('link.theme-changer').remove();
};

ThemeChanger.Init();