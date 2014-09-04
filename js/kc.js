/*!
 * Keen Concepts
 * keenwebconcepts.com | @zedd45
 * http://opensource.org/licenses/MIT
 */

(function () {

	// 'borrow' proxy from jQuery core.js
	// Bind a function to a context, optionally partially applying any
	// arguments.
	var proxy = function( fn, context ) {
		var tmp, args, proxy,
			slice = Array.prototype.slice;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid;

		return proxy;
	};

	kcModal = {

		initModal: function ( selector ) {

			this.trigger = document.querySelector( selector );
			this.dialog = document.querySelector('#kc-contact-modal');
			this.close  = this.dialog.querySelector('.kc-icon-close');

			this.bindEventListeners();

			return this;
		},

		bindEventListeners: function () {

			this.trigger.addEventListener('click', proxy( this.openModal, this));
			this.close.addEventListener('click', proxy( this.closeModal, this));

			document.addEventListener('keyup', proxy( this.checkKeyCode, this));
		},

		unbindEventListeners: function () {
			this.trigger.removeEventListener('click', proxy( this.openModal, this));
			document.removeEventListener('keyup', proxy( this.checkKeyCode, this));
			this.close.removeEventListener('click', proxy( this.closeModal, this));
		},

		checkKeyCode: function (e) {
			if ( 27 === event.keycode ) { // escape
				this.closeModal();
			}
		},

		closeModal: function () {
			this.dialog.classList.remove('open');
		},

		openModal: function () {
			var box = this.dialog.getBoundingClientRect();

			this.dialog.classList.add('open');

			// body has no height due to positioning characteristics
			this.dialog.style.top = ( window.innerHeight / 2 ) - ( box.height / 2 );
			this.dialog.style.left = ( window.innerWidth / 2 ) - ( box.width / 2 );

			return this;
		},

		remove: function () {
			this.unbindEventListeners();

			this.trigger = null;
			this.dialog = null;
			this.close = null;
		}

	};


	document.addEventListener("DOMContentLoaded", function() {
	    kcModal.initModal('#kc-contact-form');
	});

})();


