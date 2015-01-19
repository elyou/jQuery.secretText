;(function ( $, window, document, undefined ) {

		var pluginName = "secretText",
			defaults = {
				text: "secretText",
                chars: 200
		    };

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
                    var textToInsert=this.randomText(this.settings);
                    //this.injectText(this.settings.text);
                    
                    $(this.element).html(textToInsert);
                    this.fixText(this.settings,this.element);
				},
				randomText: function (settings) {
					var dictionary='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
                    var text="";
                    var len=settings.chars;
                    var n = {}, i=0, j=0;
                        while(i < settings.text.length) 
                        {
                            ind=Math.floor(Math.random()*len);
                            if (!n[ind])
                            {
                                n[ind] = true; 
                               i++;
                            }
                        }
                    //console.log(settings);
                    //console.log(n);
                    for( var k=0; k < len; k++ ){
                        if(n[k]){
                            text += "<span class='s'>"+settings.text.charAt(j)+" </span>";
                            j++;
                        }else
                            text += "<span class='m'>"+dictionary.charAt(Math.floor(Math.random() * dictionary.length))+" </span>";
                        
                    }
                    
                    //console.log(r);
                    return text;
                },
                fixText: function (settings,element) {
                    $(element).find(".s").each(function(){
                        var tmp=$(this).clone();
                        $(tmp).css({
                            top :$(this).position().top+"px",
                            left :$(this).position().left+"px",
                            position:"absolute"
                        });
                        $(element).append(tmp);
                        $(this).css("opacity","0");
                        //console.log($(this).position().top+" "+$(this).position().left);
                    });
                }
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );