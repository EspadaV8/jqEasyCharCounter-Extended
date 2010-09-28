/* jQuery jqEasyCharCounter-Extended plugin
 * See: http://github.com/EspadaV8/jqEasyCharCounter-Extended
 * Original examples and documentation at: http://www.jqeasy.com/
 * Version: 1.0 (29/09/2010)
 * No license. Use it however you want. Just keep this notice included.
 * Requires: jQuery v1.3+
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function($) {

$.fn.extend({
    jqEasyCounter: function(givenOptions) {
        return this.each(function() {
            var $this = $(this),
                options = $.extend({
                    maxChars: 100,                  // max number of characters
                    maxCharsWarning: 80,            // max number of characters before warning is shown
                    msgFontSize: '12px',            // css font size for counter
                    msgFontColor: '#000',           // css font color for counter
                    msgFontFamily: 'Arial',         // css font family for counter
                    msgTextAlign: 'right',          // css text-align for counter (left, right, center)
                    msgWarningColor: '#F00',        // css font color for warning
                    msgAppendMethod: 'insertAfter',  // position of counter relative to the input element(insertAfter, insertBefore)
                    msg: 'Characters: ',            // The message to use
                    msgPlacement: 'prepend',        // Prepend/Append the message to the number
                    numFormat: 'CURRENT/MAX'        // Format of the numbers (CURRENT, MAX, REMAINING)
                }, givenOptions);
	
			if(options.maxChars <= 0) return;
			
			// create counter element
			var jqEasyCounterMsg = $("<div class=\"jqEasyCounterMsg\">&nbsp;</div>");
			var jqEasyCounterMsgStyle = {
				'font-size' : options.msgFontSize,
				'font-family' : options.msgFontFamily,
				'color' : options.msgFontColor,
				'text-align' : options.msgTextAlign,
				'width' : $this.width(),
				'opacity' : 0
			};
			jqEasyCounterMsg.css(jqEasyCounterMsgStyle);
			// append counter element to DOM
			jqEasyCounterMsg[options.msgAppendMethod]($this);
			
			// bind events to this element
			$this
				.bind('keydown keyup keypress', doCount)
				.bind('focus paste', function(){setTimeout(doCount, 10);})
				.bind('blur', function(){jqEasyCounterMsg.stop().fadeTo( 'fast', 0);return false;});
			
			function doCount(){
				var val = $this.val(),
					length = val.length
				
				if(length >= options.maxChars) {
					val = val.substring(0, options.maxChars); 				
				};
				
				if(length > options.maxChars){
					// keep scroll bar position
					var originalScrollTopPosition = $this.scrollTop();
					$this.val(val.substring(0, options.maxChars));
					$this.scrollTop(originalScrollTopPosition);
				};
				
				if(length >= options.maxCharsWarning){
					jqEasyCounterMsg.css({"color" : options.msgWarningColor});
				}else {
					jqEasyCounterMsg.css({"color" : options.msgFontColor});
				};
				
				if(options.msgPlacement == 'prepend')
				{
					html = options.msg + options.numFormat;
				}
				else
				{
					html = options.numFormat + options.msg;
				}
				html = html.replace('CURRENT', $this.val().length);
				html = html.replace('MAX', options.maxChars);
				html = html.replace('REMAINING', options.maxChars - $this.val().length);
				
				jqEasyCounterMsg.html(html);
                jqEasyCounterMsg.stop().fadeTo( 'fast', 1);
			};
        });
    }
});

})(jQuery);
