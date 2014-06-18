/*!
 * Keen Concepts
 * keenwebconcepts.com | @zedd45
 * http://opensource.org/licenses/MIT
 */

(function (d) {
	
	var KC = {},
		on = addEventListener,
		off = removeEventListener,
		// FIXME: sloppy
		instance = null;

	KC.prototype = {

		initalize: function () {
			
			document.on("DOMContentLoaded", function( event ) {
			    instance = this.initModal('#kc-contact-modal');
			});
			
			return instance;
		},

		initModal: function ( selector ) {
			this.dialog = document.querySelector( selector );
			this.close  = this.dialog.querySelector('.modal-close');

			this.bindEventListeners();

			return this;
		},

		bindEventListeners: function () {
			this.dialog.on('keyup', function ( e ) {
				if ( 27 === event.keycode ) { // escape
					this.closeModal();
				}
			});

			this.close.on('click', this.closeModal.bind( this ), false );
		},

		closeModal: function () {
			// TOOD: remove this dependency or use CJS / dep management
			window.classie.removeClass('open');
		},

		openModal: function () {
			var box = this.dialog.getBoundingClientRect(),
				viewPort = document.querySelector('body').getBoundingClientRect();

			this.dialog.top = ( viewport.height / 2 ) - ( box.height / 2 );
			this.dialog.left = ( viewport.width / 2 ) - ( box.width /2 );

			debugger;

			return this;
		},

		remove: function () {
			this.dialog.parent.removeChild(this.dialog);
			instance 
		},

	};

})(document);


