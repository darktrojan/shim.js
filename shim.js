if (typeof Array.prototype.indexOf != 'function') {
	Array.prototype.indexOf = function(e) {
		for (var i = 0, iCount = this.length; i < iCount; i++)
			if (this[i] == e)
				return i;
		return -1;
	};
}

if (typeof Date.now != 'function') {
	Date.now = function() {
		return new Date().valueOf();
	};
}

if (typeof String.prototype.trim != 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s*/, '').replace(/\s*$/, '');
	};
}

if (!('classList' in Element.prototype)) {
	ClassList = function(aElement) {
		this.element = aElement;
	};
	ClassList.prototype = {
		add: function(aClassName) {
			var list = this._getList();
			if (list.indexOf(aClassName) < 0)
				list.push(aClassName);
			this.element.className = list.join(' ');
		},
		remove: function(aClassName) {
			var list = this._getList();
			var index = list.indexOf(aClassName);
			if (index >= 0)
				list.splice(index, 1);
			this.element.className = list.join(' ');
		},
		contains: function(aClassName) {
			var list = this._getList();
			return list.indexOf(aClassName) >= 0;
		},
		_getList: function() {
			var list = this.element.className.split(/\s+/);
			if (list.length && list[0] == '')
				list.shift();
			if (list.length && list[list.length - 1] == '')
				list.pop();
			return list;
		}
	};
	Object.defineProperty(Element.prototype, 'classList', {
		'get': function() {
			return new ClassList(this);
		},
		'enumerable': false,
		'configurable': true
	});
}

if (!('textContent' in Element.prototype)) {
	Object.defineProperty(Element.prototype, 'textContent', {
		'get': function() {
			return this.innerText;
		},
		'set': function(value) {
			this.innerText = value;
		},
		'enumerable': false,
		'configurable': true
	});
}

if (!('localName' in Element.prototype)) {
	Object.defineProperty(Element.prototype, 'localName', {
		'get': function() {
			return this.nodeName.toLowerCase();
		},
		'enumerable': false,
		'configurable': true
	});
}

if (!('firstElementChild' in Element.prototype)) {
	Object.defineProperty(Element.prototype, 'children', {
		'get': function() {
			var children = {
				item: function(i) {
					return this[i];
				}
			};
			var i = 0;
			for (var next = this.firstChild; next; next = next.nextSibling) {
				if (next.nodeType == 1)
					children[i++] = next;
			}
			children.length = i;
			return children;
		},
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(Element.prototype, 'firstElementChild', {
		'get': function() {
			for (var next = this.firstChild; next; next = next.nextSibling) {
				if (next.nodeType == 1)
					return next;
			}
			return null;
		},
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(Element.prototype, 'nextElementSibling', {
		'get': function() {
			for (var next = this.nextSibling; next; next = next.nextSibling) {
				if (next.nodeType == 1)
					return next;
			}
			return null;
		},
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(Element.prototype, 'lastElementChild', {
		'get': function() {
			for (var prev = this.lastChild; prev; prev = prev.previousSibling) {
				if (prev.nodeType == 1)
					return prev;
			}
			return null;
		},
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(Element.prototype, 'previousElementSibling', {
		'get': function() {
			for (var prev = this.previousSibling; prev; prev = prev.previousSibling) {
				if (prev.nodeType == 1)
					return prev;
			}
			return null;
		},
		'enumerable': false,
		'configurable': true
	});
}

if (!('addEventListener' in window)) {
	function AddEventListener(aEventName, aHandler, aUseCapture) {
		this.attachEvent('on' + aEventName, aHandler);
	};
	function RemoveEventListener(aEventName, aHandler, aUseCapture) {
		this.detachEvent('on' + aEventName, aHandler);
	};

	window.addEventListener = AddEventListener;
	window.removeEventListener = RemoveEventListener;
	document.addEventListener = AddEventListener;
	document.removeEventListener = RemoveEventListener;
	Element.prototype.addEventListener = AddEventListener;
	Element.prototype.removeEventListener = RemoveEventListener;
}

if (!('head' in document)) {
	document.head = document.querySelector('head');
}

if (!('getElementsByClassName' in document)) {
	document.getElementsByClassName = function(aClassName) {
		return this.querySelectorAll('.' + aClassName);
	};
}

(function() {
	var names = ['article', 'aside', 'footer', 'header', 'hgroup', 'nav', 'section'];
	for (var i = 0; i < names.length; i++)
		document.createElement(names[i]);
})();
