/**
 * Created by 4423 on 18/03/2016.
 */

var JsML = (function() {
  function HTML(tag, props, contents)
  {
    function HTMLBuilder(tag, props, contents)
    {
      var _tag = "";
      var _props = {};
      var _contents = [];

      this.append = function (html)
      {
        if ("Function" === _objectType(html)) {
          html = html();
        }

        _validateInput(html);
        if ("Array" === _objectType(html)) {
          _contents = _contents.concat(html);
          return this;
        }

        _contents.push(html);

        return this;
      };

      this.prepend = function (html)
      {
        if ("Function" === _objectType(html)) {
          html = html();
        }

        _validateInput(html);
        if ("Array" === _objectType(html)) {
          _contents = html.concat(_contents)
          return this;
        }

        _contents.unshift(html);

        return this;
      };

      this.html = function (html)
      {
        if ("Function" === _objectType(html)) {
          html = html();
        }

        _validateInput(html);
        if ("Array" !== _objectType(html)) {
          html = [html];
        }

        _contents = html;
      };

      this.prop = function (key, value)
      {
        if ("string" !== typeof key) {
          throw new Error("Invalid key type");
        }
        if (~["string", "number", "boolean"].indexof(typeof value) && null !== value) {
          throw new Error("Invalid value type");
        }

        _props[key] = value;
      };


      this.asString = function ()
      {
        var html = '<' + _tag;

        for (var key in _props) {
          if (null === _props[key] || undefined === _props[key]) {
            continue;
          }

          html += ' ' + key + '="' + _props[key] + '"'
        }

        if (_contents.length) {
          return html + '>' + _parseContents(_contents) + '</' + _tag + '>';
        }

        return html + ' />';
      };


      this.asJsObject = function ()
      {
        var tmp = document.createElement("div");
        tmp.innerHTML = this.asString();

        return tmp.children[0];
      };


      this.asJQueryObject = function ()
      {
        if (!window.jQuery) {
          throw new Error("jQuery not found");
        }
        return window.jQuery(this.asString());
      };


      var _validateInput = function (inp)
      {
        if ("Array" === _objectType(inp)) {
          for (var i = 0; i < inp.length; i++) {
            _validateInput(inp[i]);
          }
        } else if (!~["String", "Number", "Boolean", "Function", "HTMLBuilder"].indexOf(_objectType(inp))) {
          throw new Error("invalid contents type");
        }
      }.bind(this);


      var _parseContents = function (inp)
      {
        if ("Array" === _objectType(inp)) {
          var string = "";
          for (var i = 0; i < inp.length; i++) {
            string += _parseContents(inp[i]);
          }

          return string;
        }

        if ("HTMLBuilder" === _objectType(inp)) {
          return inp.asString();
        }

        if ("boolean" === typeof inp) {
          return inp ? "true" : "false";
        }

        return inp;
      }.bind(this);


      var _objectType = function (ob)
      {
        var type = Object.prototype.toString.call(ob);
        if ("[object Object]" === type) {
          return ob.constructor.name;
        } else if (/^\[object\s\w+\]$/i.test(type)) {
          return /^\[object\s(\w+)\]/i.exec(type)[1];
        }

        return typeof ob;
      };


      (function __construct() {
        if ("string" !== typeof tag) {
          throw new Error("`tag` should be of type string");
        }

        if (null !== contents && undefined !== contents) {
          this.append(contents);
        }
        _tag = tag;
        _props = "object" === typeof props ? props : {};
      }.bind(this))();
    };

    return new HTMLBuilder(tag, props, contents);
  }

  return {
    HTML: HTML,
    populateGlobal: function ()
    {
      window.HTML = HTML;
    }
  };
})();